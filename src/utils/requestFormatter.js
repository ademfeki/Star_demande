function normalizeText(value) {
  if (value === undefined || value === null || value === "") {
    return "Non renseigné";
  }
  return String(value);
}

export function getTodayDateLabel() {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date());
}

export function buildRequestFields(requestType, formData) {
  const isVehicleEligibleRequest =
    requestType.id === "resiliation" || requestType.id === "resiliation-ristourne";
  const hasVehicle = requestType.requiresVehicle || (isVehicleEligibleRequest && formData.isVehicleInsurance);

  const fields = [
    { label: "Numéro de police", value: normalizeText(formData.policyNumber) },
    { label: "Nom de l'assuré", value: normalizeText(formData.insuredName) },
    {
      label: "Échéance principale du contrat",
      value: normalizeText(formData.mainDueDate),
    },
  ];

  if (isVehicleEligibleRequest) {
    fields.push({
      label: "Contrat véhicule",
      value: formData.isVehicleInsurance ? "Oui" : "Non",
    });
  }

  if (hasVehicle) {
    fields.push({
      label: "Matricule véhicule",
      value: normalizeText(formData.plateNumber),
    });
  }

  if (requestType.id === "resiliation-ristourne") {
    fields.push({
      label: "Motif",
      value: normalizeText(formData.reason),
    });
  }

  if (requestType.id === "changement-fraction") {
    fields.push({
      label: "Nouvelle fraction",
      value: normalizeText(formData.fractionType),
    });
  }

  if (requestType.id === "diminution-garantie") {
    const options = [];

    if (formData.diminution?.withoutGlassBreak) options.push("Sans bris de glace");
    if (formData.diminution?.withoutAssistance) options.push("Sans assistance privilège");
    if (formData.diminution?.withoutAllRisk) options.push("Sans tous risques");
    if (formData.diminution?.withoutCollision) options.push("Sans dommage collision");

    fields.push({
      label: "Garanties retirées",
      value: options.length > 0 ? options.join(", ") : "Aucune option sélectionnée",
    });

    if (formData.diminution?.vehicleValue !== undefined && formData.diminution?.vehicleValue !== "") {
      fields.push({
        label: "Valeur du véhicule",
        value: normalizeText(formData.diminution?.vehicleValue),
      });
    }
  }

  if (requestType.id === "extension-garantie") {
    fields.push({
      label: "Avec bris de glace",
      value: formData.extension?.withGlassBreak ? "Oui" : "Non",
    });

    if (formData.extension?.withGlassBreak) {
      fields.push({
        label: "Montant bris de glace",
        value: normalizeText(formData.extension?.glassBreakAmount),
      });
    }

    fields.push({
      label: "Avec assistance privilège",
      value: formData.extension?.withAssistance ? "Oui" : "Non",
    });

    if (formData.extension?.vehicleValue !== undefined && formData.extension?.vehicleValue !== "") {
      fields.push({
        label: "Valeur du véhicule",
        value: normalizeText(formData.extension?.vehicleValue),
      });
    }
  }

  return fields;
}
