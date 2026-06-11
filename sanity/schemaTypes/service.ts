import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      initialValue: "leaf",
      options: {
        list: [
          { title: "Hoja", value: "leaf" },
          { title: "Manzana", value: "apple" },
          { title: "Actividad / deporte", value: "activity" },
          { title: "Corazón", value: "heart" },
          { title: "Cerebro", value: "brain" },
          { title: "Estetoscopio", value: "stethoscope" },
          { title: "Balanza", value: "scale" },
          { title: "Calendario", value: "calendar" },
          { title: "Utensilios", value: "utensils" },
          { title: "Chispa / objetivos", value: "sparkles" },
        ],
      },
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
    select: { title: "title", subtitle: "icon" },
  },
});
