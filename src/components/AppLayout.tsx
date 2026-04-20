import { NavLink, Outlet } from "react-router-dom";
import { navLinks } from "../data/site";

const navClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
    isActive
      ? "bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-100"
      : "text-slate-600 hover:bg-white/80 hover:text-slate-950",
  ].join(" ");

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_28%,#f7f6ff_100%)] font-sans text-slate-900">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,#dbeafe_0%,rgba(255,255,255,0)_70%)]" />

      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1140px] flex-col justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center">
          <NavLink to="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <img src="/Images/image/logo.jpg" alt="Nettverkshuset logo" className="h-20 w-32 rounded-2xl object-contain sm:h-24 sm:w-44" />
          </NavLink>
          <nav className="flex flex-wrap items-center gap-3 rounded-full bg-slate-100/80 p-2 text-base shadow-inner shadow-slate-200/60">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClassName} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mx-auto mt-20 max-w-[1140px] px-6 pb-10">
        <div className="rounded-[2rem] border border-white/60 bg-white/80 px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-lg font-semibold text-slate-800">Nettverkshuset</p>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                Digital portfolio for candidates, collaboration, and visibility.
              </p>
            </div>
            <img src="/Images/image/logo.jpg" alt="Nettverkshuset logo" className="h-20 w-28 rounded-2xl object-contain" />
            <div className="flex gap-6 text-sm font-semibold text-slate-700">
              <a className="transition hover:text-indigo-700" href="https://www.linkedin.com/company/nettverkshuset.no/posts/?feedView=all" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="transition hover:text-indigo-700" href="https://www.facebook.com/p/Nettverkshuset-61568715764908/" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a className="transition hover:text-indigo-700" href="https://www.instagram.com/nettverkshuset/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
            Copyright @ 2025 by{" "}
            <a href="https://www.nettverkshuset.no/" target="_blank" rel="noreferrer" className="font-semibold text-indigo-700 hover:underline">
              Nettverkshuset
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
