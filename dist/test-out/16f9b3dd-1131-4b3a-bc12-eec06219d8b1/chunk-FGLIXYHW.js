import {
  Router,
  init_router
} from "./chunk-6CBWGU4L.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\features\dashboard\promotions\promotion-info\promotion-info.html
var promotion_info_default;
var init_promotion_info = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\promotions\\promotion-info\\promotion-info.html"() {
    promotion_info_default = `<div class="main">\r
  <header class="main-head">\r
    <div class="cross" (click)="onClose()">\r
      <img src="x.svg" alt="">\r
    </div>\r
    <div class="name">\r
      <h2>{{promotion.name}}</h2>\r
      <p>{{convertToDate(promotion.startDate)}} - {{convertToDate(promotion.endDate)}}</p>\r
    </div>\r
\r
    <button class="button-chips" (click)="navigateToEdit()">\r
      <img src="edit-3.svg">\r
      <span>Editar</span>\r
    </button>\r
  </header>\r
  <div class="desc-section">\r
    <div class="info-object name">\r
      <h4>Nombre</h4>\r
      <p>{{promotion.name}}</p>\r
    </div>\r
    <div class="info-object">\r
      <h4>Descripci\xF3n breve</h4>\r
      <p>{{promotion.description}}</p>\r
    </div>\r
  </div>\r
  <div class="desc-section-2">\r
    <div class="info-object">\r
      <h4>Tipo de promoci\xF3n</h4>\r
      <p>{{promotion.Type? 'General': 'Por categor\xEDa y producto'}}</p>\r
    </div>\r
    <div class="info-object">\r
      <h4>Valor del descuento</h4>\r
      <p>{{promotion.discount}} %</p>\r
    </div>\r
    <div class="info-object">\r
      <h4>Fecha de inicio</h4>\r
      <p>{{convertToDate(promotion.startDate)}}</p>\r
    </div>\r
    <div class="info-object">\r
      <h4>Fecha de finalizaci\xF3n</h4>\r
      <p>{{convertToDate(promotion.endDate)}}</p>\r
    </div>\r
  </div>\r
  <div class="promo-content">\r
    <div class="categories">\r
      <h4>Categor\xEDas</h4>\r
      @for (cat of promotion.categories; track cat) {\r
      <div class="item cat">\r
        <span>{{cat.category.nombre}}</span>\r
      </div>\r
      }\r
    </div>\r
\r
    <div class="products">\r
      <h4>Productos</h4>\r
      @for (prod of promotion.products; track prod) {\r
      <div class="item product">\r
        <div class="image">\r
          <img [src]="prod.product.image" alt="">\r
        </div>\r
        <span> {{prod.product.genericProd?.name}} </span>\r
      </div>\r
      }\r
    </div>\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\promotions\promotion-info\promotion-info.css
var promotion_info_default2;
var init_promotion_info2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\promotions\\promotion-info\\promotion-info.css"() {
    promotion_info_default2 = "/* src/app/features/dashboard/promotions/promotion-info/promotion-info.css */\n.main {\n  display: flex;\n  padding: 24px 24px 64px 48px;\n  flex-direction: column;\n  align-items: flex-start;\n  flex: 1 0 0;\n  align-self: stretch;\n  gap: 40px;\n  border-radius: var(--Corner-Small, 8px);\n  background: var(--Gray-50, #FAFAFA);\n  border: 1px solid lightgray;\n  box-shadow: 0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03);\n}\n.main-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n  position: relative;\n  padding-top: 48px;\n}\n.cross {\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  width: 48px;\n  aspect-ratio: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.cross:hover {\n  cursor: pointer;\n}\n.main-head h2 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 28px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.main-head p {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n.desc-section {\n  display: flex;\n  align-items: flex-start;\n  gap: 40px;\n  align-self: stretch;\n}\n.desc-section-2 {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  align-self: stretch;\n}\n.info-object {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1 0 0;\n}\n.info-object.name {\n  flex: 0;\n  min-width: 400px;\n}\n.info-object h4 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.info-object p {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 28px;\n}\n.promo-content {\n  display: flex;\n  align-items: flex-start;\n  gap: 40px;\n  align-self: stretch;\n}\n.categories,\n.products {\n  display: flex;\n  width: 359px;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.categories h4,\n.products h4 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.item {\n  display: flex;\n  padding: 16px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n}\n.image {\n  display: flex;\n  width: 40px;\n  height: 40px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  border-radius: 4px;\n}\n.image img {\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\n.item span {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.item.cat span {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Gray-100, #F5F5F5);\n}\n/*# sourceMappingURL=promotion-info.css.map */\n";
  }
});

// src/app/features/dashboard/promotions/promotion-info/promotion-info.ts
var PromotionInfo;
var init_promotion_info3 = __esm({
  "src/app/features/dashboard/promotions/promotion-info/promotion-info.ts"() {
    "use strict";
    init_tslib_es6();
    init_promotion_info();
    init_promotion_info2();
    init_core();
    init_router();
    PromotionInfo = class PromotionInfo2 {
      router;
      promotion;
      close = new EventEmitter();
      constructor(router) {
        this.router = router;
      }
      convertToDate(date) {
        date = new Date(date);
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1 + 100).toString().slice(1);
        let day = (date.getDate() + 100).toString().slice(1);
        return year + "-" + month + "-" + day;
      }
      onClose() {
        this.close.emit();
      }
      navigateToEdit() {
        this.router.navigate([`/dashboard/create-promotion`], { queryParams: { edit: this.promotion.promo_id } });
      }
      static ctorParameters = () => [
        { type: Router }
      ];
      static propDecorators = {
        promotion: [{ type: Input, args: [{ required: true }] }],
        close: [{ type: Output }]
      };
    };
    PromotionInfo = __decorate([
      Component({
        selector: "app-promotion-info",
        imports: [],
        template: promotion_info_default,
        styles: [promotion_info_default2]
      })
    ], PromotionInfo);
  }
});

export {
  PromotionInfo,
  init_promotion_info3 as init_promotion_info
};
//# sourceMappingURL=chunk-FGLIXYHW.js.map
