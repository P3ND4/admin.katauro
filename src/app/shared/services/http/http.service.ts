
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CatModel } from '../../models/Product';
import { CreateProductDto } from '../../models/create-product-dto';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  apiUrl: string = 'https://api.katauro.com/';

  constructor(private httpClient: HttpClient) {
    // this.apiUrl = 'http://localhost:3000/';
  }
  getProducts(options?: { page?: number, category?: string }) {
    if (options?.page && !options.category) {
      return this.httpClient.get(`${this.apiUrl}products?page=${options.page}`);
    }
    else if (options?.category) {
      return options.page ? this.httpClient.get(`${this.apiUrl}products?page=${options.page}&category=${options.category}`) : this.httpClient.get(`${this.apiUrl}products?category=${options.category}`)
    }
    return this.httpClient.get(`${this.apiUrl}products`)
  }

  getProductById(id: string) {
    return this.httpClient.get(`${this.apiUrl}products/${id}`)
  }

  getPages(option?: { category?: Category }) {
    return !option?.category ? this.httpClient.get(`${this.apiUrl}products/pages`) : this.httpClient.get(`${this.apiUrl}products/pages?category=${option.category}`)
  }
  getCategories() {
    return this.httpClient.get<CatModel[]>(`${this.apiUrl}products/categories`);
  }

  updateProduct(id: string, prod: CreateProductDto) {
    return this.httpClient.patch(`${this.apiUrl}products/${id}`, prod);
  }

  createProduct(product: CreateProductDto) {
    return this.httpClient.post(`${this.apiUrl}products`, product);
  }

  getColors() {
    return this.httpClient.get(`${this.apiUrl}products/colors`);
  }
  createColor(color: { name: string, image: string }) {
    return this.httpClient.post(`${this.apiUrl}products/colors`, color);
  }

  createFinish(finish: { text: string, image: string }) {
    return this.httpClient.post(`${this.apiUrl}products/finish`, finish);
  }

  getFinishes() {
    return this.httpClient.get(`${this.apiUrl}products/finish`);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(`${this.apiUrl}products/${id}`);
  }

  deleteFinish(id: string) {
    return this.httpClient.delete(`${this.apiUrl}products/finish/${id}`);
  }

  deleteColor(id: string) {
    return this.httpClient.delete(`${this.apiUrl}products/colors/${id}`);
  }

  getOrders() {
    return this.httpClient.get(`${this.apiUrl}order`);
  }

}
