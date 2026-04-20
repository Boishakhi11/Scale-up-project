import { teamMembers } from "../data/site";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-[1140px] px-6 py-10">
      <section className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="animate-fade-up">
          <span className="inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            Om Oss
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold text-slate-900 sm:text-6xl">Om Nettverkshuset</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
            Nettverkshuset kobler mennesker, ideer og kulturer. Gjennom kurs, aktiviteter og samarbeid skaper vi rom
            for laering, synlighet og nye muligheter.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <img
            src="/Images/image/group.jpeg"
            alt="Nettverkshuset aktivitet"
            className="card-lift h-64 w-full rounded-[1.75rem] object-cover shadow-xl"
          />
          <img
            src="/Images/image/header_bg.png"
            alt="Nettverkshuset fellesskap"
            className="card-lift h-64 w-full rounded-[1.75rem] object-cover shadow-xl sm:translate-y-8"
          />
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-slate-900">Teamet bak Nettverkshuset</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Mennesker som bygger aktivitet, samarbeid og synlighet rundt deltakerne.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <article key={member.name} className="card-lift animate-fade-up grid gap-6 rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:grid-cols-[220px_1fr]">
              <img
                src={member.image}
                alt={member.name}
                className="h-56 w-full rounded-[1.25rem] object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/Images/image/developer.png";
                }}
              />
              <div>
                <h3 className="text-3xl font-semibold text-slate-900">Mot {member.name}</h3>
                <p className="mt-3 text-base font-semibold uppercase tracking-[0.2em] text-indigo-600">{member.title}</p>
                <p className="mt-4 leading-7 text-slate-600">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center font-serif text-4xl font-bold text-slate-900">Samarbeidspartnere</h2>
        <div className="marquee mt-8 rounded-[1.75rem] border border-white/70 bg-white/85 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
          <div className="marquee-track">
            <img src="/Images/image/partners.png" alt="Samarbeidspartnere" className="marquee-image" />
            <img src="/Images/image/partners.png" alt="" aria-hidden="true" className="marquee-image" />
          </div>
        </div>
      </section>
    </div>
  );
}
