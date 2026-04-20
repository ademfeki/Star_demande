import { jsPDF } from "jspdf";

function normalizeValue(value) {
  if (value === undefined || value === null || value === "") {
    return "Non renseigné";
  }

  return String(value);
}

function formatDateValue(value) {
  if (!value) {
    return "Non renseignée";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  return String(value);
}

function stripAccents(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatTodayNumeric() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

function buildLetterObject(requestType) {
  return stripAccents(requestType.title);
}

function buildDiminutionDetails(formData) {
  const removed = [];

  if (formData.diminution?.withoutGlassBreak) {
    removed.push("Sans bris de glace");
  }
  if (formData.diminution?.withoutAssistance) {
    removed.push("Sans assistance privilege");
  }
  if (formData.diminution?.withoutAllRisk) {
    removed.push("Sans tous risques");
  }
  if (formData.diminution?.withoutCollision) {
    removed.push("Sans dommage collision");
  }

  const lines = ["Garanties a diminuer :"];

  if (removed.length === 0) {
    lines.push("- Aucune garantie selectionnee");
  } else {
    removed.forEach((item) => lines.push(`- ${item}`));
  }

  if (formData.diminution?.vehicleValue !== undefined && formData.diminution?.vehicleValue !== "") {
    lines.push(`Valeur du vehicule : ${normalizeValue(formData.diminution?.vehicleValue)}`);
  }

  return lines;
}

function buildExtensionDetails(formData) {
  const lines = ["Garanties a ajouter :"];

  if (formData.extension?.withGlassBreak) {
    lines.push(
      `- Avec bris de glace (montant: ${normalizeValue(formData.extension?.glassBreakAmount)})`
    );
  }

  if (formData.extension?.withAssistance) {
    lines.push("- Avec assistance privilege");
  }

  if (lines.length === 1) {
    lines.push("- Aucune garantie selectionnee");
  }

  if (formData.extension?.vehicleValue !== undefined && formData.extension?.vehicleValue !== "") {
    lines.push(`Valeur du vehicule : ${normalizeValue(formData.extension?.vehicleValue)}`);
  }

  return lines;
}

function buildMotifLine(requestType, formData) {
  if (requestType.id === "changement-fraction") {
    return [`Changement de fractionnement : ${normalizeValue(formData.fractionType)}`];
  }

  if (requestType.id === "diminution-garantie") {
    return buildDiminutionDetails(formData);
  }

  if (requestType.id === "extension-garantie") {
    return buildExtensionDetails(formData);
  }

  if (formData.reason?.trim()) {
    return [formData.reason.trim()];
  }

  if (requestType.id === "resiliation" && formData.isVehicleInsurance) {
    return ["Resiliation suite vent vehicule"];
  }

  return [`Demande de ${stripAccents(requestType.title.toLowerCase())}`];
}

export function generateRequestPdf(requestType, formData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const labelX = 76;
  const objectLabelX = 138;
  const dateX = 350;
  const bodyStartY = 300;
  const lineGap = 62;
  const infoFontSize = 20;
  const headingFontSize = 23;
  const motifFontSize = 20;
  const dateFontSize = 18;
  const signatureFontSize = 23;
  let y = bodyStartY;

  const hasMatricule = Boolean(formData.plateNumber?.trim());
  const objectText = buildLetterObject(requestType);
  const motifText = buildMotifLine(requestType, formData);

  const drawFieldLine = (label, value, yPosition) => {
    doc.setFont("times", "bold");
    doc.setFontSize(infoFontSize);
    doc.text(label, labelX, yPosition);

    const valueStartX = labelX + doc.getTextWidth(label) + 14;

    doc.setFont("times", "normal");
    doc.text(value, valueStartX, yPosition);
  };

  doc.setFont("times", "bold");
  doc.setFontSize(dateFontSize);
  doc.text(`Sfax, le ${formatTodayNumeric()}`, dateX, 92);

  doc.setFont("times", "bold");
  doc.setFontSize(headingFontSize);
  doc.text("OBJET :", objectLabelX, 220);
  const objectValueX = objectLabelX + doc.getTextWidth("OBJET :") + 22;
  doc.setFont("times", "normal");
  doc.text(objectText, objectValueX, 220);

  drawFieldLine("POLICE :", normalizeValue(formData.policyNumber), y);

  y += lineGap;
  drawFieldLine("ASSURE :", normalizeValue(formData.insuredName), y);

  if (hasMatricule) {
    y += lineGap;
    drawFieldLine("MATRICULE :", normalizeValue(formData.plateNumber), y);
  }

  y += lineGap;
  drawFieldLine("ECHEANCE PRINCIPALE :", formatDateValue(formData.mainDueDate), y);

  y += 70;
  const motifLines = doc.splitTextToSize(motifText.join("\n"), 430);
  doc.setFont("times", "normal");
  doc.setFontSize(motifFontSize);
  doc.text(motifLines, 150, y, { lineHeightFactor: 1.42 });

  doc.setFont("times", "bold");
  doc.setFontSize(signatureFontSize);
  doc.text("SIGNATURE", 386, 700);

  doc.save(`demande-${requestType.id}.pdf`);
}
