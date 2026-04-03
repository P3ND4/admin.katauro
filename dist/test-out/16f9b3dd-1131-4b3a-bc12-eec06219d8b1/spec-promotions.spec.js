import {
  PromotionInfo,
  init_promotion_info
} from "./chunk-FGLIXYHW.js";
import {
  Carousels,
  init_carousels
} from "./chunk-MH3NFAOH.js";
import {
  httpService,
  init_errorParser,
  init_http_service,
  parseError
} from "./chunk-QFLJSFW5.js";
import {
  Router,
  RouterLink,
  init_router
} from "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
import {
  BoxLoader,
  init_box_loader
} from "./chunk-FQQDYBZG.js";
import "./chunk-6V3F57C2.js";
import "./chunk-PS4KN3D7.js";
import {
  CommonModule,
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
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\features\dashboard\promotions\promotions.html
var promotions_default;
var init_promotions = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\promotions\\promotions.html"() {
    promotions_default = `<div class="main">\r
  @if (loading) {\r
  <div class="loader-wrapper">\r
    <app-box-loader></app-box-loader>\r
  </div>\r
  }\r
\r
  @if (warn) {\r
  <div class="warn">\r
    <app-message-box [data]="warn" (acept)="onDecide($event.valueOf())"></app-message-box>\r
  </div>\r
  }\r
  @if(info){\r
  <div class="wrapper">\r
    <app-promotion-info [promotion]="info" (close)="info = undefined"></app-promotion-info>\r
  </div>\r
  }\r
\r
\r
  <header class="header">\r
    <h1 class="title">Promociones</h1>\r
    <button class="button-base" [routerLink]="'/dashboard/create-promotion'">\r
      <img src="plus.svg" alt="">\r
      <span>\r
        Nueva promoci\xF3n\r
      </span>\r
    </button>\r
  </header>\r
\r
  <div class="prom-container">\r
    <div class="filters">\r
      @for (fil of []; track $index) {\r
      <div class="button-chips">\r
        <label>\r
          {{fil}}\r
        </label>\r
        <img src="x.svg" alt="">\r
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
          @for (filter of ['M\xE1s recientes', 'Antiguos', 'Realizado', 'Pendiente', 'Cancelado']; track $index)\r
          {\r
          <div class="dropdown-item">\r
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
        <input type="text" placeholder="Buscar" (keyup.enter)="onSearch()" #search />\r
      </div>\r
    </div>\r
    <div class="nav-bar">\r
      <span (click)="proSection = true" [ngClass]="{'active': proSection}">Promociones\r
        @if (proSection) {<div class="selector"></div>}\r
      </span>\r
      <span (click)="proSection = false" [ngClass]="{'active': !proSection}">Banners y carruseles\r
        @if (!proSection) {<div class="selector"></div>}\r
      </span>\r
      <div class="divider"></div>\r
    </div>\r
    @if (proSection) {\r
\r
    <div class="table">\r
\r
      <header class="prom-list-header">\r
        <h2>Promociones</h2>\r
        <div class="count">\r
          <p></p>\r
        </div>\r
      </header>\r
\r
      <div class="head-bar">\r
        @for (item of ['Nombre', 'Vigencia', 'Tipo', 'Descuento', 'Estado', '']; track\r
        $index) {\r
        <div [className]="\`column \${item === '' ? 'action' : item.toLowerCase()}\`">\r
\r
          <div [className]="\`head-bar-item \${item === '' ? 'action' : item.toLowerCase()}\`">\r
            <p>{{item}}</p>\r
          </div>\r
          @for (promo of promotions; track $index) {\r
          <div [className]="\`product-item \${item === '' ? 'action' : item.toLowerCase()}\`" (click)="info = promo">\r
\r
            @if (item === 'Nombre') {\r
            <p>{{promo.name}}</p>\r
            }\r
            @if (item === 'Vigencia') {\r
            <p> {{getDate(promo.startDate)}} - {{getDate(promo.endDate)}} </p>\r
            }\r
            @if (item === 'Tipo') {\r
            <p>{{promo.Type}}</p>\r
            }\r
            @if (item === 'Descuento') {\r
            <p>{{promo.discount}}</p>\r
            }\r
            @if (item === 'Estado') {\r
            <p></p>\r
            }\r
            @if(item === '') {\r
            <div class="actions" (click)="$event.stopImmediatePropagation()">\r
              <button class="action-button" (click)="ask(promo.promo_id)">\r
                <img src="trash-2.svg" alt="">\r
              </button>\r
              <button class="action-button" (click)="navigateEdit(promo.promo_id)">\r
                <img src="edit-2.svg" alt="">\r
              </button>\r
            </div>\r
            }\r
          </div>\r
          }\r
        </div>\r
        }\r
\r
      </div>\r
    </div>\r
    }\r
    @else {\r
    <app-carousels></app-carousels>\r
    }\r
  </div>\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\promotions\promotions.css
var promotions_default2;
var init_promotions2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\promotions\\promotions.css"() {
    promotions_default2 = "/* src/app/features/dashboard/promotions/promotions.css */\n.main {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  position: relative;\n}\n.filters {\n  display: flex;\n  gap: 12px;\n  padding-inline: 32px;\n}\n.filters-dorp-menu {\n  position: relative;\n}\n.dropdown-content {\n  display: flex;\n  width: 292px;\n  position: absolute;\n  background-color: var(--White, #FFF);\n  min-width: 160px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n  z-index: 1;\n  top: 48px;\n  left: 0;\n  flex-direction: column;\n  padding: 8px 0;\n}\n.dropdown-item {\n  display: flex;\n  padding: 10px 14px;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n  cursor: pointer;\n}\n.dropdown-item p {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 24px;\n  margin: 0px;\n}\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-inline: 32px;\n}\nh1 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 30px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 38px;\n  margin: 0px;\n}\n.prom-container {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.nav-bar {\n  position: relative;\n  display: flex;\n  margin-inline: 32px;\n  gap: 16px;\n  padding-bottom: 16px;\n}\n.nav-bar span {\n  color: var(--Gray-500, #717680);\n  cursor: pointer;\n  position: relative;\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n}\n.selector {\n  position: absolute;\n  width: 100%;\n  bottom: -16px;\n  height: 2px;\n  align-self: stretch;\n  background: var(--Brand-700, #007981);\n}\n.nav-bar span.active {\n  color: var(--Brand-700, #007981);\n}\n.divider {\n  position: absolute;\n  width: 100%;\n  background: var(--Gray-200, #E9EAEB);\n  height: 1px;\n  bottom: 0px;\n}\n.prom-list-header {\n  display: flex;\n  align-items: center;\n  padding: 20px 24px;\n  gap: 8px;\n}\n.prom-list-header h2 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 28px;\n  margin: 0px;\n}\n.prom-list-header p {\n  color: var(--Brand-700, #007981);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  margin: 0px;\n}\n.table {\n  margin-inline: 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: stretch;\n  border-radius: 12px;\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--White, #FFF);\n  box-shadow: 0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px 0 rgba(10, 13, 18, 0.06);\n}\n.count {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Brand-50, #F0FEFF);\n}\n.head-bar {\n  display: flex;\n  align-items: flex-start;\n  align-self: stretch;\n}\n.head-bar-item {\n  display: flex;\n  flex: 1;\n  height: 44px;\n  padding: 12px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--Gray-50, #FAFAFA);\n  box-sizing: border-box;\n}\n.head-bar-item.action {\n  min-height: 44px;\n}\n.head-bar p {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  margin: 0px;\n}\n.column {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.column.nombre {\n  min-width: 312px;\n}\n.column.action {\n  flex: none;\n  width: 160px;\n}\n.column.categor\\ed a {\n  width: 225px;\n  flex: none;\n}\n.product-item {\n  display: flex;\n  height: 72px;\n  padding: 16px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.action-button {\n  border: none;\n  background: none;\n  padding: 10px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.status {\n  display: flex;\n  padding: 2px 8px 2px 6px;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  border-radius: 16px;\n  background: var(--Success-50, #ECFDF3);\n}\n.category {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Gray-100, #F5F5F5);\n}\n.status p {\n  color: var(--Success-700, #027A48);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n}\n/*# sourceMappingURL=promotions.css.map */\n";
  }
});

// src/app/features/dashboard/promotions/promotions.ts
var Promotions;
var init_promotions3 = __esm({
  "src/app/features/dashboard/promotions/promotions.ts"() {
    "use strict";
    init_tslib_es6();
    init_promotions();
    init_promotions2();
    init_common();
    init_core();
    init_http_service();
    init_box_loader();
    init_router();
    init_error_log_service();
    init_errorParser();
    init_carousels();
    init_message_box();
    init_promotion_info();
    Promotions = class Promotions2 {
      http;
      cdr;
      router;
      errorServ;
      filterMenu = false;
      proSection = true;
      promotions = [];
      info;
      loading = false;
      constructor(http, cdr, router, errorServ) {
        this.http = http;
        this.cdr = cdr;
        this.router = router;
        this.errorServ = errorServ;
      }
      ngOnInit() {
        this.loading = true;
        this.http.getPromotions().subscribe({
          next: (val) => {
            this.promotions = val;
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorServ.addError(parseError(err));
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      }
      warn;
      getDate(pDate) {
        const date = new Date(pDate);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
      }
      onSearch() {
      }
      navigateEdit(id) {
        this.router.navigate(["/dashboard/create-promotion"], { queryParams: { edit: id } });
      }
      deletePromo(id) {
        this.loading = true;
        this.http.deletePromo(id).subscribe({
          next: (val) => this.ngOnInit(),
          error: (err) => {
            this.errorServ.addError(parseError(err));
          }
        });
      }
      ask(id) {
        this.toDelete = id;
        this.warn = { msg: "Eliminar promoci\xF3n", warn: "\xBFEst\xE1s seguro que deseas realizar esta acci\xF3n? Esta acci\xF3n no tiene vuelta atr\xE1s." };
      }
      toDelete;
      onDecide(result) {
        this.warn = void 0;
        if (result && this.toDelete)
          this.deletePromo(this.toDelete);
        this.toDelete = void 0;
      }
      static ctorParameters = () => [
        { type: httpService },
        { type: ChangeDetectorRef },
        { type: Router },
        { type: ErrorLogService }
      ];
    };
    Promotions = __decorate([
      Component({
        selector: "app-promotions",
        imports: [CommonModule, BoxLoader, RouterLink, Carousels, MessageBox, PromotionInfo],
        template: promotions_default,
        styles: [promotions_default2]
      })
    ], Promotions);
  }
});

// src/app/features/dashboard/promotions/promotions.spec.ts
var require_promotions_spec = __commonJS({
  "src/app/features/dashboard/promotions/promotions.spec.ts"(exports) {
    init_testing();
    init_promotions3();
    describe("Promotions", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Promotions]
        }).compileComponents();
        fixture = TestBed.createComponent(Promotions);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_promotions_spec();
//# sourceMappingURL=spec-promotions.spec.js.map
