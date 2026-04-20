import { baseCandidates, staticPortfolios, type Candidate, type ExperienceItem, type PortfolioRecord, type PortfolioSkill } from "../data/site";

const STORAGE_KEY = "digital-portfolios";
const DELETED_KEY = "deleted-portfolios";
const STORAGE_EVENT = "portfolio-store-updated";
const fallbackImage = "/Images/image/woman.png";

export type PortfolioFormValues = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  image: string;
  linkedin?: string;
  github?: string;
  intro: string;
  about: string;
  skillsText: string;
  experienceText: string;
  educationText: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseList(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSkills(text: string): PortfolioSkill[] {
  return parseList(text).map((line) => ({
    name: line,
    description: "Kompetanse lagt inn gjennom registreringsskjemaet.",
  }));
}

function parseResumeEntries(text: string): ExperienceItem[] {
  return parseList(text).map((line) => {
    const [title = "", org = "", period = "", ...summaryParts] = line.split("|").map((part) => part.trim());

    return {
      title: title || "Rolle",
      org: org || "Organisasjon",
      period: period || "Periode",
      summary: summaryParts.join(" | ") || "Beskrivelse kommer snart.",
    };
  });
}

export function readSavedPortfolios(): PortfolioRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as PortfolioRecord[];
  } catch {
    return [];
  }
}

function writeSavedPortfolios(portfolios: PortfolioRecord[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function getDeletedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(DELETED_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function deletePortfolio(slug: string) {
  const deleted = getDeletedSlugs();
  if (!deleted.includes(slug)) {
    window.localStorage.setItem(DELETED_KEY, JSON.stringify([...deleted, slug]));
  }
  
  const saved = readSavedPortfolios().filter(p => p.slug !== slug);
  writeSavedPortfolios(saved);
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function getAllPortfolios() {
  const deleted = getDeletedSlugs();
  return [...staticPortfolios, ...readSavedPortfolios()].filter(p => !deleted.includes(p.slug));
}

export function getPortfolioBySlug(slug: string) {
  return getAllPortfolios().find((portfolio) => portfolio.slug === slug);
}

export function getCandidateCards(): Candidate[] {
  const deleted = getDeletedSlugs();
  
  const savedCandidates = readSavedPortfolios()
    .filter(p => !deleted.includes(p.slug))
    .map((portfolio) => ({
      name: portfolio.shortName,
      title: portfolio.title,
      image: portfolio.image || fallbackImage,
      slug: portfolio.slug,
    }));

  const activeBase = baseCandidates.filter(c => !c.slug || !deleted.includes(c.slug));

  return [...savedCandidates, ...activeBase];
}

export function createPortfolio(values: PortfolioFormValues, existingSlug?: string): PortfolioRecord {
  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const shortName = firstName || fullName;

  const nextPortfolio: PortfolioRecord = {
    slug: existingSlug || slugify(fullName || values.email) || `portfolio-${Date.now()}`,
    firstName,
    lastName,
    fullName: fullName || values.email,
    shortName: shortName || "Kandidat",
    title: values.title.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    location: values.location.trim(),
    birthDate: values.birthDate.trim(),
    image: values.image.trim() || fallbackImage,
    linkedin: values.linkedin?.trim(),
    github: values.github?.trim(),
    intro: values.intro.trim(),
    about: values.about.trim(),
    skills: parseSkills(values.skillsText),
    experiences: parseResumeEntries(values.experienceText),
    education: parseResumeEntries(values.educationText),
  };

  const saved = readSavedPortfolios().filter((portfolio) => portfolio.slug !== nextPortfolio.slug);
  writeSavedPortfolios([nextPortfolio, ...saved]);

  return nextPortfolio;
}

export function subscribeToPortfolioUpdates(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handler = () => callback();
  window.addEventListener(STORAGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(STORAGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
