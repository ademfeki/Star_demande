const inputClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

const checkboxRowClass =
  "flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-brand-300";

function ErrorText({ message }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

function DynamicForm({ requestType, register, watch, errors }) {
  const withGlassBreak = watch("extension.withGlassBreak");
  const isVehicleInsurance = watch("isVehicleInsurance");
  const isVehicleEligibleRequest =
    requestType.id === "resiliation" || requestType.id === "resiliation-ristourne";
  const showVehicleField = requestType.requiresVehicle || (isVehicleEligibleRequest && isVehicleInsurance);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="title-font text-base font-bold text-slate-900">Informations communes</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Numéro de police *</label>
            <input
              type="text"
              className={inputClass}
              {...register("policyNumber", {
                required: "Le numéro de police est obligatoire.",
              })}
            />
            <ErrorText message={errors.policyNumber?.message} />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Nom de l'assuré *</label>
            <input
              type="text"
              className={inputClass}
              {...register("insuredName", {
                required: "Le nom de l'assuré est obligatoire.",
              })}
            />
            <ErrorText message={errors.insuredName?.message} />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Échéance principale du contrat *</label>
            <input
              type="date"
              className={inputClass}
              {...register("mainDueDate", {
                required: "La date d'échéance est obligatoire.",
              })}
            />
            <ErrorText message={errors.mainDueDate?.message} />
          </div>

          {isVehicleEligibleRequest && (
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Ce contrat concerne un véhicule ?</label>
              <label className={`${checkboxRowClass} mt-2 max-w-xs`}>
                <input type="checkbox" {...register("isVehicleInsurance")} />
                <span className="text-sm text-slate-700">Oui, assurance véhicule</span>
              </label>
            </div>
          )}

          {showVehicleField && (
            <div>
              <label className="text-sm font-medium text-slate-700">Matricule véhicule *</label>
              <input
                type="text"
                className={inputClass}
                {...register("plateNumber", {
                  validate: (value) => {
                    if (!showVehicleField) {
                      return true;
                    }
                    return value?.trim() ? true : "Le matricule est obligatoire pour cette demande.";
                  },
                })}
              />
              <ErrorText message={errors.plateNumber?.message} />
            </div>
          )}
        </div>
      </section>

      {requestType.id === "resiliation" && (
        <section className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
          Cette demande ne nécessite pas de champs supplémentaires, sauf matricule en cas d'assurance véhicule.
        </section>
      )}

      {requestType.id === "resiliation-ristourne" && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="title-font text-base font-bold text-slate-900">Détails supplémentaires</h2>
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">Motif *</label>
            <textarea
              rows={4}
              className={inputClass}
              {...register("reason", {
                required: "Le motif est obligatoire.",
              })}
            />
            <ErrorText message={errors.reason?.message} />
          </div>
        </section>
      )}

      {requestType.id === "changement-fraction" && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="title-font text-base font-bold text-slate-900">Nouvelle fraction de paiement</h2>
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">Choix *</label>
            <select
              className={inputClass}
              {...register("fractionType", {
                required: "Veuillez choisir une fraction.",
              })}
            >
              <option value="">Sélectionner</option>
              <option value="Annuel">Annuel</option>
              <option value="Semestriel">Semestriel</option>
            </select>
            <ErrorText message={errors.fractionType?.message} />
          </div>
        </section>
      )}

      {requestType.id === "diminution-garantie" && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="title-font text-base font-bold text-slate-900">Garanties à retirer</h2>
          <div className="mt-4 grid gap-3">
            <label className={checkboxRowClass}>
              <input type="checkbox" {...register("diminution.withoutGlassBreak")} />
              <span className="text-sm text-slate-700">Sans bris de glace</span>
            </label>

            <label className={checkboxRowClass}>
              <input type="checkbox" {...register("diminution.withoutAssistance")} />
              <span className="text-sm text-slate-700">Sans assistance privilège</span>
            </label>

            <label className={checkboxRowClass}>
              <input type="checkbox" {...register("diminution.withoutAllRisk")} />
              <span className="text-sm text-slate-700">Sans tous risques</span>
            </label>

            <label className={checkboxRowClass}>
              <input type="checkbox" {...register("diminution.withoutCollision")} />
              <span className="text-sm text-slate-700">Sans dommage collision</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">Valeur du véhicule (optionnel)</label>
            <input
              type="number"
              min="0"
              className={inputClass}
              {...register("diminution.vehicleValue")}
            />
            <ErrorText message={errors.diminution?.vehicleValue?.message} />
          </div>
        </section>
      )}

      {requestType.id === "extension-garantie" && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="title-font text-base font-bold text-slate-900">Garanties à ajouter</h2>

          <div className="mt-4 space-y-3">
            <label className={checkboxRowClass}>
              <input type="checkbox" {...register("extension.withGlassBreak")} />
              <span className="text-sm text-slate-700">Avec bris de glace</span>
            </label>

            {withGlassBreak && (
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <label className="text-sm font-medium text-slate-700">Montant bris de glace *</label>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  {...register("extension.glassBreakAmount", {
                    required: withGlassBreak ? "Le montant est obligatoire." : false,
                  })}
                />
                <ErrorText message={errors.extension?.glassBreakAmount?.message} />
              </div>
            )}

            <label className={checkboxRowClass}>
              <input type="checkbox" {...register("extension.withAssistance")} />
              <span className="text-sm text-slate-700">Avec assistance privilège</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">Valeur du véhicule (optionnel)</label>
            <input
              type="number"
              min="0"
              className={inputClass}
              {...register("extension.vehicleValue")}
            />
            <ErrorText message={errors.extension?.vehicleValue?.message} />
          </div>
        </section>
      )}
    </div>
  );
}

export default DynamicForm;
