import type { SanityImageSource } from "@sanity/image-url";

// ---- Types shared across the site ----

export type ServiceIcon =
  | "leaf"
  | "apple"
  | "activity"
  | "heart"
  | "brain"
  | "stethoscope"
  | "scale"
  | "calendar"
  | "utensils"
  | "sparkles";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
};

export type Credential = {
  kind: "education" | "experience";
  title: string;
  institution?: string;
  period?: string;
  description?: string;
};

export type Stat = { value: string; label: string };

export type SiteSettings = {
  brandName: string;
  role: string;
  logoWord: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  instagramUrl: string;
  bookingUrl: string;
};

export type HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroBullets: string[];
  heroImage: SanityImageSource | null;
  aboutTitle: string;
  aboutHighlight: string;
  aboutBody: string[];
  aboutImage: SanityImageSource | null;
  aboutStats: Stat[];
  servicesTitle: string;
  servicesIntro: string;
  experienceTitle: string;
  experienceIntro: string;
  contactTitle: string;
  contactIntro: string;
};

export type SiteContent = {
  settings: SiteSettings;
  home: HomeContent;
  services: Service[];
  credentials: Credential[];
};

// ---- Fallback content (used until Sanity is connected) ----
// Editable example copy in Spanish, matching the "Nutrir el cerebro" brand.

export const fallbackContent: SiteContent = {
  settings: {
    brandName: "Nicolás López Asís",
    role: "Licenciado en Nutrición · M.N. 0000",
    logoWord: "Nutrición",
    phone: "+54 9 11 0000-0000",
    email: "hola@nicolaslopezasis.com",
    address: "Av. Siempreviva 742, Buenos Aires",
    whatsapp: "5491100000000",
    instagramUrl: "https://instagram.com/",
    bookingUrl: "",
  },
  home: {
    heroEyebrow: "Licenciado en Nutrición",
    heroTitle: "Nutrir el cuerpo y la mente,",
    heroHighlight: "un acto fundamental",
    heroSubtitle:
      "Acompaño a cada persona a construir una relación sana con la comida, con planes personalizados y basados en evidencia. Pequeños cambios sostenibles, grandes resultados.",
    heroBullets: [
      "Planes 100% personalizados",
      "Seguimiento cercano y continuo",
      "Basado en evidencia científica",
    ],
    heroImage: null,
    aboutTitle: "Sobre",
    aboutHighlight: "mí",
    aboutBody: [
      "Soy Nicolás López Asis, Licenciado en Nutrición. Hace más de una década acompaño a personas a transformar sus hábitos alimentarios para que se sientan mejor, con más energía y en equilibrio con su cuerpo.",
      "Mi enfoque no se trata de dietas restrictivas ni soluciones mágicas, sino de educación alimentaria, escucha y planes realistas que se adaptan a la vida de cada paciente.",
      "Creo en una nutrición amable, flexible y sostenible en el tiempo: ese es el camino para cuidar la salud de verdad.",
    ],
    aboutImage: null,
    aboutStats: [
      { value: "+10", label: "años de experiencia" },
      { value: "+1.500", label: "pacientes acompañados" },
      { value: "100%", label: "planes personalizados" },
    ],
    servicesTitle: "Cómo puedo",
    servicesIntro:
      "Cada consulta se diseña a tu medida. Estas son las áreas en las que puedo acompañarte:",
    experienceTitle: "Formación y",
    experienceIntro:
      "Una trayectoria construida sobre la actualización constante y el trabajo clínico.",
    contactTitle: "Empecemos",
    contactIntro:
      "Reservá tu primera consulta o escribime para resolver cualquier duda. Estoy para ayudarte.",
  },
  services: [
    {
      title: "Nutrición clínica",
      description:
        "Tratamiento nutricional de patologías como diabetes, colesterol, hipertensión y trastornos digestivos.",
      icon: "stethoscope",
    },
    {
      title: "Descenso de peso saludable",
      description:
        "Planes flexibles y sostenibles para alcanzar tu peso ideal sin pasar hambre ni efecto rebote.",
      icon: "scale",
    },
    {
      title: "Nutrición deportiva",
      description:
        "Optimizá tu rendimiento y recuperación con una alimentación adaptada a tu entrenamiento.",
      icon: "activity",
    },
    {
      title: "Alimentación basada en plantas",
      description:
        "Acompañamiento para transiciones vegetarianas y veganas equilibradas y bien planificadas.",
      icon: "leaf",
    },
    {
      title: "Educación alimentaria",
      description:
        "Aprendé a comer mejor en tu día a día con herramientas prácticas y sin culpa.",
      icon: "apple",
    },
    {
      title: "Seguimiento continuo",
      description:
        "Controles periódicos y ajustes constantes para sostener tus logros en el tiempo.",
      icon: "calendar",
    },
  ],
  credentials: [
    {
      kind: "education",
      title: "Licenciatura en Nutrición",
      institution: "Universidad de Buenos Aires",
      period: "2010 — 2015",
      description: "Formación de grado con orientación clínica.",
    },
    {
      kind: "education",
      title: "Posgrado en Nutrición Deportiva",
      institution: "ISDe Sports Science Institute",
      period: "2017",
      description: "Especialización en rendimiento y composición corporal.",
    },
    {
      kind: "education",
      title: "Diplomatura en Diabetes",
      institution: "Sociedad Argentina de Diabetes",
      period: "2019",
    },
    {
      kind: "experience",
      title: "Nutricionista de planta",
      institution: "Hospital Central",
      period: "2016 — 2021",
      description: "Atención de pacientes ambulatorios e internados.",
    },
    {
      kind: "experience",
      title: "Consultorio privado",
      institution: "Práctica independiente",
      period: "2018 — actualidad",
      description: "Consultas presenciales y online a pacientes de todo el país.",
    },
    {
      kind: "experience",
      title: "Asesor nutricional",
      institution: "Clubes y equipos deportivos",
      period: "2020 — actualidad",
    },
  ],
};