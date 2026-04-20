import { useParams, Link } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import { getPortfolioBySlug } from "../lib/portfolioStore";

export function PortfolioPage() {
  const { slug } = useParams();
  const portfolio = slug ? getPortfolioBySlug(slug) : undefined;

  if (!portfolio) {
    return <NotFoundPage />;
  }

  // Helper for scrolling to sections
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-32">
      
      {/* ── PORTFOLIO NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#030712]/70 border-b border-white/5">
        <div className="text-white font-bold text-xl tracking-tight">
          {portfolio.shortName}<span className="text-indigo-500">.</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors">Skills</button>
          <button onClick={() => scrollTo('experience')} className="hover:text-white transition-colors">Experience</button>
          <a href={`mailto:${portfolio.email}`} className="text-white px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            Contact
          </a>
        </div>
        <div className="sm:hidden">
          <Link to="/" className="text-xs text-slate-500 hover:text-white">← Scale Up</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-indigo-600/20 blur-[120px] rounded-full -z-10" />
        
        <div className="mx-auto max-w-5xl flex flex-col items-center text-center animate-[fadeUp_0.8s_ease]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for work
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[1.1] text-white">
            Hi, I'm {portfolio.firstName}.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {portfolio.title}
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            {portfolio.intro}
          </p>
          <div className="mt-10 flex gap-4">
            <a 
              href={`mailto:${portfolio.email}`}
              className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-transform"
            >
              Get in touch
            </a>
            {portfolio.linkedin && (
              <a 
                href={portfolio.linkedin.startsWith('http') ? portfolio.linkedin : `https://${portfolio.linkedin}`}
                target="_blank" rel="noreferrer"
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── BENTO GRID OVERVIEW ── */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* Main About Box */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between group hover:bg-white/[0.07] transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
            <h2 className="text-2xl font-bold text-white mb-4 relative z-10">About Me</h2>
            <p className="text-slate-400 leading-relaxed text-lg relative z-10">
              {portfolio.about}
            </p>
          </div>

          {/* Photo Box */}
          <div className="md:col-span-1 md:row-span-2 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative">
            <img 
              src={portfolio.image} 
              alt={portfolio.fullName} 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/Images/image/woman.png";
              }}
            />
          </div>

          {/* Location Box */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-center items-center text-center group hover:bg-white/[0.07] transition-colors">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-1">Based in</p>
            <p className="text-lg font-bold text-white">{portfolio.location}</p>
          </div>

          {/* Contact Details Box */}
          <div className="md:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-center group hover:bg-white/[0.07] transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-around gap-6 text-center">
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-1">Email</p>
                <a href={`mailto:${portfolio.email}`} className="text-lg font-bold text-white hover:text-indigo-400 transition-colors">{portfolio.email}</a>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-1">Phone</p>
                <a href={`tel:${portfolio.phone}`} className="text-lg font-bold text-white hover:text-indigo-400 transition-colors">{portfolio.phone || "Not provided"}</a>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">My Arsenal</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {portfolio.skills.map((skill, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-5 py-3 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              {skill.image && (
                <img src={skill.image} alt={skill.name} className="h-6 w-6 object-contain" />
              )}
              <div>
                <p className="text-white font-semibold">{skill.name}</p>
                <p className="text-xs text-slate-400">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE & EDUCATION ── */}
      <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          
          {/* Experience Timeline */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
              <span className="text-indigo-500">❖</span> Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {portfolio.experiences.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-[#030712] bg-indigo-500 shrink-0 absolute left-0 ml-[-2px] md:ml-0 md:left-1/2 md:-translate-x-1/2 shadow" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex flex-col mb-2">
                      <span className="text-sm font-semibold text-indigo-400 mb-1">{item.period}</span>
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <span className="text-sm font-medium text-slate-400">{item.org}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
              <span className="text-cyan-500">❖</span> Education
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {portfolio.education.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-[#030712] bg-cyan-500 shrink-0 absolute left-0 ml-[-2px] md:ml-0 md:left-1/2 md:-translate-x-1/2 shadow" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex flex-col mb-2">
                      <span className="text-sm font-semibold text-cyan-400 mb-1">{item.period}</span>
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <span className="text-sm font-medium text-slate-400">{item.org}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mx-auto max-w-5xl px-6 pt-20 pb-10 text-center border-t border-white/10 mt-10">
        <h2 className="text-4xl font-bold text-white mb-8">Ready to build something?</h2>
        <a 
          href={`mailto:${portfolio.email}`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-transform"
        >
          Let's talk
        </a>
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {portfolio.fullName}. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link to="/" className="hover:text-white transition-colors">Powered by Nettverkshuset</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
