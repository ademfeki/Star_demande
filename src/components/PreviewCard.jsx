import { buildRequestFields, getTodayDateLabel } from "../utils/requestFormatter";

function PreviewCard({ requestType, formData }) {
  if (!formData) {
    return null;
  }

  const fields = buildRequestFields(requestType, formData);

  return (
    <aside className="fade-in glass-panel h-fit rounded-3xl border border-slate-200 p-6 shadow-soft lg:sticky lg:top-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="title-font text-lg font-bold text-slate-900">Demande Client</p>
          <p className="mt-1 text-sm text-slate-500">Date: {getTodayDateLabel()}</p>
        </div>
        <div className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Aperçu prêt
        </div>
      </div>

      <div className="mb-5 rounded-2xl bg-slate-100 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Type de demande</p>
        <p className="title-font mt-1 text-base font-bold text-slate-900">{requestType.title}</p>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.label} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">{field.label}</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{field.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Imprimer
        </button>
      </div>
    </aside>
  );
}

export default PreviewCard;
