import { FormEvent, KeyboardEvent, useState, useEffect } from "react";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { createPortfolio, getPortfolioBySlug } from "../lib/portfolioStore";
import { useAuth } from "../lib/AuthContext";

/* ─── Types ─────────────────────────────────────────────── */
type ResumeRow = { title: string; org: string; period: string; summary: string };

type FormData = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  image: string;
  linkedin: string;
  github: string;
  intro: string;
  about: string;
  skills: string[];
  experiences: ResumeRow[];
  education: ResumeRow[];
};

type StepErrors = Record<string, string>;

const emptyRow = (): ResumeRow => ({ title: "", org: "", period: "", summary: "" });

const initialData: FormData = {
  firstName: "", lastName: "", title: "", email: "",
  phone: "", location: "", birthDate: "", image: "",
  linkedin: "", github: "",
  intro: "", about: "",
  skills: [],
  experiences: [emptyRow()],
  education: [emptyRow()],
};

const STEPS = [
  { id: 1, label: "Personlig info",    icon: "👤" },
  { id: 2, label: "Ferdigheter",       icon: "💡" },
  { id: 3, label: "Erfaring & Utdanning", icon: "🎓" },
];

const SUGGESTED_SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "SQL", "MongoDB", "Tailwind CSS", "Git",
  "Figma", "UX Design", "Dataanalyse", "Maskinlæring", "AWS",
];

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 shadow-sm";

const inputErrCls =
  "w-full rounded-xl border border-red-400 bg-red-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 shadow-sm";

const labelCls = "block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2";

/* ─── Validation ─────────────────────────────────────────── */
function validateStep(step: number, data: FormData): StepErrors {
  const errors: StepErrors = {};

  if (step === 1) {
    if (!data.firstName.trim())  errors.firstName = "Fornavn er påkrevd.";
    if (!data.title.trim())      errors.title     = "Yrkestittel er påkrevd.";
    if (!data.email.trim())      errors.email     = "E-post er påkrevd.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Ugyldig e-postadresse.";
    if (!data.location.trim())   errors.location  = "Sted er påkrevd.";
  }

  if (step === 2) {
    if (!data.intro.trim())          errors.intro  = "Kort introduksjon er påkrevd.";
    if (!data.about.trim())          errors.about  = "Om meg er påkrevd.";
    if (data.skills.length === 0)    errors.skills = "Legg til minst én ferdighet.";
  }

  if (step === 3) {
    const hasExp = data.experiences.some((r) => r.title.trim());
    const hasEdu = data.education.some((r) => r.title.trim());
    if (!hasExp) errors.experiences = "Legg til minst én arbeidserfaring.";
    if (!hasEdu) errors.education   = "Legg til minst én utdanning.";
  }

  return errors;
}

/* ────────────────────────────────────────────────────────── */
export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get("edit");
  
  const [step, setStep]       = useState(1);
  const [data, setData]       = useState<FormData>(initialData);
  const [errors, setErrors]   = useState<StepErrors>({});
  const [skillInput, setSkillInput] = useState("");
  const [submitted, setSubmitted]   = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (editSlug) {
      const existing = getPortfolioBySlug(editSlug);
      if (existing) {
        setData({
          firstName: existing.firstName,
          lastName: existing.lastName,
          title: existing.title,
          email: existing.email,
          phone: existing.phone,
          location: existing.location,
          birthDate: existing.birthDate,
          image: existing.image,
          linkedin: "",
          github: "",
          intro: existing.intro,
          about: existing.about,
          skills: existing.skills.map(s => s.name),
          experiences: existing.experiences.length ? existing.experiences : [emptyRow()],
          education: existing.education.length ? existing.education : [emptyRow()],
        });
      }
    }
  }, [editSlug]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const set = (field: keyof FormData, value: unknown) =>
    setData((d) => ({ ...d, [field]: value }));

  const clearError = (field: string) =>
    setErrors((e) => { const next = { ...e }; delete next[field]; return next; });

  const setRow = (
    section: "experiences" | "education",
    idx: number,
    field: keyof ResumeRow,
    value: string
  ) =>
    setData((d) => {
      const rows = [...d[section]];
      rows[idx] = { ...rows[idx], [field]: value };
      return { ...d, [section]: rows };
    });

  const addRow    = (s: "experiences" | "education") =>
    setData((d) => ({ ...d, [s]: [...d[s], emptyRow()] }));
  const removeRow = (s: "experiences" | "education", idx: number) =>
    setData((d) => ({ ...d, [s]: d[s].filter((_, i) => i !== idx) }));

  const addSkill = (s: string) => {
    const trimmed = s.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      setData((d) => ({ ...d, skills: [...d.skills, trimmed] }));
      clearError("skills");
    }
  };
  const removeSkill = (s: string) =>
    setData((d) => ({ ...d, skills: d.skills.filter((k) => k !== s) }));

  const handleSkillKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
      setSkillInput("");
    }
  };

  const goNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep(3, data);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }

    const skillsText    = data.skills.join("\n");
    const experienceText = data.experiences
      .filter((r) => r.title.trim())
      .map((r) => `${r.title} | ${r.org} | ${r.period} | ${r.summary}`)
      .join("\n");
    const educationText = data.education
      .filter((r) => r.title.trim())
      .map((r) => `${r.title} | ${r.org} | ${r.period} | ${r.summary}`)
      .join("\n");

    const portfolio = createPortfolio({
      firstName: data.firstName, lastName: data.lastName,
      title: data.title, email: data.email, phone: data.phone,
      location: data.location, birthDate: data.birthDate, image: data.image,
      intro: data.intro, about: data.about,
      skillsText, experienceText, educationText,
    }, editSlug || undefined);

    setSubmitted(true);
    setTimeout(() => navigate(`/portfolio/${portfolio.slug}`), 1200);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const field = (name: string) => (errors[name] ? inputErrCls : inputCls);

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl bg-indigo-100">🎉</div>
          <h2 className="text-2xl font-extrabold text-slate-900">Portefølje opprettet!</h2>
          <p className="text-slate-600">Du blir videresendt…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Title */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            ✨ Porteføljebygger
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {editSlug ? "Rediger portefølje" : "Opprett din digitale portefølje"}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-600">
            Fyll inn tre enkle steg og porteføljesiden din er klar med én gang.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            {STEPS.map((s) => (
              <button
                key={s.id} type="button"
                onClick={() => s.id < step && setStep(s.id)}
                className={[
                  "flex items-center gap-2 text-xs font-semibold transition",
                  s.id === step ? "text-indigo-700" : s.id < step ? "cursor-pointer text-emerald-600" : "text-slate-400",
                ].join(" ")}
              >
                <span className={[
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 text-sm transition font-bold",
                  s.id === step    ? "border-indigo-600 bg-indigo-600 text-white"
                  : s.id < step   ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-300 bg-white text-slate-400",
                ].join(" ")}>{s.id < step ? "✓" : s.id}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

          {/* Step header */}
          <div className="border-b border-indigo-100 bg-indigo-50/50 px-8 py-7">
            <p className="text-2xl">{STEPS[step - 1].icon}</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              Steg {step} — {STEPS[step - 1].label}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6 px-8 py-8">

              {/* ══ STEP 1 ══ */}
              {step === 1 && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Fornavn *</label>
                      <input className={field("firstName")} placeholder="Boishakhi"
                        value={data.firstName}
                        onChange={(e) => { set("firstName", e.target.value); clearError("firstName"); }} />
                      {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Etternavn</label>
                      <input className={inputCls} placeholder="Ghosh"
                        value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Yrkestittel *</label>
                    <input className={field("title")} placeholder="Frontend-utvikler"
                      value={data.title}
                      onChange={(e) => { set("title", e.target.value); clearError("title"); }} />
                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>E-post *</label>
                      <input type="email" className={field("email")} placeholder="deg@eksempel.no"
                        value={data.email}
                        onChange={(e) => { set("email", e.target.value); clearError("email"); }} />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Telefon</label>
                      <input type="tel" className={inputCls} placeholder="+47 000 00 000"
                        value={data.phone} onChange={(e) => set("phone", e.target.value)} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Sted *</label>
                      <input className={field("location")} placeholder="Oslo, Norge"
                        value={data.location}
                        onChange={(e) => { set("location", e.target.value); clearError("location"); }} />
                      {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Fødselsdato</label>
                      <input className={inputCls} placeholder="15. april 1996"
                        value={data.birthDate} onChange={(e) => set("birthDate", e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Profilbilde (URL)</label>
                    <input className={inputCls} placeholder="https://eksempel.no/bilde.jpg"
                      value={data.image} onChange={(e) => set("image", e.target.value)} />
                    {data.image && (
                      <div className="mt-3 flex items-center gap-3">
                        <img src={data.image} alt="forhåndsvisning"
                          className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                          onError={(e) => (e.currentTarget.style.display = "none")} />
                        <span className="text-xs text-slate-400">Forhåndsvisning</span>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>LinkedIn-profil</label>
                      <input className={inputCls} placeholder="https://linkedin.com/in/ditt-navn"
                        value={data.linkedin} onChange={(e) => set("linkedin", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>GitHub-profil</label>
                      <input className={inputCls} placeholder="https://github.com/ditt-navn"
                        value={data.github} onChange={(e) => set("github", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {/* ══ STEP 2 ══ */}
              {step === 2 && (
                <>
                  <div>
                    <label className={labelCls}>Kort introduksjon *</label>
                    <p className="mb-2 text-xs text-slate-400">Vises øverst på porteføljesiden (1–2 setninger)</p>
                    <textarea rows={3} className={field("intro") + " resize-none"}
                      placeholder="Frontend-utvikler med lidenskap for rene grensesnitt og gode brukeropplevelser."
                      value={data.intro}
                      onChange={(e) => { set("intro", e.target.value); clearError("intro"); }} />
                    {errors.intro && <p className="mt-1 text-xs text-red-500">{errors.intro}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>Om meg *</label>
                    <p className="mb-2 text-xs text-slate-400">En lengre beskrivelse av din bakgrunn og interesser</p>
                    <textarea rows={5} className={field("about") + " resize-none"}
                      placeholder="Jeg liker å bygge brukervennlige nettsider og er spesielt interessert i frontend og testing…"
                      value={data.about}
                      onChange={(e) => { set("about", e.target.value); clearError("about"); }} />
                    {errors.about && <p className="mt-1 text-xs text-red-500">{errors.about}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>Ferdigheter *</label>
                    <p className="mb-2 text-xs text-slate-400">Skriv en ferdighet og trykk Enter, eller klikk på et forslag</p>
                    <div className={[
                      "flex flex-wrap gap-2 rounded-xl border bg-white px-4 py-3 transition focus-within:ring-4 shadow-sm",
                      errors.skills
                        ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-100"
                        : "border-slate-300 focus-within:border-indigo-500 focus-within:ring-indigo-100",
                    ].join(" ")}>
                      {data.skills.map((s) => (
                        <span key={s} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-indigo-100 text-indigo-700">
                          {s}
                          <button type="button" onClick={() => removeSkill(s)} className="leading-none text-indigo-400 hover:text-indigo-700">×</button>
                        </span>
                      ))}
                      <input
                        className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder-slate-400"
                        placeholder="Legg til ferdighet…"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillKey}
                      />
                    </div>
                    {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s)).map((s) => (
                        <button key={s} type="button" onClick={() => addSkill(s)}
                          className="rounded-full border px-3 py-1 text-xs font-bold transition border-slate-300 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ══ STEP 3 ══ */}
              {step === 3 && (
                <>
                  {/* Experiences */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className={labelCls + " mb-0"}>Arbeidserfaring *</label>
                      <button type="button" onClick={() => addRow("experiences")}
                        className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800">
                        + Legg til rad
                      </button>
                    </div>
                    {errors.experiences && <p className="mb-2 text-xs text-red-500">{errors.experiences}</p>}
                    <div className="space-y-4">
                      {data.experiences.map((row, idx) => (
                        <div key={idx} className="relative space-y-3 rounded-2xl border p-5 border-slate-200 bg-slate-50/50 shadow-sm">
                          {data.experiences.length > 1 && (
                            <button type="button" onClick={() => removeRow("experiences", idx)}
                              className="absolute right-4 top-4 text-lg leading-none text-slate-400 transition hover:text-red-500">×</button>
                          )}
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className={labelCls}>Stilling *</label>
                              <input className={inputCls} placeholder="Frontend-utvikler"
                                value={row.title} onChange={(e) => { setRow("experiences", idx, "title", e.target.value); clearError("experiences"); }} />
                            </div>
                            <div>
                              <label className={labelCls}>Bedrift / Organisasjon</label>
                              <input className={inputCls} placeholder="Acme AS"
                                value={row.org} onChange={(e) => setRow("experiences", idx, "org", e.target.value)} />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>Periode</label>
                            <input className={inputCls} placeholder="jan. 2023 – nå"
                              value={row.period} onChange={(e) => setRow("experiences", idx, "period", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelCls}>Beskrivelse</label>
                            <textarea rows={2} className={inputCls + " resize-none"} placeholder="Hva bidro du med?"
                              value={row.summary} onChange={(e) => setRow("experiences", idx, "summary", e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className={labelCls + " mb-0"}>Utdanning *</label>
                      <button type="button" onClick={() => addRow("education")}
                        className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800">
                        + Legg til rad
                      </button>
                    </div>
                    {errors.education && <p className="mb-2 text-xs text-red-500">{errors.education}</p>}
                    <div className="space-y-4">
                      {data.education.map((row, idx) => (
                        <div key={idx} className="relative space-y-3 rounded-2xl border p-5 border-slate-200 bg-slate-50/50 shadow-sm">
                          {data.education.length > 1 && (
                            <button type="button" onClick={() => removeRow("education", idx)}
                              className="absolute right-4 top-4 text-lg leading-none text-slate-400 transition hover:text-red-500">×</button>
                          )}
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className={labelCls}>Grad / Sertifikat *</label>
                              <input className={inputCls} placeholder="MSc Informatikk"
                                value={row.title} onChange={(e) => { setRow("education", idx, "title", e.target.value); clearError("education"); }} />
                            </div>
                            <div>
                              <label className={labelCls}>Skole / Institusjon</label>
                              <input className={inputCls} placeholder="Østfold Universitetshøgskole"
                                value={row.org} onChange={(e) => setRow("education", idx, "org", e.target.value)} />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>Periode</label>
                            <input className={inputCls} placeholder="2022 – 2025"
                              value={row.period} onChange={(e) => setRow("education", idx, "period", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelCls}>Beskrivelse</label>
                            <textarea rows={2} className={inputCls + " resize-none"} placeholder="Hva studerte du?"
                              value={row.summary} onChange={(e) => setRow("education", idx, "summary", e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t px-8 py-6 border-slate-200 bg-slate-50">
              {step > 1 ? (
                <button type="button" onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-bold shadow-sm transition border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100">
                  ← Tilbake
                </button>
              ) : <span />}

              {step < STEPS.length ? (
                <button type="button" onClick={goNext}
                  className="rounded-full bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                  Fortsett →
                </button>
              ) : (
                <button type="submit"
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-300 transition hover:-translate-y-0.5">
                  {editSlug ? "Lagre endringer" : "🚀 Opprett min portefølje"}
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Steg {step} av {STEPS.length} — {STEPS[step - 1].label}
        </p>
      </div>
    </div>
  );
}
