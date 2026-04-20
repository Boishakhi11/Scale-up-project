export type Candidate = {
  name: string;
  title: string;
  image: string;
  slug?: string;
};

export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  summary: string;
};

export type PortfolioSkill = {
  name: string;
  image?: string;
  description: string;
};

export type PortfolioRecord = {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  shortName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  image: string;
  intro: string;
  about: string;
  skills: PortfolioSkill[];
  experiences: ExperienceItem[];
  education: ExperienceItem[];
};

export const navLinks = [
  { label: "Hjem", to: "/" },
  { label: "Om Oss", to: "/about" },
  { label: "Register", to: "/register" },
];

export const baseCandidates: Candidate[] = [
  { name: "Boishakhi", title: "Software Engineer", image: "/Images/image/Mukta.jpeg", slug: "boishakhi" },
  { name: "Varsha", title: "IT Administrasjon", image: "/Images/image/Varsha.jpeg" },
  { name: "Syedha", title: "Data Scientist", image: "/Images/image/Farzana.jpeg" },
  { name: "Saranya", title: "Fullstack Developer", image: "/Images/image/woman.png" },
  { name: "Vinithra", title: "Software Engineer", image: "/Images/image/VIni.jpeg" },
  { name: "Swarupa", title: "Software Developer", image: "/Images/image/woman.png" },
  { name: "Aarcha", title: "PhD, Researcher", image: "/Images/image/archa.jpeg" },
  { name: "Soumya", title: "Data Analyst", image: "/Images/image/smoya.jpeg" },
  { name: "Sumathi", title: "Cloud Service", image: "/Images/image/sumoti.jpeg" },
  { name: "Divya", title: "Financial Analyst", image: "/Images/image/sowmya.jpeg" },
  { name: "Liya", title: "Financial Analyst", image: "/Images/image/liya.jpeg" },
  { name: "Riya", title: "Financial Analyst", image: "/Images/image/woman.png" },
];

export const staticPortfolios: PortfolioRecord[] = [
  {
    slug: "boishakhi",
    firstName: "Boishakhi",
    lastName: "Ghosh",
    fullName: "Boishakhi Ghosh",
    shortName: "Boishakhi",
    title: "Front-End Developer",
    email: "bgmukta11@gmail.com",
    phone: "+47 000 00 000",
    location: "Dhaka, Bangladesh",
    birthDate: "15 April 1996",
    image: "/Images/image/bsk.jpeg",
    intro:
      "Front-End Developer med bakgrunn i testing, moderne frontend og kontinuerlig laering. Trives i team som bygger kvalitet, gode opplevelser og positiv effekt.",
    about:
      "Jeg liker a bygge brukervennlige nettsider og er spesielt interessert i frontend og testing. Akkurat na jobber jeg med flere prosjekter og utvikler meg videre i moderne webteknologi.",
    skills: [
      {
        name: "Vanilla JavaScript",
        image: "/Images/image/icons/js.png",
        description: "Prosjekterfaring med interaktive grensesnitt og solid grunnforstaelse for frontend.",
      },
      {
        name: "Node.js",
        image: "/Images/image/icons/nodejs.png",
        description: "Komfortabel med grunnleggende backend og samspill mellom frontend og tjenester.",
      },
      {
        name: "React",
        image: "/Images/image/icons/react.png",
        description: "Bygger moderne komponentbaserte losninger og jobber aktivt videre med rammeverket.",
      },
      {
        name: "MongoDB",
        image: "/Images/image/icons/mongo.png",
        description: "Utforsker databaser i moderne webstakker sammen med SQL- og PostgreSQL-erfaring.",
      },
    ],
    experiences: [
      {
        title: "Front-End Developer",
        org: "Inno-Scribe",
        period: "Nov 2025 - Present",
        summary: "Jobber med frontend, AI-stottede arbeidsflyter, Tailwind CSS og automasjon.",
      },
      {
        title: "Technical Support",
        org: "Media Mondays Oslo",
        period: "Jun 2024 - Jun 2025",
        summary: "Bidro med teknisk stotte, rapportering, markedsundersokelser og arrangementsgjennomforing.",
      },
      {
        title: "Software Tester",
        org: "Data Soft System LTD",
        period: "Jun 2019 - Jul 2019",
        summary: "Skrev testtilfeller og jobbet med manuell testing, funksjonell testing og integrasjonstesting.",
      },
    ],
    education: [
      {
        title: "MSc in Computer Science",
        org: "Ostfold University",
        period: "Sep 2022 - Jun 2025",
        summary: "Fordypning i interaction design og informasjonssikkerhet.",
      },
      {
        title: "BSc in Computer Science",
        org: "IUBAT",
        period: "Jan 2016 - Dec 2019",
        summary: "Studerte blant annet datastrukturer, algoritmer, Java, C#, C, C++ og databaser.",
      },
      {
        title: "Microsoft Learner",
        org: "INNO-SCI",
        period: "Jun 2023 - Aug 2023",
        summary: "Fullforte sertifiseringer innen Azure Fundamentals og Security Compliance.",
      },
    ],
  },
];

export const teamMembers = [
  {
    name: "Rusha",
    title: "Grunder og leder",
    image: "https://www.nettverkshuset.no/wp-content/uploads/2025/04/rushapic.jpg",
    description:
      "Rusha er grunder og leder av Nettverkshuset, hvor hun jobber med a skape et inkluderende og stottende fellesskap for alle.",
  },
  {
    name: "Trine",
    title: "Kurslaerer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFl5aolx3ASmA/profile-displayphoto-crop_800_800/B4DZnudh1JIEAI-/0/1760642343653?e=1764806400&v=beta&t=Uc9QGOnluDCiJ4nA--2cYDnxthNVgMhyjVHSfdtNuSU",
    description:
      "Trine er kursholder hos Nettverkshuset og underviser i motiverende kommunikasjon, coaching og helseadferd.",
  },
  {
    name: "Sangitaa",
    title: "Digital ekspert",
    image: "https://www.nettverkshuset.no/wp-content/uploads/2025/06/sangitaanew.png",
    description:
      "Sangitaa bidrar med webutvikling og digital markedsforing, og gjor digitale ideer om til brukervennlige losninger.",
  },
  {
    name: "Trisha",
    title: "Prosjektkoordinator",
    image: "https://www.nettverkshuset.no/wp-content/uploads/2025/05/trisha.png",
    description:
      "Trisha bidrar med struktur, planlegging og koordinering for a skape aktivitet, utvikling og fellesskap.",
  },
];
