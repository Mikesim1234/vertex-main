import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"

import { schemaTypes } from "./sanity/schema"

export default defineConfig({
  name: "vertex-global",
  title: "Vertex Global CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})
