import {
  Category,
  init_Product
} from "./chunk-PH3SBJLI.js";
import {
  ProductDetail,
  init_product_detail
} from "./chunk-PFESE2RF.js";
import {
  httpService,
  init_errorParser,
  init_http_service,
  parseError
} from "./chunk-QFLJSFW5.js";
import {
  ActivatedRoute,
  Router,
  init_router
} from "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
import {
  BoxLoader,
  init_box_loader
} from "./chunk-FQQDYBZG.js";
import "./chunk-PS4KN3D7.js";
import {
  CommonModule,
  CurrencyPipe,
  init_common
} from "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import {
  MessageBox,
  init_message_box
} from "./chunk-XBM43HFD.js";
import {
  ErrorLogService,
  init_error_log_service
} from "./chunk-FYBANU52.js";
import {
  ChangeDetectorRef,
  Component,
  TestBed,
  ViewChild,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\features\dashboard\products\products.html
var products_default;
var init_products = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\products\\products.html"() {
    products_default = `<div class="products-main">\r
\r
    @if(loading){\r
    <div class="loader-wrapper">\r
        <app-box-loader message="Cargando productos..."></app-box-loader>\r
    </div>\r
    }\r
\r
    @if(details){\r
    <div class="details-wrapper">\r
        <app-product-detail [currentProduct]="details" (close)="details = undefined"></app-product-detail>\r
    </div>\r
    }\r
\r
\r
\r
    @if (warn) {\r
    <div class="warn">\r
        <app-message-box [data]="warn" (acept)="onDecide($event.valueOf())"></app-message-box>\r
    </div>\r
    }\r
\r
    <header class="prod-header">\r
        <h1>Productos</h1>\r
        <div class="prod-actions">\r
            <button class="button-chips">\r
                <img src="upload-cloud.svg" alt="">\r
                <label>\r
                    Importar\r
                </label>\r
            </button>\r
            <button class="button-base" (click)="router.navigate(['dashboard/create-product'])">\r
                <img src="plus.svg" alt="">\r
                <label>\r
                    Agregar Producto\r
                </label>\r
            </button>\r
\r
        </div>\r
    </header>\r
\r
    <div class="filters">\r
        @for (cat of CategoryFilter; track $index) {\r
        <div class="button-chips">\r
            <label>\r
                {{cat}}\r
            </label>\r
            <img src="x.svg" alt="" (click)="onDeleteFilter($index)">\r
        </div>\r
        }\r
\r
        <div class="filters-dorp-menu">\r
            <button class="button-chips" (click)="filterMenu = !filterMenu">\r
                <img src="Filters lines.svg" alt="">\r
                <label>Filtros</label>\r
            </button>\r
\r
            @if(filterMenu){\r
            <div class="dropdown-content">\r
                @for (filter of CatParser; track $index) {\r
                <div class="dropdown-item" (click)="onAddFilter(filter)">\r
                    <p>{{filter}}</p>\r
                </div>\r
                }\r
            </div>\r
            }\r
        </div>\r
\r
        <div class="spacing" style="flex: 1;"></div>\r
        <div class="input-base">\r
            <img src="search.svg" alt="" (click)="onSearch()">\r
            <input type="text" #searchProd placeholder="Buscar" (keydown.enter)="onSearch()" />\r
        </div>\r
\r
    </div>\r
\r
    <div class="prod-container">\r
        <header class="product-list-header">\r
            <h2>Mis productos</h2>\r
            <div class="count">\r
                <p>{{count}} productos</p>\r
            </div>\r
        </header>\r
\r
        <div class="head-bar">\r
            @for (item of ['imagen','Nombre', 'Categor\xEDa', 'Precio', 'Stock', 'Tipolog\xEDa', 'Estado', '']; track $index)\r
            {\r
            <div [className]="\`column \${item === '' ? 'action' : item.toLowerCase()}\`">\r
                <div [className]="\`head-bar-item \${item === '' ? 'action' : item.toLowerCase()}\`">\r
                    <p>{{item == 'imagen'? '': item}}</p>\r
                </div>\r
                @for (prod of products; track $index) {\r
                <div [className]="\`product-item \${item === '' ? 'action' : item.toLowerCase()}\`"\r
                    (click)="details = prod">\r
                    @if(item === 'imagen') {\r
                    <div class="prod-image">\r
                        <img [src]="prod.variants.length > 0 ? prod.variants[0].images[0].link : 'placeholder-image.png'"\r
                            alt="Imagen del producto">\r
                    </div>\r
                    }\r
                    @if (item === 'Nombre') {\r
                    <p>{{prod.name}}</p>\r
                    }\r
                    @if (item === 'Categor\xEDa') {\r
                    <div class="category">\r
                        <p>{{prod.category.nombre}}</p>\r
                    </div>\r
                    }\r
                    @if (item === 'Precio') {\r
                    <p>{{prod.variants.length==0? "": prod.variants[0].price | currency:'USD': 'symbol':'1.2-2'}}</p>\r
                    }\r
                    @if (item === 'Stock') {\r
                    <p>{{getStock(prod)}}</p>\r
                    }\r
                    @if( item === 'Tipolog\xEDa') {\r
                    <p>{{prod.typology}}</p>\r
                    }\r
                    @if (item === 'Estado') {\r
                    <div class="status">\r
                        <img [src]="'Activo'==='Activo' ? './_Dot_green.svg' : './_Dot_red.svg'" alt="">\r
                        <p>{{'active' === 'active' ? 'Activo' : 'Inactivo'}}</p>\r
                    </div>\r
                    }\r
                    @if(item === '') {\r
                    <div class="actions" (click)="$event.stopImmediatePropagation()">\r
                        <button class="action-button" (click)="ask(prod)">\r
                            <img src="trash-2.svg" alt="">\r
                        </button>\r
                        <button class="action-button" (click)="edit(prod.id)">\r
                            <img src="edit-2.svg" alt="">\r
                        </button>\r
                    </div>\r
                    }\r
                </div>\r
                }\r
\r
\r
            </div>\r
            }\r
        </div>\r
\r
        <div class="pagination">\r
            <button class="button-chips" (click)="onPageChange(currentPage - 1)" [disabled]="currentPage === 1 ">\r
                <img src="arrow-left.svg" alt="">\r
                <label>Anterior</label>\r
            </button>\r
\r
            <div class="pages">\r
                @for (page of pagesArray; track $index) {\r
                @if (page === pages && currentPage-pages > 2 ) {\r
                <div class="page">\r
                    <label>...</label>\r
                </div>\r
                }\r
                <div class="page" [ngClass]="{'active': currentPage == page}" (click)="onPageChange(page)">\r
                    <label>{{page}}</label>\r
                </div>\r
                @if(currentPage > 3 && page+2 == currentPage){\r
                <div class="page">\r
                    <label>...</label>\r
                </div>\r
                }\r
                }\r
            </div>\r
\r
            <button class="button-chips" (click)="onPageChange(currentPage + 1)" [disabled]="currentPage === pages">\r
                <label>Siguiente</label>\r
                <img src="arrow-right.svg" alt="">\r
            </button>\r
\r
        </div>\r
\r
    </div>\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\products\products.css
var products_default2;
var init_products2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\products\\products.css"() {
    products_default2 = "/* src/app/features/dashboard/products/products.css */\n.products-main {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.prod-image {\n  width: 48px;\n  height: 48px;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.head-bar-item.imagen {\n  min-height: 43px;\n}\n.product-item.imagen {\n  justify-content: center;\n  align-items: center;\n}\n.prod-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.details-wrapper {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  z-index: 50;\n  width: 100%;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.prod-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-inline: 32px;\n}\n.prod-actions {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\nh1 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 30px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 38px;\n  margin: 0px;\n}\n.filters {\n  display: flex;\n  gap: 12px;\n  padding-inline: 32px;\n}\n.product-list-header {\n  display: flex;\n  align-items: center;\n  padding: 20px 24px;\n  gap: 8px;\n}\n.product-list-header h2 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 28px;\n  margin: 0px;\n}\n.product-list-header p {\n  color: var(--Brand-700, #007981);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  margin: 0px;\n}\n.prod-container {\n  margin-inline: 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: stretch;\n  border-radius: 12px;\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--White, #FFF);\n  box-shadow: 0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px 0 rgba(10, 13, 18, 0.06);\n}\n.count {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Brand-50, #F0FEFF);\n}\n.head-bar {\n  display: flex;\n  align-items: flex-start;\n  align-self: stretch;\n}\n.head-bar-item {\n  display: flex;\n  flex: 1;\n  height: 44px;\n  padding: 12px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--Gray-50, #FAFAFA);\n  box-sizing: border-box;\n}\n.head-bar-item.action {\n  min-height: 44px;\n}\n.head-bar p {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  margin: 0px;\n}\n.column {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.column.nombre {\n  min-width: 312px;\n}\n.column.action {\n  flex: none;\n  width: 160px;\n}\n.column.categor\\ed a {\n  width: 225px;\n  flex: none;\n}\n.column.imagen {\n  width: 93px;\n  flex: none;\n}\n.product-item {\n  display: flex;\n  height: 72px;\n  padding: 16px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.product-item :hover {\n  cursor: pointer;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.action-button {\n  border: none;\n  background: none;\n  padding: 10px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.status {\n  display: flex;\n  padding: 2px 8px 2px 6px;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  border-radius: 16px;\n  background: var(--Success-50, #ECFDF3);\n}\n.category {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Gray-100, #F5F5F5);\n}\n.status p {\n  color: var(--Success-700, #027A48);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n}\n.pagination {\n  display: flex;\n  padding: 12px 24px 16px 24px;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n  border: 0 solid var(--Gray-200, #E9EAEB);\n}\n.pages {\n  display: flex;\n}\n.page {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  box-sizing: border-box;\n  padding: 12px;\n}\n.page label {\n  color: var(--Gray-500, #717680);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.filters-dorp-menu {\n  position: relative;\n}\n.dropdown-content {\n  display: flex;\n  width: 292px;\n  position: absolute;\n  background-color: var(--White, #FFF);\n  min-width: 160px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n  z-index: 1;\n  top: 48px;\n  left: 0;\n  flex-direction: column;\n  padding: 8px 0;\n}\n.dropdown-item {\n  display: flex;\n  padding: 10px 14px;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n  cursor: pointer;\n}\n.dropdown-item p {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 24px;\n  margin: 0px;\n}\n.page.active {\n  background: #F0FEFF;\n}\n.page.active label {\n  color: var(--Brand-900, #175659);\n}\n/*# sourceMappingURL=products.css.map */\n";
  }
});

// src/app/features/dashboard/products/products.ts
var Products;
var init_products3 = __esm({
  "src/app/features/dashboard/products/products.ts"() {
    "use strict";
    init_tslib_es6();
    init_products();
    init_products2();
    init_core();
    init_Product();
    init_common();
    init_router();
    init_http_service();
    init_message_box();
    init_product_detail();
    init_error_log_service();
    init_errorParser();
    init_box_loader();
    Products = class Products2 {
      router;
      route;
      http;
      cdr;
      errorServ;
      count = 0;
      products = [];
      pagesArray = [1];
      pages = 1;
      currentPage = 1;
      warn;
      toDelete;
      CatParser = [
        Category.footLumin,
        Category.lightBulb,
        Category.roofLumin,
        Category.tableLumin,
        Category.wallLumin
      ];
      search;
      CategoryFilter = [];
      queryParamSubs;
      filterMenu = false;
      details = void 0;
      params = { categories: void 0, search: void 0, page: 1 };
      constructor(router, route, http, cdr, errorServ) {
        this.router = router;
        this.route = route;
        this.http = http;
        this.cdr = cdr;
        this.errorServ = errorServ;
      }
      ngOnInit() {
        this.queryParamSubs = this.route.queryParamMap.subscribe(() => {
          this.ReadData();
        });
      }
      edit(id) {
        this.router.navigate(["/dashboard/create-product"], { queryParams: { id, edit: "true" } });
      }
      loading = false;
      ReadData() {
        this.loading = true;
        const cat = this.route.snapshot.queryParamMap.get("categories");
        this.params.categories = cat ?? void 0;
        const search = this.route.snapshot.queryParamMap.get("search");
        this.params.search = search ?? void 0;
        const page = this.route.snapshot.queryParamMap.get("page");
        this.params.page = page ? +page : 1;
        this.CategoryFilter = [];
        const catList = cat ? cat.split("-") : [];
        catList.map((x) => this.CategoryFilter.push(this.CatParser[+x < 5 && 0 <= +x ? +x : 1]));
        this.http.getPages({ categories: this.params.categories, search: this.params.search }).subscribe({
          next: (val) => {
            this.pages = val;
            this.pagesArray = Array(this.pages).fill(0).map((x, i) => i + 1);
            this.getProducts();
          },
          error: (err) => {
            this.errorServ.addError(parseError(err));
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      }
      getProducts() {
        this.http.getProducts(this.params).subscribe({
          next: (val) => {
            this.products = val.products;
            this.count = val.total;
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.loading = false;
            this.errorServ.addError(parseError(err));
          }
        });
      }
      getStock(prod) {
        return prod.variants.reduce((acc, variant) => acc + variant.stock, 0);
      }
      onPageChange(page) {
        this.currentPage = page;
        this.params.page = page;
        this.router.navigate([], { queryParams: this.params });
      }
      onAddFilter(filter) {
        if (!this.CategoryFilter.includes(filter)) {
          this.CategoryFilter.push(filter);
          this.router.navigate([], { queryParams: { categories: this.CategoryFilter.map((x) => this.CatParser.indexOf(x)).join("-") }, queryParamsHandling: "merge" });
        }
      }
      onDeleteFilter(index) {
        this.CategoryFilter.splice(index, 1);
        this.router.navigate([], { queryParams: { categories: this.CategoryFilter.map((x) => this.CatParser.indexOf(x)).join("-") }, queryParamsHandling: "merge" });
      }
      delete(id) {
        this.loading = true;
        this.http.deleteProduct(id).subscribe({
          next: (val) => {
            this.loading = false;
            this.ReadData();
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorServ.addError(parseError(err));
            this.loading = false;
          }
        });
      }
      ask(product) {
        this.toDelete = product;
        this.warn = { msg: "Eliminar producto", warn: "\xBFEst\xE1s seguro que deseas realizar esta acci\xF3n? Esta acci\xF3n no tiene vuelta atr\xE1s." };
      }
      onDecide(result) {
        this.warn = void 0;
        if (result && this.toDelete)
          this.delete(this.toDelete.id);
        this.toDelete = void 0;
      }
      onSearch() {
        const search = this.search.nativeElement.value;
        this.params.search = search;
        this.router.navigate([], {
          queryParams: this.params
        });
      }
      static ctorParameters = () => [
        { type: Router },
        { type: ActivatedRoute },
        { type: httpService },
        { type: ChangeDetectorRef },
        { type: ErrorLogService }
      ];
      static propDecorators = {
        search: [{ type: ViewChild, args: ["searchProd"] }]
      };
    };
    Products = __decorate([
      Component({
        selector: "app-products",
        imports: [CurrencyPipe, CommonModule, MessageBox, ProductDetail, BoxLoader],
        template: products_default,
        styles: [products_default2]
      })
    ], Products);
  }
});

// src/app/features/dashboard/products/products.spec.ts
var require_products_spec = __commonJS({
  "src/app/features/dashboard/products/products.spec.ts"(exports) {
    init_testing();
    init_products3();
    describe("Products", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Products]
        }).compileComponents();
        fixture = TestBed.createComponent(Products);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_products_spec();
//# sourceMappingURL=spec-products.spec.js.map
