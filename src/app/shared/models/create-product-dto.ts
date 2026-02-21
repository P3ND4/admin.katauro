import { Typology } from "./Product";

export class CreateProductDto {
    name!: string;
    description!: string;
    subtitle!: string;
    categoryId!: string;
    typology!: Typology
    vector!: string;
    vPublicId?: string;
    finishId!: string[]
    variants!: CreateSpecProductDTO[]
    details!: string[]
}




export class CreateSpecProductDTO {
    price!: number;
    stock!: number;
    colorId!: string
    image!: string
    images!: { link: string, public_id?: string }[]
}