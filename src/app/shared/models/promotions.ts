import { CatModel, Variant } from "./Product"

export class Promotion {
  promo_id!: string
  startDate!: Date
  endDate!: Date
  name!: string
  discountType!: string
  Type!: string
  discount!: number
  categories!: {
    promoId: string,
    categoryId: string,
    category: CatModel

  }[]
  products!: {
    productId: string
    promotionId: string
    product: Variant
  }[]
}


export class Banner {
  id!: number
  name!: string
  description!: string
  prodId!: string
  product!: Variant
  image!: string
  publicId?: string
  carouselId!: number
  carousel!: Carousel

}

export class Carousel {
  id!: number
  name!: string
  banners!: Banner[]
}

export enum PromoType {
  prodCat = 'Por producto y categoría',
  general = 'General'
}

export interface CreatePromotionDto {
  startDate: Date
  endDate: Date
  name: string
  discountType: string
  Type: string
  categories: string[]
  products: string[]
  discount: number
}

export interface CreateBannerDto {
  id?: number
  name: string
  description: string
  prodId: string
  image: string
  publicId?: string
  carouselId: number
}