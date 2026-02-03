import { Promotion } from "./promotions";

export enum Category {
  tableLumin = "Luminarias de mesa",
  wallLumin = "Luminarias de pared",
  footLumin = "Luminarias de pie",
  roofLumin = "Luminarias de techo",
  lightBulb = "Accesorios",
  other = "Otras"
}

export class Product {
  id!: string;
  name!: string;
  description!: string;
  subtitle!: string;
  vector?: string;
  category!: CatModel;
  typology!: Typology;
  details!: detail[];
  variants!: Variant[];
  finish!: { finishId: string, productId: string }[];
}


export class Finish {
  id!: string
  image!: string
  text!: string
}
export class detail {
  id!: string
  idProd!: string
  text!: string
}

export class Color {
  id!: string;
  name!: string;
  image?: string;
}

export class Variant {
  id!: string;
  colorId!: string;
  price!: number;
  stock!: number;
  image?: string;
  images!: { link: string, id: string }[]
  color!: Color
  genericId!: string;
  genericProd?: Product;
  promotions!: {
    productId: string
    promotionId: string
    promotion: Promotion
  }[]
}

export class CatModel {
  id!: string;
  nombre!: Category
}

export enum Typology {
  simple = "Simple",
  variant = "Variante"
}
