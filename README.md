# Lic. Nicolás López Asís — Web de presentación

Landing page profesional para el Licenciado en Nutrición Nicolás López Asís.
Construida con **Next.js 16 + Tailwind CSS v4** y **Sanity CMS** para que el
contenido pueda editarse desde un panel visual, sin tocar código.

## Stack

- **Next.js 16** (App Router, React 19) — SSR/SSG y SEO.
- **Tailwind CSS v4** — sistema de diseño (paleta coral + canvas, tipografías
  Poppins/Inter) definido en [`app/globals.css`](app/globals.css).
- **Sanity CMS** — Studio embebido en `/studio`.
- **Motion** — animaciones de entrada (scroll reveal).
- **lucide-react** — íconos.

## Puesta en marcha

```bash
npm install
npm run dev
```

La web queda en `http://localhost:3000` y el panel de contenido en
`http://localhost:3000/studio`.

> **Sin configurar Sanity, el sitio ya funciona**: muestra el contenido de
> ejemplo definido en [`lib/content.ts`](lib/content.ts). Eso permite ver y
> ajustar el diseño antes de conectar el CMS.

## Conectar Sanity (contenido editable)

1. Creá un proyecto gratis en <https://www.sanity.io/manage> y copiá el
   **Project ID**.
2. Completá [`.env.local`](.env.local):

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
   ```

3. Reiniciá `npm run dev`, entrá a `/studio`, iniciá sesión y cargá:
   - **Configuración del sitio**: contacto, WhatsApp, redes, turnos.
   - **Página de inicio**: portada, "Sobre mí", títulos de secciones, fotos.
   - **Servicios** y **Estudios y experiencia**: ítems individuales.

   Cada campo que dejes vacío usa automáticamente el texto de ejemplo, así que
   podés cargar contenido de a poco.

## Estructura

```
app/
  layout.tsx              Tipografías + metadata/SEO
  page.tsx                Arma la landing (Server Component, lee el contenido)
  studio/[[...tool]]/     Sanity Studio embebido
components/
  navbar.tsx · footer.tsx · whatsapp-fab.tsx
  sections/               hero · about · services · experience · contact
  ui/                     decorations · reveal · section-heading · íconos
lib/
  content.ts              Tipos + contenido de ejemplo (fallback)
  queries.ts              GROQ + merge Sanity ↔ fallback
  links.ts · cn.ts        Helpers (WhatsApp, tel, mail, classnames)
sanity/
  env.ts · lib/ · schemaTypes/ · structure.ts
sanity.config.ts          Configuración del Studio
```

## Secciones

1. **Hero** — presentación, propuesta de valor y CTA a turno.
2. **Sobre mí** — biografía, enfoque profesional y cifras.
3. **Servicios** — grilla de áreas de atención.
4. **Estudios y experiencia** — líneas de tiempo de formación y trayectoria.
5. **Contacto** — datos, horarios y formulario que abre WhatsApp con el mensaje.

## Build de producción

```bash
npm run build
npm start
```

## Próximos pasos sugeridos

- Subir foto profesional y la imagen de portada en el Studio.
- Cargar matrícula real, datos de contacto y links de redes/turnos.
- Fase 2: blog (tipo `post` en Sanity + rutas `/blog`).