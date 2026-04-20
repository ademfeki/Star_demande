import { Link } from "react-router-dom";

function RequestCard({ requestType }) {
  return (
    <Link
      to={`/demande/${requestType.id}`}
      className="group glass-panel relative overflow-hidden rounded-2xl border border-slate-200 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-500"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-100 opacity-70 transition duration-300 group-hover:scale-125" />
      <h2 className="title-font relative text-xl font-bold text-slate-900">{requestType.title}</h2>
      <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{requestType.description}</p>
      <div className="relative mt-5 text-sm font-semibold text-brand-700">Commencer la demande →</div>
    </Link>
  );
}

export default RequestCard;
