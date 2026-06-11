import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { service } from "./service";
import { credential } from "./credential";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homePage, service, credential, post],
};
