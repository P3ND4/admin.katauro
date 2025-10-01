
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  apiUrl: string = 'https://api.katauro.com/';

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'http://localhost:3000/';
  }
  getProducts(options?: { page?: number, category?: Category }) {
    if (options?.page && !options.category) {
      return this.httpClient.get(`${this.apiUrl}/products?page=${options.page}`);
    }
    else if (options?.category) {
      return options.page ? this.httpClient.get(`${this.apiUrl}/products?page=${options.page}&category=${options.category}`) : this.httpClient.get(`${this.apiUrl}/products?category=${options.category}`)
    }
    return this.httpClient.get(`${this.apiUrl}/products`)
  }

  getProductById(id: string) {
    return this.httpClient.get(`${this.apiUrl}/products/${id}`)
  }

  getPages(option?: { category?: Category }) {
    return !option?.category ? this.httpClient.get(`${this.apiUrl}/products/pages`) : this.httpClient.get(`${this.apiUrl}/products/pages?category=${option.category}`)
  }

}
