import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Página de inicio",
  type: "document",
  groups: [
    { name: "hero", title: "Portada", default: true },
    { name: "about", title: "Sobre mí" },
    { name: "sections", title: "Títulos de secciones" },
  ],
  fields: [
    // ---- HERO ----
    defineField({
      name: "heroEyebrow",
      title: "Bajada superior",
      type: "string",
      group: "hero",
      description: 'Texto pequeño sobre el título. Ej: "Licenciado en Nutrición".',
    }),
    defineField({
      name: "heroTitle",
      title: "Título principal",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroHighlight",
      title: "Palabra destacada (coral)",
      type: "string",
      group: "hero",
      description: "Parte del título que se resalta en color coral.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtítulo",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroBullets",
      title: "Puntos destacados",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "heroImage",
      title: "Imagen de portada",
      type: "image",
      group: "hero",
      options: { hotspot: true },
    }),
    // ---- ABOUT ----
    defineField({
      name: "aboutTitle",
      title: "Título de la sección",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutHighlight",
      title: "Palabra destacada (coral)",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "Texto",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }] })],
    }),
    defineField({
      name: "aboutImage",
      title: "Foto",
      type: "image",
      group: "about",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutStats",
      title: "Datos / cifras",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", title: "Valor", type: "string" },
            { name: "label", title: "Etiqueta", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    // ---- SECTION TITLES ----
    defineField({
      name: "servicesTitle",
      title: "Servicios — título",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "servicesIntro",
      title: "Servicios — intro",
      type: "text",
      rows: 2,
      group: "sections",
    }),
    defineField({
      name: "experienceTitle",
      title: "Estudios y experiencia — título",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "experienceIntro",
      title: "Estudios y experiencia — intro",
      type: "text",
      rows: 2,
      group: "sections",
    }),
    defineField({
      name: "contactTitle",
      title: "Contacto — título",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactIntro",
      title: "Contacto — intro",
      type: "text",
      rows: 2,
      group: "sections",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Página de inicio" }),
  },
});