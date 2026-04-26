import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatModel } from '../../models/product/Product';
import { CreateProductDto } from '../../models/product/create-product-dto';
import { OrderState } from '../../models/Order';
import { CreatePromotionDto } from '../../models/promotions';
import { Blog as CreateBlogDTO } from '../../models/blog/DTO\'s/blog.entity';
import { CreateTag as CreateTagDTO } from '../../models/blog/DTO\'s/tags.entity';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  apiUrl: string = 'https://api.katauro.com/';

  constructor(private httpClient: HttpClient) {
    //this.apiUrl = 'http://localhost:3500/';
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

  getBlogs(option?: { page?: number, tags?: string, search?: string, sortBy?: string }) {
    var url = this.apiUrl + 'blogs' + (option ? '?' : '');

    if (option?.sortBy) {
      url += option.tags || option.search || option.page ? `sortBy=${option.sortBy}&` : `sortBy=${option.sortBy}`;
    }
    if (option?.tags) {
      url += option.search || option.page ? `tags=${option.tags}&` : `tags=${option.tags}`;
    }
    if (option?.search) {
      url += option.page ? `search=${option.search}&` : `search=${option.search}`;
    }
    if (option?.page) {
      url += `page=${option.page}`;
    }

    return this.httpClient.get(url, { withCredentials: true });
  }

  getBlogPages(option?: { tags?: string, search?: string }) {
    var url = option ? `${this.apiUrl}blogs/pages/total?` : `${this.apiUrl}blogs/pages/total`;

    if (option?.tags) {
      url += option.search ? `tags=${option.tags}&` : `tags=${option.tags}`;
    }
    if (option?.search) {
      url += `search=${option.search}`;
    }
    return this.httpClient.get(url, { withCredentials: true });
  }

  getBlog(id: string) {
    return this.httpClient.get(`${this.apiUrl}blogs/${id}`, { withCredentials: true });
  }

  createBlog(data: CreateBlogDTO) {
    return this.httpClient.post(`${this.apiUrl}blogs`, data, { withCredentials: true });
  }

  updateBlog(id: string, data: CreateBlogDTO) {
    return this.httpClient.patch(`${this.apiUrl}blogs/${id}`, data, { withCredentials: true });
  }

  deleteBlog(id: string) {
    return this.httpClient.delete(`${this.apiUrl}blogs/${id}`, { withCredentials: true });
  }

  createTag(data: CreateTagDTO) {
    return this.httpClient.post(`${this.apiUrl}blogs/tags`, data, { withCredentials: true });
  }

  getTags() {
    return this.httpClient.get(`${this.apiUrl}blogs/tags/all`, { withCredentials: true });
  }
}