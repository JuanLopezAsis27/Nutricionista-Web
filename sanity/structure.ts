import type { StructureResolver } from "sanity/structure";

// Present `siteSettings` and `homePage` as single editable documents
// (singletons), and the rest as normal lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Configuración del sitio")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Página de inicio")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
      S.documentTypeListItem("service").title("Servicios"),
      S.documentTypeListItem("credential").title("Estudios y experiencia"),
    ]);