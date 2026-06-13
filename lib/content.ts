import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

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
    brandName: "Nicolás López Asis",
    role: "Licenciado en Nutrición · M.N. 0000",
    logoWord: "Nutrición",
    phone: "5493815370052",
    email: "nicolasis14@hotmail.com",
    address: "Laprida 763, San Miguel de Tucumán",
    whatsapp: "5493815370052",
    instagramUrl: "https://www.instagram.com/lic.nicolopezasis/",
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

// ---- Blog ----

export type PostListItem = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: SanityImageSource | null;
  tags: string[];
  publishedAt: string;
};

export type Post = PostListItem & {
  body: PortableTextBlock[];
};

let blockKey = 0;
/** Minimal helper to build Portable Text blocks for the fallback posts. */
function block(
  text: string,
  style: "normal" | "h2" | "h3" | "blockquote" = "normal",
): PortableTextBlock {
  blockKey += 1;
  return {
    _type: "block",
    _key: `fb-${blockKey}`,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `fb-${blockKey}-0`, text, marks: [] }],
  };
}

export const fallbackPosts: Post[] = [
  {
    title: "Nutrir el cerebro: el rol de la alimentación en la salud mental",
    slug: "nutrir-el-cerebro",
    excerpt:
      "Qué comemos influye en cómo pensamos y sentimos. Te cuento cómo cuidar un órgano vital a través del plato.",
    coverImage: null,
    tags: ["Salud", "Cerebro"],
    publishedAt: "2026-05-20T10:00:00.000Z",
    body: [
      block("Por qué la comida también alimenta la mente", "h2"),
      block(
        "El cerebro consume cerca del 20% de la energía que ingerimos cada día. Lo que ponemos en el plato impacta directamente en nuestra concentración, memoria y estado de ánimo.",
      ),
      block(
        "Una alimentación rica en vegetales, frutas, grasas saludables y omega-3 ayuda a preservar un órgano vital y a prevenir o disminuir el riesgo de enfermedades neurodegenerativas.",
      ),
      block("Pequeños cambios, grandes resultados", "h3"),
      block(
        "No se trata de dietas perfectas, sino de hábitos sostenibles: sumar color al plato, hidratarse bien y priorizar alimentos reales por sobre los ultraprocesados.",
      ),
    ],
  },
  {
    title: "5 mitos sobre las dietas que conviene dejar atrás",
    slug: "mitos-sobre-dietas",
    excerpt:
      "Saltar comidas, demonizar los carbohidratos, los 'detox'… Repasamos creencias frecuentes que no se sostienen con evidencia.",
    coverImage: null,
    tags: ["Mitos", "Educación alimentaria"],
    publishedAt: "2026-04-08T10:00:00.000Z",
    body: [
      block(
        "Alrededor de la comida circulan muchas ideas que parecen verdades absolutas pero que la ciencia no respalda. Repasemos algunas.",
      ),
      block("1. Saltar comidas adelgaza", "h3"),
      block(
        "Comer menos veces no garantiza bajar de peso y suele aumentar el hambre, llevando a peores elecciones más tarde.",
      ),
      block("2. Los carbohidratos engordan", "h3"),
      block(
        "Los carbohidratos de calidad —legumbres, granos integrales, frutas— son parte de una alimentación equilibrada.",
      ),
    ],
  },
  {
    title: "Cómo armar un plato saludable en 3 pasos",
    slug: "plato-saludable-en-3-pasos",
    excerpt:
      "Una guía simple para componer comidas equilibradas sin pesar todo ni complicarte la vida.",
    coverImage: null,
    tags: ["Práctico", "Planificación"],
    publishedAt: "2026-03-02T10:00:00.000Z",
    body: [
      block(
        "El método del plato es una herramienta visual para equilibrar tus comidas sin cuentas complicadas.",
      ),
      block("La mitad del plato: vegetales", "h3"),
      block("Cuanto más color y variedad, mejor. Aportan fibra, vitaminas y saciedad."),
      block("Un cuarto: proteínas", "h3"),
      block("Carnes magras, huevo, legumbres o pescado para mantener y reparar tejidos."),
      block("Un cuarto: carbohidratos de calidad", "h3"),
      block("Preferí versiones integrales y porciones acordes a tu actividad."),
    ],
  },
];