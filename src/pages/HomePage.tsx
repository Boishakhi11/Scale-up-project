import { Link } from "react-router-dom";
import { usePortfolioCards } from "../hooks/usePortfolioCards";

export function HomePage() {
  const candidates = usePortfolioCards();

  return (
    <>
      <section className="mx-auto grid max-w-[1140px] gap-14 px-6 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            Scale Up Digital Portfolio
          </span>
          <h1 className="mt-6 max-w-2xl font-serif text-5xl font-bold leading-tight text-slate-900 sm:text-6xl">
            Digital <span className="text-indigo-600">Portefolje</span>
          </h1>
          <p className="mt-5 max-w-[570px] text-lg leading-8 text-slate-600 sm:text-xl">
            Her finner du digitale portefoljer fra deltakere i Scale Up-kurset. Utforsk kandidater, les mer om
            Nettverkshuset og ta kontakt dersom du vil samarbeide.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Create Portfolio
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400"
            >
              Om Oss
            </Link>
          </div>
          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{candidates.length}+</p>
              <p className="mt-1 text-sm text-slate-500">Candidates</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">Fast</p>
              <p className="mt-1 text-sm text-slate-500">Portfolio creation</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">Live</p>
              <p className="mt-1 text-sm text-slate-500">Showcase pages</p>
            </div>
          </div>
        </div>
        <div className="animate-float flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle,#c7d2fe_0%,rgba(199,210,254,0)_70%)] blur-2xl" />
            <div className="absolute -left-6 top-8 hidden rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-xl backdrop-blur sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Featured</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">Candidate stories</p>
            </div>
            <img
              src="/Images/image/cover.png"
              alt="Illustrasjon for Scale Up"
              className="relative max-h-[420px] w-full max-w-[570px] rounded-[2rem] border border-white/60 object-cover shadow-[0_30px_80px_rgba(79,70,229,0.2)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1140px] px-6">
        <div className="animate-fade-up text-center">
          <h2 className="font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
            Vare <span className="text-indigo-600">Kandidater</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 sm:text-xl">
            Her kan du bli bedre kjent med vare flotte kandidater gjennom Digital Portfolio.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {candidates.map((candidate) => {
            const hasProfile = Boolean(candidate.slug);

            return (
              <article
                key={candidate.name}
                className="card-lift animate-fade-up rounded-[1.75rem] border border-white/70 bg-white/90 px-5 py-6 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur"
              >
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="mx-auto h-[108px] w-[108px] rounded-full border-4 border-indigo-50 object-cover shadow-md"
                />
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{candidate.name}</h3>
                <p className="mt-2 min-h-12 text-base font-medium text-slate-600">{candidate.title}</p>
                <div className="mt-4">
                  {hasProfile ? (
                    <Link
                      to={`/portfolio/${candidate.slug}`}
                      className="inline-block w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-indigo-700"
                    >
                      PORTEFOLJE
                    </Link>
                  ) : (
                    <span className="inline-block w-full rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400">
                      Coming Soon
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1140px] px-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <img src="/Images/image/subscirbe.png" alt="Scale Up group" className="h-[320px] w-full object-cover" />
          <div className="px-6 py-10 sm:px-10">
            <h2 className="text-center font-serif text-4xl font-bold text-slate-900 sm:text-5xl">Fra Potensial til Praksis</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
              Hold deg oppdatert pa prosjektet, kandidater og nye muligheter for samarbeid.
            </p>
            <form className="mx-auto mt-8 flex max-w-2xl flex-col justify-center gap-3 sm:flex-row sm:items-center" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="Write Your Email"
                className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 outline-none transition focus:border-indigo-500"
              />
              <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:bg-indigo-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
