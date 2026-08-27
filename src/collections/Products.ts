import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Товар', plural: 'Товары' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'pixelPitch'],
  },
  fields: [
    // Основное
    { name: 'name',        label: 'Название',       type: 'text',     required: true },
    { name: 'slug',        label: 'URL (slug)',      type: 'text',     required: true, unique: true,
      admin: { description: 'Например: fa-series' } },
    { name: 'description', label: 'Описание',        type: 'textarea' },
    { name: 'application', label: 'Применение',      type: 'text' },

    // Связь с категорией
    { name: 'category', label: 'Категория', type: 'relationship',
      relationTo: 'categories', required: true },

    // Фото
    { name: 'image', label: 'Главное фото', type: 'upload', relationTo: 'media' },

    // Характеристики
    { name: 'pixelPitch',  label: 'Шаг пикселя',          type: 'text' },
    { name: 'brightness',  label: 'Яркость',               type: 'text' },
    { name: 'refreshRate', label: 'Частота обновления',    type: 'text' },
    { name: 'ipRating',    label: 'Класс защиты (IP)',     type: 'text' },
    { name: 'cabinetSize', label: 'Размер кабинета',       type: 'text' },
    { name: 'weight',      label: 'Вес',                   type: 'text' },

    // Доп. характеристики (для cPoster и нестандартных)
    {
      name: 'customSpecs',
      label: 'Дополнительные характеристики',
      type: 'array',
      fields: [
        { name: 'label', label: 'Параметр', type: 'text', required: true },
        { name: 'value', label: 'Значение', type: 'text', required: true },
      ],
    },
  ],
}