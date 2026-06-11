import { defineField, defineType } from "sanity";

export const credential = defineType({
  name: "credential",
  title: "Estudio / Experiencia",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Tipo",
      type: "string",
      initialValue: "education",
      options: {
        list: [
          { title: "Formación / Estudios", value: "education" },
          { title: "Experiencia", value: "experience" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Título / Cargo",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "institution",
      title: "Institución / Lugar",
      type: "string",
    }),
    defineField({
      name: "period",
      title: "Período",
      type: "string",
      description: 'Ej: "2018 — 2023"',
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Orden manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "institution", kind: "kind" },
    prepare: ({ title, subtitle, kind }) => ({
      title,
      subtitle: `${kind === "experience" ? "Experiencia" : "Formación"}${
        subtitle ? ` · ${subtitle}` : ""
      }`,
    }),
  },
});