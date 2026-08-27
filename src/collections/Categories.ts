import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Категория', plural: 'Категории' },
  admin: { useAsTitle: 'label' },
  fields: [
    { name: 'label', label: 'Название в меню', type: 'text', required: true },
    { name: 'slug',  label: 'URL-slug',        type: 'text', required: true, unique: true,
      admin: { description: 'outdoor, indoor, rental, cob, floor, poster, sports, transparent, creative' } },
    { name: 'title', label: 'Заголовок страницы', type: 'text' },
    { name: 'intro', label: 'Описание',            type: 'textarea' },
    { name: 'order', label: 'Порядок в меню',      type: 'number', defaultValue: 99 },
  ],
}