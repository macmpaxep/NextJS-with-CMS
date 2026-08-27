import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Media } from './src/collections/Media'
import { Products } from './src/collections/Products'
import { Categories } from './src/collections/Categories'
import { ru } from '@payloadcms/translations/languages/ru'

console.log('DB URI:', process.env.DATABASE_URI)
console.log('SECRET:', process.env.PAYLOAD_SECRET)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Products, Categories],
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
i18n: {
    supportedLanguages: { ru },
    fallbackLanguage: 'ru', // Делает русский языком по умолчанию для всех пользователей
  },
})