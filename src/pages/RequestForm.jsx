import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DynamicForm from "../components/DynamicForm";
import PDFGenerator from "../components/PDFGenerator.jsx";
import PreviewCard from "../components/PreviewCard";
import { getRequestTypeById } from "../data/requestTypes";
import { generateRequestPdf } from "../utils/pdfHelper";

function getDefaultFormValues() {
  return {
    policyNumber: "",
    insuredName: "",
    mainDueDate: "",
    isVehicleInsurance: false,
    plateNumber: "",
    reason: "",
    fractionType: "",
    diminution: {
      withoutGlassBreak: false,
      withoutAssistance: false,
      withoutAllRisk: false,
      withoutCollision: false,
      vehicleValue: "",
    },
    extension: {
      withGlassBreak: false,
      glassBreakAmount: "",
      withAssistance: false,
      vehicleValue: "",
    },
  };
}

function RequestForm() {
  const { requestTypeId } = useParams();
  const requestType = getRequestTypeById(requestTypeId);
  const [previewData, setPreviewData] = useState(null);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultFormValues(),
    mode: "onTouched",
  });

  const storageKey = useMemo(() => {
    if (!requestType) {
      return "";
    }
    return `insurance-request-${requestType.id}`;
  }, [requestType]);

  useEffect(() => {
    if (!requestType) {
      return;
    }

    const defaultValues = getDefaultFormValues();
    const rawSaved = window.localStorage.getItem(storageKey);

    if (!rawSaved) {
      reset(defaultValues);
      setPreviewData(null);
      return;
    }

    try {
      const savedValues = JSON.parse(rawSaved);
      reset({ ...defaultValues, ...savedValues });
    } catch {
      reset(defaultValues);
    }

    setPreviewData(null);
  }, [requestType, reset, storageKey]);

  useEffect(() => {
    if (!requestType) {
      return;
    }

    const subscription = watch((values) => {
      window.localStorage.setItem(storageKey, JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [watch, storageKey, requestType]);

  if (!requestType) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4">
        <div className="glass-panel rounded-2xl border border-slate-200 p-8 text-center shadow-soft">
          <h1 className="title-font text-2xl font-bold text-slate-900">Type de demande introuvable</h1>
          <p className="mt-2 text-slate-600">Le type demandé n'existe pas.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  const onPreview = handleSubmit((values) => {
    setPreviewData(values);
  });

  const onGeneratePdf = handleSubmit((values) => {
    setPreviewData(values);
    generateRequestPdf(requestType, values);
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="text-sm font-semibold text-brand-700 transition hover:text-brand-600">
          ← Retour aux types de demandes
        </Link>
        <p className="rounded-full bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
          Formulaire dynamique
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="fade-in glass-panel rounded-3xl border border-slate-200 p-6 shadow-soft sm:p-8">
          <h1 className="title-font text-2xl font-bold text-slate-900 sm:text-3xl">{requestType.title}</h1>
          <p className="mt-2 text-sm text-slate-600">Complétez les informations puis prévisualisez le document.</p>

          <form className="mt-6">
            <DynamicForm requestType={requestType} register={register} watch={watch} errors={errors} />

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onPreview}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Prévisualiser
              </button>
              <PDFGenerator onGenerate={onGeneratePdf} />
            </div>
          </form>
        </section>

        <PreviewCard requestType={requestType} formData={previewData} />
      </div>
    </main>
  );
}

export default RequestForm;
