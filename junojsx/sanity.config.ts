import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {theme} from './theme'

export default defineConfig({
  name: 'default',
  title: 'junojsx',

  projectId: 'n5l953ie',
  dataset: 'production',

  theme,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
