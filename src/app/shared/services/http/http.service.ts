
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CatModel } from '../../models/Product';
import { CreateProductDto } from '../../models/create-product-dto';
import { OrderState } from '../../models/Order';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  apiUrl: string = 'https://api.katauro.com/';

  constructor(private httpClient: HttpClient) {
    //this.apiUrl = 'http://localhost:3000/';
  }
  getProducts(option?: { page?: number, categories?: string, search?: string }) {
    var url = this.apiUrl + 'products' + (option ? '?' : '');

    if (option?.categories) {
      url += option.search || option.page ? `category=${option.categories}&` : `category=${option.categories}`;
    }
    if (option?.search) {
      url += option.page ? `search=${option.search}&` : `search=${option.search}`;
    }
    if (option?.page) {
      url += `page=${option.page}`;
    }

    return this.httpClient.get(url);
  }

  getProductById(id: string) {
    return this.httpClient.get(`${this.apiUrl}products/${id}`)
  }

  getPages(option?: { categories?: string, search?: string }) {
    var url = option ? `${this.apiUrl}products/pages?` : `${this.apiUrl}products/pages`;

    if (option?.categories) {
      url += option.search ? `category=${option.categories}&` : `category=${option.categories}`;
    }
    if (option?.search) {
      url += `search=${option.search}`;
    }
    return this.httpClient.get(url);
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

  getOrders(option?: { search?: string, state?: string, order?: number }) {
    var finalPath = `${this.apiUrl}order`
    if (option?.search) {
      finalPath += `?search=${option.search}`
    }
    if (option?.state) {
      finalPath += !option.search ? `?state=${option.state}` : `&state=${option.state}`
    }
    if (option?.order) {
      finalPath += !option.search && !option.state ? `?order=${option.order}` : `&order=${option.order}`
    }
    return this.httpClient.get(finalPath);
  }
  updateOrder(id: string, state: { state: OrderState }) {
    return this.httpClient.patch(`${this.apiUrl}order/${id}`, state);
  }

}