import { useParams } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import { getPortfolioBySlug } from "../lib/portfolioStore";

export function PortfolioPage() {
  const { slug } = useParams();
  const portfolio = slug ? getPortfolioBySlug(slug) : undefined;

  if (!portfolio) {
    return <NotFoundPage />;
  }

  return (
    <div className="font-sans">
      <section className="bg-transparent px-6 py-8">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-4xl font-semibold text-slate-900">
            {portfolio.shortName.slice(0, 3)}
            <span className="text-indigo-600">{portfolio.shortName.slice(3)}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1140px] gap-10 px-6 py-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div className="animate-fade-up">
          <span className="inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            Candidate Portfolio
          </span>
          <p className="mt-6 text-lg font-semibold text-slate-600">Hi, I am</p>
          <h1 className="mt-3 text-5xl font-bold text-slate-900 sm:text-6xl">{portfolio.fullName}</h1>
          <p className="mt-5 max-w-[570px] text-lg leading-8 text-slate-600">{portfolio.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700" href={`mailto:${portfolio.email}`}>
              Contact
            </a>
            <a className="rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50" href={`tel:${portfolio.phone}`}>
              Call
            </a>
          </div>
        </div>
        <div className="animate-float">
          <img
            src={portfolio.image}
            alt={portfolio.fullName}
            className="w-full rounded-[2rem] border border-white/60 object-cover shadow-[0_30px_80px_rgba(79,70,229,0.18)]"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/Images/image/woman.png";
            }}
          />
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-[1140px] rounded-[2rem] border border-white/60 bg-white/85 px-6 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <h2 className="text-4xl font-semibold text-slate-900">About Me</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">{portfolio.about}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Name</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{portfolio.shortName}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{portfolio.email}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Date-of-Birth</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{portfolio.birthDate || "Not provided"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">From</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{portfolio.location}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold text-slate-900">What Do I Do</h2>
          <p className="mt-4 text-slate-600">Kompetanse og fokusomrader hentet direkte fra registreringsskjemaet.</p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {portfolio.skills.map((skill) => (
            <article key={skill.name} className="card-lift animate-fade-up rounded-[1.5rem] border border-white/70 bg-white/90 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              {skill.image ? <img src={skill.image} alt={skill.name} className="h-14 w-14 object-contain" /> : <div className="h-14 w-14 rounded-full bg-indigo-100" />}
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{skill.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{skill.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1140px] px-6 pb-8">
        <h2 className="text-center text-4xl font-semibold text-slate-900">A Summary Of my Resume</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl font-semibold text-slate-950">My Experience</h2>
            <div className="mt-8 space-y-6">
              {portfolio.experiences.map((item, index) => (
                <article key={`${item.title}-${index}`} className="border-l-2 border-sky-200 pl-5">
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                    {item.org} • {item.period}
                  </p>
                  <p className="mt-3 text-slate-600">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl font-semibold text-slate-950">My Education</h2>
            <div className="mt-8 space-y-6">
              {portfolio.education.map((item, index) => (
                <article key={`${item.title}-${index}`} className="border-l-2 border-amber-200 pl-5">
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                    {item.org} • {item.period}
                  </p>
                  <p className="mt-3 text-slate-600">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
