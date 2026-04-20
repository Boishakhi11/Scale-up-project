import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { NotFoundPage } from "./NotFoundPage";
import { getPortfolioBySlug, subscribeToPortfolioUpdates } from "../lib/portfolioStore";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";

export function PortfolioPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Force re-render when portfolio updates (e.g., returning from edit)
  const [, setVersion] = useState(0);
  useEffect(() => {
    return subscribeToPortfolioUpdates(() => setVersion(v => v + 1));
  }, []);

  const portfolio = slug ? getPortfolioBySlug(slug) : undefined;

  if (!portfolio) {
    return <NotFoundPage />;
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200 selection:text-indigo-900 pb-32">
      
      {/* ── PORTFOLIO NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="font-bold text-xl tracking-tight text-slate-900">
          {portfolio.shortName}<span className="text-indigo-600">.</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => scrollTo('about')} className="hover:text-indigo-600 transition-colors">{t("portfolio.aboutMe")}</button>
          <button onClick={() => scrollTo('skills')} className="hover:text-indigo-600 transition-colors">{t("portfolio.capabilities")}</button>
          <button onClick={() => scrollTo('experience')} className="hover:text-indigo-600 transition-colors">{t("portfolio.experience")}</button>
          
          {user?.email === portfolio.email && (
            <Link to={`/register?edit=${portfolio.slug}`} className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-colors font-bold shadow-md hover:-translate-y-0.5 hover:shadow-lg">
              {t("register.titleEdit")}
            </Link>
          )}
        </div>
        <div className="sm:hidden">
          <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-indigo-600">← Scale Up</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8 justify-between">
        <div className="flex-1 animate-[fadeUp_0.8s_ease]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t("portfolio.availableForWork")}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            {t("portfolio.hello")} {portfolio.firstName}.<br />
            <span className="text-indigo-600">
              {portfolio.title}
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
            {portfolio.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a 
              href={`mailto:${portfolio.email}`}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold hover:from-indigo-600 hover:to-indigo-700 transition-colors shadow-md hover:-translate-y-0.5 transition-transform hover:shadow-lg"
            >
              {t("portfolio.getInTouch")}
            </a>
            {portfolio.linkedin && (
              <a 
                href={portfolio.linkedin.startsWith('http') ? portfolio.linkedin : `https://${portfolio.linkedin}`}
                target="_blank" rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm hover:-translate-y-0.5 transition-transform"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
        <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 animate-[fadeUp_0.8s_ease_0.2s]">
          <img 
            src={portfolio.image} 
            alt={portfolio.fullName} 
            className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/Images/image/woman.png";
            }}
          />
        </div>
      </header>

      {/* ── ABOUT & INFO ── */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("portfolio.aboutMe")}</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {portfolio.about}
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-indigo-50 border border-indigo-100 p-8 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold mb-1">{t("portfolio.basedIn")}</p>
                <p className="text-xl font-extrabold text-indigo-900">{portfolio.location}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-center gap-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">{t("portfolio.email")}</p>
                <a href={`mailto:${portfolio.email}`} className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">{portfolio.email}</a>
              </div>
              <div className="w-full h-px bg-slate-100" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">{t("portfolio.phone")}</p>
                <a href={`tel:${portfolio.phone}`} className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">{portfolio.phone || t("portfolio.notProvided")}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">{t("portfolio.capabilities")}</h2>
        <div className="flex flex-wrap gap-3">
          {portfolio.skills.map((skill, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 rounded-full bg-white border border-slate-200 px-6 py-3 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-300"
            >
              {skill.image && (
                <img src={skill.image} alt={skill.name} className="h-5 w-5 object-contain" />
              )}
              <span className="text-slate-800 font-bold text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE & EDUCATION ── */}
      <section id="experience" className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-16 md:grid-cols-2">
          
          {/* Experience Timeline */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
              {t("portfolio.experience")}
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[2px] before:bg-slate-200">
              {portfolio.experiences.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-6">
                  <div className="w-6 h-6 rounded-full border-4 border-slate-50 bg-indigo-500 shrink-0 z-10 shadow-sm mt-1" />
                  <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.period}</span>
                      <h3 className="font-extrabold text-slate-900 text-lg">{item.title}</h3>
                      <span className="text-sm font-semibold text-indigo-600">{item.org}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
              {t("portfolio.education")}
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[2px] before:bg-slate-200">
              {portfolio.education.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-6">
                  <div className="w-6 h-6 rounded-full border-4 border-slate-50 bg-slate-400 shrink-0 z-10 shadow-sm mt-1" />
                  <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.period}</span>
                      <h3 className="font-extrabold text-slate-900 text-lg">{item.title}</h3>
                      <span className="text-sm font-semibold text-slate-600">{item.org}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center mt-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">{t("portfolio.readyToBuild")}</h2>
        <a 
          href={`mailto:${portfolio.email}`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold hover:from-indigo-600 hover:to-indigo-700 transition-colors shadow-md hover:-translate-y-0.5 transition-transform hover:shadow-lg"
        >
          {t("portfolio.letsTalk")}
        </a>
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} {portfolio.fullName}. {t("portfolio.allRightsReserved")}</p>
          <div className="mt-4 md:mt-0">
            <Link to="/" className="hover:text-indigo-600 transition-colors">{t("portfolio.poweredBy")}</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
