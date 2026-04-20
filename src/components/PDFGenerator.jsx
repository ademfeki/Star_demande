function PDFGenerator({ onGenerate }) {
  return (
    <button
      type="button"
      onClick={onGenerate}
      className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
    >
      Générer PDF
    </button>
  );
}

export default PDFGenerator;
