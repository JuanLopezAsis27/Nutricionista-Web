import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  groups: [
    { name: "brand", title: "Marca", default: true },
    { name: "contact", title: "Contacto" },
    { name: "social", title: "Redes y turnos" },
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Nombre / marca",
      type: "string",
      group: "brand",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Título profesional",
      type: "string",
      group: "brand",
      description: 'Ej: "Licenciado en Nutrición — M.N. 0000"',
    }),
    defineField({
      name: "logoWord",
      title: "Palabra destacada del logo",
      type: "string",
      group: "brand",
      description: 'Parte del nombre que se muestra en color coral. Ej: "CEREBRO".',
    }),
    defineField({
      name: "phone",
      title: "Teléfono",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Dirección del consultorio",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp (número con código de país)",
      type: "string",
      group: "social",
      description: "Solo números, ej: 5491122334455",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram (URL)",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "bookingUrl",
      title: "Link para agendar turnos",
      type: "url",
      group: "social",
    }),
  ],
  preview: {
    select: { title: "brandName", subtitle: "role" },
  },
});