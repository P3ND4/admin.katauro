import {
  HttpClient,
  init_http
} from "./chunk-PS4KN3D7.js";
import {
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// src/app/shared/services/http/http.service.ts
var httpService;
var init_http_service = __esm({
  "src/app/shared/services/http/http.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_http();
    init_core();
    httpService = class httpService2 {
      httpClient;
      apiUrl = "https://api.katauro.com/";
      constructor(httpClient) {
        this.httpClient = httpClient;
      }
      meAdmin() {
        return this.httpClient.get(`${this.apiUrl}auth/me`, { withCredentials: true });
      }
      logAdmin(pass) {
        return this.httpClient.post(`${this.apiUrl}auth/admin`, { password: pass }, { withCredentials: true });
      }
      getProducts(option) {
        var url = this.apiUrl + "products" + (option ? "?" : "");
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
      getProductById(id) {
        return this.httpClient.get(`${this.apiUrl}products/${id}`, { withCredentials: true });
      }
      getPages(option) {
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
        return this.httpClient.get(`${this.apiUrl}products/categories`, { withCredentials: true });
      }
      updateProduct(id, prod) {
        return this.httpClient.patch(`${this.apiUrl}products/${id}`, prod, { withCredentials: true });
      }
      createProduct(product) {
        return this.httpClient.post(`${this.apiUrl}products`, product, { withCredentials: true });
      }
      getColors() {
        return this.httpClient.get(`${this.apiUrl}products/colors`, { withCredentials: true });
      }
      createColor(color) {
        return this.httpClient.post(`${this.apiUrl}products/colors`, color, { withCredentials: true });
      }
      createFinish(finish) {
        return this.httpClient.post(`${this.apiUrl}products/finish`, finish, { withCredentials: true });
      }
      getFinishes() {
        return this.httpClient.get(`${this.apiUrl}products/finish`, { withCredentials: true });
      }
      deleteProduct(id) {
        return this.httpClient.delete(`${this.apiUrl}products/${id}`, { withCredentials: true });
      }
      deleteFinish(id) {
        return this.httpClient.delete(`${this.apiUrl}products/finish/${id}`, { withCredentials: true });
      }
      deleteColor(id) {
        return this.httpClient.delete(`${this.apiUrl}products/colors/${id}`, { withCredentials: true });
      }
      getOrders(option) {
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
      updateOrder(id, state) {
        return this.httpClient.patch(`${this.apiUrl}order/${id}`, state, { withCredentials: true });
      }
      getPromotions() {
        return this.httpClient.get(`${this.apiUrl}promotion`, { withCredentials: true });
      }
      getPromotion(id) {
        return this.httpClient.get(`${this.apiUrl}promotion/${id}`, { withCredentials: true });
      }
      createPromo(data) {
        return this.httpClient.post(`${this.apiUrl}promotion`, data, { withCredentials: true });
      }
      deletePromo(id) {
        return this.httpClient.delete(`${this.apiUrl}promotion/${id}`, { withCredentials: true });
      }
      updatePromo(id, data) {
        return this.httpClient.patch(`${this.apiUrl}promotion/${id}`, data, { withCredentials: true });
      }
      getCarousels() {
        return this.httpClient.get(`${this.apiUrl}promotion/carousel`, { withCredentials: true });
      }
      updateBanner(data, id) {
        return this.httpClient.patch(`${this.apiUrl}promotion/banner/${id}`, data, { withCredentials: true });
      }
      getBanner(id) {
        return this.httpClient.get(`${this.apiUrl}promotion/banners/${id}`, { withCredentials: true });
      }
      static ctorParameters = () => [
        { type: HttpClient }
      ];
    };
    httpService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], httpService);
  }
});

// src/app/shared/services/errors/errorParser.ts
function parseError(error) {
  let errorName = error.error.error ?? "Error";
  let errorMessage = error.error.message ?? "An unexpected error occurred.";
  if (error.error && error.status === 0) {
    errorName = "Error de conexi\xF3n";
    errorMessage = "No se pudo conectar con el servidor. Por favor, verifica tu conexi\xF3n a internet y recargue la p\xE1gina";
  }
  if (error.error && error.status === 401) {
    errorName = "No autorizado";
  }
  return { name: errorName, error: errorMessage };
}
var init_errorParser = __esm({
  "src/app/shared/services/errors/errorParser.ts"() {
    "use strict";
  }
});

export {
  httpService,
  init_http_service,
  parseError,
  init_errorParser
};
//# sourceMappingURL=chunk-QFLJSFW5.js.map
