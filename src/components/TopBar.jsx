import { Link } from "react-router-dom";
import logo from "../assets/STAR.svg";

function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="STAR Assurances" className="h-12 w-auto object-contain sm:h-14" />
        </Link>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500 sm:text-xs">Agence</p>
          <p className="title-font text-sm font-bold text-slate-800 sm:text-lg">Mohamed Arbi Trigui</p>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-brand-700 via-brand-500 to-brandOrange-500" />
    </header>
  );
}

export default TopBar;
