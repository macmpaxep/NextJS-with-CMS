import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Файл', plural: 'Медиафайлы' },
  upload: {
    staticDir: 'public/media',
    staticURL: '/media',
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', label: 'Описание (alt)', type: 'text' },
  ],
}