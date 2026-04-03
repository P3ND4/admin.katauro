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
import {
  BoxLoader,
  init_box_loader
} from "./chunk-FQQDYBZG.js";
import {
  Corousel,
  init_corousel
} from "./chunk-6V3F57C2.js";
import {
  CommonModule,
  init_common
} from "./chunk-QVDWSDMI.js";
import {
  ErrorLogService,
  init_error_log_service
} from "./chunk-FYBANU52.js";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\features\dashboard\promotions\carousels\carousels.html
var carousels_default;
var init_carousels = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\promotions\\carousels\\carousels.html"() {
    carousels_default = `<div class="main">\r
  @if (loading) {\r
  <div class="loader-wrapper">\r
    <app-box-loader></app-box-loader>\r
  </div>\r
  }\r
  <!---->\r
  @if (edit) {\r
  <div class="wrapper">\r
    <app-edit-carousel (close)="edit = undefined" [data]="edit"></app-edit-carousel>\r
  </div>\r
  }\r
\r
\r
  @for (car of carousels; track $index) {\r
  <div class="carousel">\r
    <header class="car-header">\r
      <h2>{{names[car.name]}}</h2>\r
      <button class="button-chips" (click)="edit ={banners: car.banners, name: names[car.name]}">\r
        <img src="edit-3.svg" alt="">\r
        <span>Editar</span>\r
      </button>\r
    </header>\r
    <app-corousel style="width: 100%;" [currentSlide]="selected[car.name]"\r
      [data]="{banners: car.banners, carousel: $index}"></app-corousel>\r
    <div class="footer">\r
      @for (ban of car.banners; track $index) {\r
      <div class="select" [ngClass]="{'active': selected[car.name] == $index}" (click)="selected[car.name] = $index">\r
        <span>{{$index + 1}}</span>\r
      </div>\r
      }\r
    </div>\r
  </div>\r
  }\r
\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\promotions\carousels\carousels.css
var carousels_default2;
var init_carousels2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\promotions\\carousels\\carousels.css"() {
    carousels_default2 = "/* src/app/features/dashboard/promotions/carousels/carousels.css */\n.main {\n  display: flex;\n  padding-inline: 32px;\n  gap: 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.wrapper {\n  position: absolute;\n  width: 100%;\n  left: 0px;\n  z-index: 10;\n  box-sizing: border-box;\n  padding-inline: 10px;\n}\n.carousel {\n  display: flex;\n  width: 635px;\n  flex-direction: column;\n  align-items: flex-start;\n  border-radius: 12px;\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--White, #FFF);\n  box-shadow: 0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px 0 rgba(10, 13, 18, 0.06);\n}\n.car-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.car-header h2 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 28px;\n}\n.footer {\n  display: flex;\n  justify-content: center;\n  gap: 2px;\n  padding: 12px 24px;\n  box-sizing: border-box;\n  width: 100%;\n}\n.select {\n  display: flex;\n  height: 40px;\n  aspect-ratio: 1;\n  justify-content: center;\n  align-items: center;\n}\n.select:hover {\n  cursor: pointer;\n}\n.select span {\n  color: var(--Gray-500, #717680);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.select.active {\n  border-radius: 8px;\n  background: var(--Brand-50, #F0FEFF);\n}\n.select.active span {\n  color: #178C94;\n}\n/*# sourceMappingURL=carousels.css.map */\n";
  }
});

// angular:jit:template:src\app\features\dashboard\promotions\edit-carousel\edit-carousel.html
var edit_carousel_default;
var init_edit_carousel = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\promotions\\edit-carousel\\edit-carousel.html"() {
    edit_carousel_default = `<div class="main">\r
\r
  <header class="main-head">\r
    <h2>{{data.name}}</h2>\r
    <img style="cursor: pointer;" src="x.svg" alt="" (click)="onClose()">\r
  </header>\r
\r
  @for (banner of data.banners; track banner; let i = $index)\r
  {\r
  <div class="banner-container">\r
    <header class="banner-head">\r
      <h3>Banner {{i+1}}</h3>\r
      <button class="button-chips" [routerLink]="\`/dashboard/edit-banner/\${banner.id}\`">\r
        <img src="edit-3.svg" alt="">\r
        <span>Editar</span>\r
      </button>\r
    </header>\r
    <div class="banner-content">\r
      <div class="info">\r
        <div class="data">\r
          <h4>Promoci\xF3n activa</h4>\r
          @if (banner.product) {\r
          @for (promo of filterActivePromotions(banner.product.promotions); track promo) {\r
          <p>{{promo.name}}</p>\r
          }\r
          }\r
        </div>\r
\r
        <div class="data">\r
          <h4>Nombre</h4>\r
          <p>{{banner.name? banner.name: 'T\xEDtulo atractivo en 2 l\xEDneas de texto'}}</p>\r
        </div>\r
\r
        <div class="data">\r
          <h4>Descripci\xF3n breve</h4>\r
          <p>{{banner.description?banner.description:"Descripci\xF3n corta del evento o producto que se este\r
            promocionando."}}</p>\r
        </div>\r
      </div>\r
      <div class="preview">\r
        <img [src]="banner.image? banner.image: 'carousel-base.png' " alt="">\r
      </div>\r
\r
    </div>\r
  </div>\r
  }\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\promotions\edit-carousel\edit-carousel.css
var edit_carousel_default2;
var init_edit_carousel2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\promotions\\edit-carousel\\edit-carousel.css"() {
    edit_carousel_default2 = "/* src/app/features/dashboard/promotions/edit-carousel/edit-carousel.css */\n.main {\n  display: flex;\n  padding: 24px 24px 64px 48px;\n  flex-direction: column;\n  align-items: flex-start;\n  flex: 1 0 0;\n  gap: 40px;\n  align-self: stretch;\n  border-radius: var(--Corner-Small, 8px);\n  background: var(--Gray-50, #FAFAFA);\n  border-radius: 8px;\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  box-shadow: 0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03);\n}\n.main-head {\n  display: flex;\n}\n.main-head h2 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 28px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.banner-container {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: 100%;\n  gap: 12px;\n  flex: 1 0 0;\n}\nheader {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n.banner-head h3 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 24px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.banner-content {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  align-self: stretch;\n}\n.info {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 40px;\n  flex: 1 0 0;\n}\n.data {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n}\n.data h4 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.data p {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 28px;\n}\n.preview {\n  display: flex;\n  width: 596.975px;\n  height: 232.157px;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4.146px;\n  overflow: hidden;\n}\n.preview img {\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n  object-position: center;\n}\n/*# sourceMappingURL=edit-carousel.css.map */\n";
  }
});

// src/app/features/dashboard/promotions/edit-carousel/edit-carousel.ts
var EditCarousel;
var init_edit_carousel3 = __esm({
  "src/app/features/dashboard/promotions/edit-carousel/edit-carousel.ts"() {
    "use strict";
    init_tslib_es6();
    init_edit_carousel();
    init_edit_carousel2();
    init_core();
    init_router();
    EditCarousel = class EditCarousel2 {
      router;
      data = { name: "Principal", banners: [] };
      close = new EventEmitter();
      constructor(router) {
        this.router = router;
      }
      ngOnInit() {
        console.log(this.data.banners);
      }
      onClose() {
        this.close.emit();
      }
      filterActivePromotions(promos) {
        const now = /* @__PURE__ */ new Date();
        let filters = promos.filter((x) => new Date(x.promotion.endDate) > now && new Date(x.promotion.startDate) < now).map((x) => x.promotion);
        return filters;
      }
      static ctorParameters = () => [
        { type: Router }
      ];
      static propDecorators = {
        data: [{ type: Input }],
        close: [{ type: Output }]
      };
    };
    EditCarousel = __decorate([
      Component({
        selector: "app-edit-carousel",
        imports: [RouterLink],
        template: edit_carousel_default,
        styles: [edit_carousel_default2]
      })
    ], EditCarousel);
  }
});

// src/app/features/dashboard/promotions/carousels/carousels.ts
var Carousels;
var init_carousels3 = __esm({
  "src/app/features/dashboard/promotions/carousels/carousels.ts"() {
    "use strict";
    init_tslib_es6();
    init_carousels();
    init_carousels2();
    init_core();
    init_http_service();
    init_error_log_service();
    init_errorParser();
    init_box_loader();
    init_corousel();
    init_common();
    init_edit_carousel3();
    Carousels = class Carousels2 {
      http;
      errorServ;
      cdr;
      carousels = [];
      loading = false;
      selected = { "primary": 0, "secundary": 0 };
      names = { "primary": "Carrusel principal", "secundary": "Carrusel secundario" };
      edit = void 0;
      constructor(http, errorServ, cdr) {
        this.http = http;
        this.errorServ = errorServ;
        this.cdr = cdr;
      }
      ngOnInit() {
        this.loadData();
      }
      loadData() {
        this.loading = true;
        this.http.getCarousels().subscribe({
          next: (val) => {
            this.carousels = val;
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
      static ctorParameters = () => [
        { type: httpService },
        { type: ErrorLogService },
        { type: ChangeDetectorRef }
      ];
    };
    Carousels = __decorate([
      Component({
        selector: "app-carousels",
        imports: [BoxLoader, Corousel, CommonModule, EditCarousel],
        template: carousels_default,
        styles: [carousels_default2]
      })
    ], Carousels);
  }
});

export {
  Carousels,
  init_carousels3 as init_carousels
};
//# sourceMappingURL=chunk-MH3NFAOH.js.map
