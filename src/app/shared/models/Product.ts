export enum Category {
    tableLumin = "Luminarias de mesa",
    wallLumin = "Luminarias de pared",
    footLumin = "Luminarias de pie",
    roofLumin = "Luminarias de techo",
    lightBulb = "Bombillo",
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
    finish!: Finish[];
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
    variantName!: string;
    price!: number;
    stock!: number;
    image!: string;
    colorId?: string;
    images!: string[];
    color?: Color;
}

export class CatModel {
    id!: string;
    nombre!: Category
}

export enum Typology{
    simple = "Simple",
    variant = "Variante"
}
