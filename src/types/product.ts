export type PayloadProduct = {
  id: string
  slug: string
  name: string
  pixelPitch: string
  brightness: string
  refreshRate: string
  ipRating: string
  cabinetSize: string
  weight: string
  application: string
  description: string
  category: { slug: string } | string
}