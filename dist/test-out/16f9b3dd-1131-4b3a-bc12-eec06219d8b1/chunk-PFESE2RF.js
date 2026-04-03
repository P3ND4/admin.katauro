import {
  httpService,
  init_errorParser,
  init_http_service,
  parseError
} from "./chunk-QFLJSFW5.js";
import {
  ActivatedRoute,
  init_router
} from "./chunk-6CBWGU4L.js";
import {
  CommonModule,
  CurrencyPipe,
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
  Pipe,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\features\dashboard\products\product-detail\product-detail.html
var product_detail_default;
var init_product_detail = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\products\\product-detail\\product-detail.html"() {
    product_detail_default = `<div class="detail-container">\r
\r
    <div class="img-container">\r
        <div class="main-image">\r
            @if (charged) {\r
            <img class="main-img" [src]="images[selectedImage]" [alt]="currentProduct.name" />\r
            }\r
            @else {\r
            <div class="image-loader"></div>\r
            }\r
        </div>\r
        <div class="sec-img-container">\r
            @for (item of images; track $index) {\r
            <div class="sec-images">\r
                @if (charged) {\r
                <img [src]="item" [alt]="currentProduct.name" (click)="selectImage($index)">\r
                }\r
                @else {\r
                <div class="image-loader"></div>\r
                }\r
            </div>\r
            }\r
        </div>\r
    </div>\r
    <div class="detail-content">\r
        <div class="cross" (click)="onClose()">\r
            <img src="x.svg" alt="">\r
        </div>\r
        @if(charged){\r
        <div class="details">\r
            <h2>{{currentProduct.name}}</h2>\r
            <h4>{{currentProduct.subtitle}}</h4>\r
            <p>{{currentProduct.description}}</p>\r
            <div class="features">\r
\r
                <div class="finishing-electric">\r
                    <div class="finishing">\r
                        <h3>TERMINACIONES</h3>\r
                        @for (item of prodFinishes; track $index) {\r
                        <div class="finish-details">\r
                            <p>{{item.text}}</p>\r
                            <div class="finis-image">\r
                                <img [src]="item.image" [alt]="item.text">\r
                            </div>\r
                        </div>\r
                        }\r
                    </div>\r
                    <div class="electric">\r
                        <h3>SISTEMA EL\xC9CTRICO\r
                        </h3>\r
                        @for (item of currentProduct.details; track $index) {\r
                        <p>{{item.text}}</p>\r
                        }\r
                    </div>\r
                </div>\r
                <div class="variants">\r
                    <h3>COLORES</h3>\r
                    <div class="variant-list">\r
                        @for (item of currentProduct.variants; track $index) {\r
                        <div class="color-container" (click)="variantChange($index)"\r
                            [ngClass]="{'active': currentVariant === $index}">\r
                            <img [src]="item.color!.image" [alt]="item.color!.name">\r
                        </div>\r
                        }\r
                    </div>\r
                </div>\r
            </div>\r
        </div>\r
        }@else {\r
        <div class="details sk">\r
            <div class="sk-pair">\r
                <div class="sk-bar header"></div>\r
                <div class="sk-bar s-line"></div>\r
            </div>\r
            <div class="sk-pair">\r
                <div class="sk-bar line"></div>\r
                <div class="sk-bar line"></div>\r
                <div class="sk-bar line"></div>\r
                <div class="sk-bar line w70"></div>\r
            </div>\r
\r
            <div class="sk-pairs">\r
                <div class="sk-pair">\r
                    <div class="sk-bar line w70"></div>\r
                    <div class="sk-bar line"></div>\r
                    <div class="sk-bar line"></div>\r
                    <div class="sk-bar line"></div>\r
                </div>\r
                <div class="sk-pair">\r
                    <div class="sk-bar line w70"></div>\r
                    <div class="sk-bar line"></div>\r
                    <div class="sk-bar line"></div>\r
                    <div class="sk-bar line"></div>\r
                </div>\r
            </div>\r
            <div class="sk-pair">\r
                <div class="sk-bar line 70"></div>\r
                <div class="sk-bar cube"></div>\r
            </div>\r
\r
        </div>\r
        }\r
        <div class="button-bar">\r
            <div class="divider"></div>\r
            <div class="price-info">\r
                @if(charged){\r
                <p>{{ (currentProduct!.variants.length > 0 ? currentProduct!.variants[currentVariant].price : 0 ) |\r
                    customCurrency\r
                    }}\r
                    <span [style.fontWeight]="600" class="currency">USD</span>    \r
                </p>\r
                }\r
                @else {\r
                <div class="sk-bar line price"></div>\r
                }\r
                <span>Cada Luminaria</span>\r
\r
            </div>\r
\r
        </div>\r
    </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\products\product-detail\product-detail.css
var product_detail_default2;
var init_product_detail2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\products\\product-detail\\product-detail.css"() {
    product_detail_default2 = '/* src/app/features/dashboard/products/product-detail/product-detail.css */\nh2 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font, "Montserrat");\n  font-size: 48px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 60px;\n  margin: 0px;\n  letter-spacing: -0.96px;\n}\nh4 {\n  color: var(--Brand-600, #178C94);\n  font-family: var(--montser-font, "Montserrat");\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 24px;\n  margin: 0px;\n}\n.detail-container {\n  display: flex;\n  align-items: flex-start;\n  align-self: stretch;\n  border-radius: var(--Corner-Small, 8px);\n  background: var(--Gray-50, #FAFAFA);\n}\n.image-loader {\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      180deg,\n      #0000000a 0%,\n      #0000006e 96%);\n}\n.details.sk {\n  gap: 48px;\n}\n.sk-bar.header {\n  width: 70%;\n  height: 48px;\n  background-color: #A4A7AE;\n}\n.sk-bar.s-line {\n  width: 100%;\n  height: 16px;\n  background-color: #A4A7AE;\n}\n.sk-bar.line {\n  width: 100%;\n  height: 16px;\n  background-color: #A4A7AE;\n}\n.sk-bar.line.w70 {\n  width: 70%;\n  height: 16px;\n  background-color: #A4A7AE;\n}\n.sk-pairs {\n  width: 100%;\n  display: flex;\n  gap: 48px;\n}\n.sk-pair {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  width: 100%;\n}\n.sk-bar.cube {\n  width: 16px;\n  height: 16px;\n  background-color: #A4A7AE;\n}\n.sk-bar.line.price {\n  height: 24px;\n}\np {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font, "Montserrat");\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 30px;\n  margin-top: 40px;\n  margin-bottom: 48px;\n}\n.img-container {\n  display: flex;\n  width: 644px;\n  padding: 20px 0 20px 20px;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 19.346px;\n}\n.cross {\n  position: absolute;\n  padding: 14px;\n  align-self: flex-end;\n  cursor: pointer;\n  top: -24px;\n}\n.detail-content {\n  position: relative;\n  margin-top: 48px;\n  display: flex;\n  padding: 24px 24px 64px 48px;\n  flex-direction: column;\n  align-items: flex-end;\n  flex: 1 0 0;\n  align-self: stretch;\n  width: 564px;\n}\n.details {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  align-self: stretch;\n  margin-bottom: 32px;\n}\n.details h2,\n.details h4 {\n  width: 100%;\n  text-align: left;\n}\n.button-bar {\n  position: relative;\n  display: flex;\n  padding-top: 24px;\n  height: auto;\n  box-sizing: border-box;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.button-bar p {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 30px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 38px;\n  margin: 0px;\n  flex: 1;\n}\n.price-info span {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n.divider {\n  position: absolute;\n  top: 0px;\n  height: 1px;\n  background: var(--Gray-300, #D5D7DA);\n  width: 100%;\n}\n.btn-section {\n  display: flex;\n  gap: 12px;\n  width: auto;\n  height: 48px;\n}\n.btn-section .button-base {\n  width: auto;\n}\n.main-image {\n  display: flex;\n  align-items: center;\n  height: 644px;\n  justify-content: center;\n  border-radius: 3.869px;\n  overflow: hidden;\n  width: 100%;\n}\n.main-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.sec-img-container {\n  display: flex;\n  width: 100%;\n  height: 123px;\n  gap: 7.74px;\n}\n.sec-images {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  flex: 1;\n  cursor: pointer;\n}\n.sec-img-container img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.features {\n  display: flex;\n  flex-direction: column;\n  gap: 36px;\n  width: 100%;\n}\n.finishing-electric {\n  display: flex;\n  width: 100%;\n  gap: 48px;\n}\n.finishing,\n.electric {\n  display: flex;\n  gap: 4px;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: stretch;\n  flex: 1;\n}\n.finishing h3,\n.electric h3,\n.variants h3 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n  margin: 0px;\n}\n.finishing p,\n.electric p {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 28px;\n  margin: 0px;\n}\n.variants {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  gap: 8px;\n}\n.variants h3 {\n  text-align: left;\n}\n.variant-list {\n  display: flex;\n  gap: 8px;\n}\n.color-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  overflow: hidden;\n  border: 0.5px solid black;\n  cursor: pointer;\n}\n.color-container.active {\n  border: 2px solid #178C94;\n}\n.color-container img {\n  min-width: 100%;\n  height: 100%;\n}\n.finish-details {\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: left;\n  width: 100%;\n  gap: 8px;\n}\n.finis-image {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  border-radius: 50%;\n  border: 1px solid black;\n}\n.finis-image img {\n  height: 100%;\n  min-width: 100%;\n}\n.btn-section .button-chips {\n  padding: 14px;\n}\n/*# sourceMappingURL=product-detail.css.map */\n';
  }
});

// src/app/shared/pipes/myCurrencyPipe.ts
var CustomCurrencyPipe;
var init_myCurrencyPipe = __esm({
  "src/app/shared/pipes/myCurrencyPipe.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_common();
    CustomCurrencyPipe = class CustomCurrencyPipe2 {
      currencyPipe;
      constructor(currencyPipe) {
        this.currencyPipe = currencyPipe;
      }
      transform(value, currencyCode = "USD", display = "symbol", digitsInfo = "1.2-2", locale = "en-US") {
        const formatted = this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
        if (!formatted)
          return null;
        console.log("Formatted value:", formatted);
        return formatted.replace("$", "$ ");
      }
      static ctorParameters = () => [
        { type: CurrencyPipe }
      ];
    };
    CustomCurrencyPipe = __decorate([
      Pipe({
        name: "customCurrency"
      })
    ], CustomCurrencyPipe);
  }
});

// src/app/features/dashboard/products/product-detail/product-detail.ts
var ProductDetail;
var init_product_detail3 = __esm({
  "src/app/features/dashboard/products/product-detail/product-detail.ts"() {
    "use strict";
    init_tslib_es6();
    init_product_detail();
    init_product_detail2();
    init_core();
    init_router();
    init_http_service();
    init_common();
    init_error_log_service();
    init_errorParser();
    init_myCurrencyPipe();
    ProductDetail = class ProductDetail2 {
      route;
      http;
      cdr;
      errorServ;
      currentProduct;
      close = new EventEmitter();
      queryParamsSubscription;
      images = [];
      finishes = [];
      prodFinishes = [];
      currentVariant = 0;
      selectedImage = 0;
      loading = false;
      charged = false;
      constructor(route, http, cdr, errorServ) {
        this.route = route;
        this.http = http;
        this.cdr = cdr;
        this.errorServ = errorServ;
      }
      ngOnInit() {
        this.chargeValues();
        this.images = this.currentProduct?.variants[this.currentVariant].images.map((x) => x.link) ?? [];
      }
      chargeValues() {
        this.loadFinishes();
      }
      loadFinishes() {
        this.http.getFinishes().subscribe({
          next: (val) => {
            this.finishes = val;
            this.prodFinishes = this.finishes.filter((x) => this.currentProduct.finish.filter((y) => y.finishId === x.id).length > 0) ?? [];
            this.charged = true;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorServ.addError(parseError(err));
          }
        });
      }
      variantChange(i) {
        this.currentVariant = i;
        this.images = this.currentProduct?.variants[this.currentVariant].images.map((x) => x.link) ?? [];
        this.selectedImage = 0;
        this.cdr.detectChanges();
      }
      selectImage(i) {
        this.selectedImage = i;
        this.cdr.detectChanges();
      }
      onClose() {
        this.close.emit();
      }
      static ctorParameters = () => [
        { type: ActivatedRoute },
        { type: httpService },
        { type: ChangeDetectorRef },
        { type: ErrorLogService }
      ];
      static propDecorators = {
        currentProduct: [{ type: Input, args: [{ required: true }] }],
        close: [{ type: Output }]
      };
    };
    ProductDetail = __decorate([
      Component({
        selector: "app-product-detail",
        imports: [CommonModule, CustomCurrencyPipe],
        providers: [CurrencyPipe],
        template: product_detail_default,
        styles: [product_detail_default2]
      })
    ], ProductDetail);
  }
});

export {
  ProductDetail,
  init_product_detail3 as init_product_detail
};
//# sourceMappingURL=chunk-PFESE2RF.js.map
