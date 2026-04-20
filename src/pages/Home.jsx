import RequestCard from "../components/RequestCard";
import { requestTypes } from "../data/requestTypes";

function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <section className="fade-in glass-panel relative overflow-hidden rounded-3xl border border-slate-200 p-8 shadow-soft sm:p-10">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-100 opacity-70" />
        <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-brandOrange-100 opacity-80" />
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Agence d'assurance</p>
        <h1 className="title-font mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          Soumettez vos demandes en quelques étapes
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Sélectionnez le type de demande, complétez le formulaire dynamique, prévisualisez le document final
          puis téléchargez votre PDF.
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {requestTypes.map((requestType) => (
          <RequestCard key={requestType.id} requestType={requestType} />
        ))}
      </section>
    </main>
  );
}

export default Home;
