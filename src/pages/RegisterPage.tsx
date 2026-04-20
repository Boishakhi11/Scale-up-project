import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortfolio, type PortfolioFormValues } from "../lib/portfolioStore";

type FormState = PortfolioFormValues;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  birthDate: "",
  image: "",
  intro: "",
  about: "",
  skillsText: "",
  experienceText: "",
  educationText: "",
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as keyof FormState;

    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const portfolio = createPortfolio(formState);
    setFormState(initialState);
    event.currentTarget.reset();
    navigate(`/portfolio/${portfolio.slug}`);
  };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-[960px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur">
        <div className="bg-[linear-gradient(135deg,#eef2ff_0%,#dbeafe_100%)] px-8 py-10 text-center">
          <span className="inline-flex rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            Create a Digital Portfolio
          </span>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">Registreringsskjema for Digital Portefolje</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-700">
            Fyll inn informasjonen under for a opprette en digital portefolje som automatisk blir synlig i portfolio-listen.
          </p>
        </div>

        <form className="grid gap-6 p-8 sm:p-10" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">First name</span>
              <input
                required
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Last name</span>
              <input
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Professional title</span>
              <input
                required
                name="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Profile image URL</span>
              <input
                name="image"
                value={formState.image}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                required
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Phone number</span>
              <input
                required
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Location</span>
              <input
                required
                name="location"
                value={formState.location}
                onChange={handleChange}
                placeholder="Oslo, Norway"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Date of birth</span>
              <input
                name="birthDate"
                value={formState.birthDate}
                onChange={handleChange}
                placeholder="15 April 1996"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Intro text</span>
            <textarea
              required
              name="intro"
              value={formState.intro}
              onChange={handleChange}
              rows={4}
              placeholder="Kort introduksjon som vises pa toppen av portfolio-siden."
              className="rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">About me</span>
            <textarea
              required
              name="about"
              value={formState.about}
              onChange={handleChange}
              rows={5}
              placeholder="Beskriv erfaring, motivasjon og hva du liker a jobbe med."
              className="rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Skills</span>
            <textarea
              required
              name="skillsText"
              value={formState.skillsText}
              onChange={handleChange}
              rows={5}
              placeholder={"One skill per line\nReact\nTypeScript\nTailwind CSS"}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Experience</span>
            <textarea
              required
              name="experienceText"
              value={formState.experienceText}
              onChange={handleChange}
              rows={6}
              placeholder={"One item per line using: Title | Organisation | Period | Summary\nFrontend Developer | Company | 2024 - Present | Built user interfaces"}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Education</span>
            <textarea
              required
              name="educationText"
              value={formState.educationText}
              onChange={handleChange}
              rows={6}
              placeholder={"One item per line using: Degree | School | Period | Summary\nMSc Computer Science | University | 2022 - 2025 | Interaction design"}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <div className="flex items-center justify-center pt-2">
            <button className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700">
              Create portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
