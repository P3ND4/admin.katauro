import { Variant } from "./Product";
import { User } from "./User";

export class Order {
    id!: string;
    userId!: string;
    delivery!: boolean;
    state!: string;
    totalPrice!: number;
    createdAt!: Date;
    address!: string;
    province!: string;
    city!: string;
    note!: string;
    user!: User;
    name!: string;
    lastName!: string;
    email!: string;
    phone!: string;
    products!: ProductForOrder[];
}

export class ProductForOrder {
    orderId!: string;
    productId!: string;
    count!: number;
    //order     Order           @relation(fields: [orderId], references: [id], "OrderProducts", onDelete: Cascade)
    product!: Variant;

}

export enum OrderState {
    pending = 'Pendiente',
    completed = "Realizado",
    canceled = "Cancelado"
}