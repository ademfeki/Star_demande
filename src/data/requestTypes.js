export const requestTypes = [
  {
    id: "resiliation",
    title: "Résiliation",
    description: "Demande de résiliation du contrat en cours.",
    requiresVehicle: false,
  },
  {
    id: "resiliation-ristourne",
    title: "Résiliation + Ristourne",
    description: "Résiliation du contrat avec demande de ristourne associée.",
    requiresVehicle: false,
  },
  {
    id: "changement-fraction",
    title: "Changement de fraction",
    description: "Modification de la périodicité de paiement.",
    requiresVehicle: false,
  },
  {
    id: "diminution-garantie",
    title: "Diminution de garantie",
    description: "Suppression de garanties pour adapter le contrat.",
    requiresVehicle: true,
  },
  {
    id: "extension-garantie",
    title: "Extension de garantie",
    description: "Ajout de garanties supplémentaires au contrat.",
    requiresVehicle: true,
  },
];

export function getRequestTypeById(requestTypeId) {
  return requestTypes.find((request) => request.id === requestTypeId);
}
