import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatModel } from '../../models/Product';
import { CreateProductDto } from '../../models/create-product-dto';
import { OrderState } from '../../models/Order';
import { CreatePromotionDto } from '../../models/promotions';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  apiUrl: string = 'https://api.katauro.com/';

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'http://localhost:3000/';
  }

  meAdmin() {
    return this.httpClient.get(`${this.apiUrl}auth/me`, { withCredentials: true });
  }

  logAdmin(pass: string) {
    return this.httpClient.post(`${this.apiUrl}auth/admin`, { password: pass }, { withCredentials: true });
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

    return this.httpClient.get(url, { withCredentials: true });
  }

  getProductById(id: string) {
    return this.httpClient.get(`${this.apiUrl}products/${id}`, { withCredentials: true });
  }

  getPages(option?: { categories?: string, search?: string }) {
    var url = option ? `${this.apiUrl}products/pages?` : `${this.apiUrl}products/pages`;

    if (option?.categories) {
      url += option.search ? `category=${option.categories}&` : `category=${option.categories}`;
    }
    if (option?.search) {
      url += `search=${option.search}`;
    }
    return this.httpClient.get(url, { withCredentials: true });
  }

  getCategories() {
    return this.httpClient.get<CatModel[]>(`${this.apiUrl}products/categories`, { withCredentials: true });
  }

  updateProduct(id: string, prod: CreateProductDto) {
    return this.httpClient.patch(`${this.apiUrl}products/${id}`, prod, { withCredentials: true });
  }

  createProduct(product: CreateProductDto) {
    return this.httpClient.post(`${this.apiUrl}products`, product, { withCredentials: true });
  }

  getColors() {
    return this.httpClient.get(`${this.apiUrl}products/colors`, { withCredentials: true });
  }

  createColor(color: { name: string, image: string, public_id?: string }) {
    return this.httpClient.post(`${this.apiUrl}products/colors`, color, { withCredentials: true });
  }

  createFinish(finish: { text: string, image: string, public_id?: string }) {
    return this.httpClient.post(`${this.apiUrl}products/finish`, finish, { withCredentials: true });
  }

  getFinishes() {
    return this.httpClient.get(`${this.apiUrl}products/finish`, { withCredentials: true });
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(`${this.apiUrl}products/${id}`, { withCredentials: true });
  }

  deleteFinish(id: string) {
    return this.httpClient.delete(`${this.apiUrl}products/finish/${id}`, { withCredentials: true });
  }

  deleteColor(id: string) {
    return this.httpClient.delete(`${this.apiUrl}products/colors/${id}`, { withCredentials: true });
  }

  getOrders(option?: { search?: string, state?: string, order?: number }) {
    var finalPath = `${this.apiUrl}order`;
    if (option?.search) {
      finalPath += `?search=${option.search}`;
    }
    if (option?.state) {
      finalPath += !option.search ? `?state=${option.state}` : `&state=${option.state}`;
    }
    if (option?.order) {
      finalPath += !option.search && !option.state ? `?order=${option.order}` : `&order=${option.order}`;
    }
    return this.httpClient.get(finalPath, { withCredentials: true });
  }

  updateOrder(id: string, state: { state: OrderState }) {
    return this.httpClient.patch(`${this.apiUrl}order/${id}`, state, { withCredentials: true });
  }

  getPromotions() {
    return this.httpClient.get(`${this.apiUrl}promotion`, { withCredentials: true });
  }

  getPromotion(id: string) {
    return this.httpClient.get(`${this.apiUrl}promotion/${id}`, { withCredentials: true });
  }

  createPromo(data: CreatePromotionDto) {
    return this.httpClient.post(`${this.apiUrl}promotion`, data, { withCredentials: true });
  }

  deletePromo(id: string) {
    return this.httpClient.delete(`${this.apiUrl}promotion/${id}`, { withCredentials: true });
  }

  updatePromo(id: string, data: CreatePromotionDto) {
    return this.httpClient.patch(`${this.apiUrl}promotion/${id}`, data, { withCredentials: true });
  }

  getCarousels() {
    return this.httpClient.get(`${this.apiUrl}promotion/carousel`, { withCredentials: true });
  }

  updateBanner(data: any, id: number) {
    return this.httpClient.patch(`${this.apiUrl}promotion/banner/${id}`, data, { withCredentials: true });
  }

  getBanner(id: number) {
    return this.httpClient.get(`${this.apiUrl}promotion/banners/${id}`, { withCredentials: true });
  }
}