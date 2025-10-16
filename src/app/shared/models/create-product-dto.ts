import { Typology } from "./Product";

export class CreateProductDto {
    name!: string;
    description!: string;
    subtitle!: string;
    categoryId!: string;
    vector!: string;
    typology!: Typology
    variants!: CreateSpecProductDTO[]
    details!: string[]
}

export class CreateSpecProductDTO {
    price!: number;
    stock!: number;
    colorId!: string
}