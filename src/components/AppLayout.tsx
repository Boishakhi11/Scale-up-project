import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { navLinks } from "../data/site";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";

const navClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
    isActive
      ? "bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-100"
      : "text-slate-600 hover:bg-white/80 hover:text-slate-950",
  ].join(" ");

export function AppLayout() {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/30 selection:text-indigo-900 flex flex-col">
      {/* Soft Background */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,#e0e7ff_0%,rgba(255,255,255,0)_70%)]" />

      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1140px] flex-col justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center">
          <NavLink to="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <img src="/Images/image/logo.jpg" alt="Nettverkshuset logo" className="h-14 w-auto rounded-xl object-contain" />
          </NavLink>
          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex flex-wrap items-center gap-1 rounded-full p-1 text-base bg-slate-100/80 shadow-inner shadow-slate-200/60">
              {navLinks.map((link) => {
                const targetPath = (!user && link.to === "/register") ? "/login" : link.to;
                return (
                  <NavLink key={link.to} to={targetPath} className={navClassName} end={link.to === "/"}>
                    {link.labelKey ? t(`nav.${link.labelKey}` as any) : link.label}
                  </NavLink>
                );
              })}
            </nav>
            
            {/* Language Controls */}
            <div className="flex p-1 rounded-full bg-slate-100/80 shadow-inner ml-auto sm:ml-0">
              <button 
                onClick={() => setLanguage("no")} 
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${language === "no" ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
              >
                NO
              </button>
              <button 
                onClick={() => setLanguage("en")} 
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${language === "en" ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
              >
                EN
              </button>
            </div>
            
            {/* Auth Control */}
            {user && (
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-bold text-indigo-700">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-1"></span>
                )}
                <span className="truncate max-w-[120px]">{user.name}</span>
              </div>
            )}
            <button
              onClick={handleAuthAction}
              className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-800"
            >
              {user ? "Logg ut" : "Logg inn"}
            </button>

          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mx-auto mt-auto w-full max-w-[1140px] px-6 pb-10 pt-20">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-xl font-bold text-slate-900">Nettverkshuset</p>
              <p className="mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
                {t("layout.footerDesc")}
              </p>
            </div>
            <img src="/Images/image/logo.jpg" alt="Nettverkshuset logo" className="h-16 w-auto rounded-xl object-contain" />
            <div className="flex gap-6 text-sm font-semibold text-slate-700">
              <a className="transition hover:text-indigo-600" href="https://www.linkedin.com/company/nettverkshuset.no/posts/?feedView=all" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="transition hover:text-indigo-600" href="https://www.facebook.com/p/Nettverkshuset-61568715764908/" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a className="transition hover:text-indigo-600" href="https://www.instagram.com/nettverkshuset/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 text-center text-sm border-t border-slate-100 text-slate-500">
            {t("layout.copyright")} {new Date().getFullYear()} by{" "}
            <a href="https://www.nettverkshuset.no/" target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:underline transition-colors">
              Nettverkshuset
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
