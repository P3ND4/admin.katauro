import { Order } from "./Order";

export class User {
    id!: string;
    email!: string;
    name!: string;
    lastName!: string;
    password!: string;
    image!: string;
    phone!: number;
    orders!: Order;
}