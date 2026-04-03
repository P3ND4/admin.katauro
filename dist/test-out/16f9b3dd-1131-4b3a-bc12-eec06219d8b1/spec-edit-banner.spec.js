import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  init_forms
} from "./chunk-AZY7CR4A.js";
import {
  httpService,
  init_errorParser,
  init_http_service,
  parseError
} from "./chunk-QFLJSFW5.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  init_router
} from "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
import {
  BoxLoader,
  init_box_loader
} from "./chunk-FQQDYBZG.js";
import {
  DragAndDrop,
  init_drag_and_drop
} from "./chunk-ODCXZD6S.js";
import "./chunk-YLGU4GEO.js";
import "./chunk-PS4KN3D7.js";
import "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
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

// angular:jit:template:src\app\features\dashboard\promotions\edit-banner\edit-banner.html
var edit_banner_default;
var init_edit_banner = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\promotions\\edit-banner\\edit-banner.html"() {
    edit_banner_default = `<div class="main">\r
  @if (loading()) {\r
  <div class="loader-wrapper">\r
    <app-box-loader></app-box-loader>\r
  </div>\r
  }\r
\r
\r
  <header class="header">\r
    <h1>Promociones</h1>\r
  </header>\r
\r
\r
  <form class="create-form" [formGroup]="editForm" (submit)="onSubmit()">\r
    <div class="form-text">\r
      <label for="">Nombre</label>\r
      <div class="input-base">\r
        <input type="text" formControlName="name">\r
      </div>\r
      <div class="line"></div>\r
    </div>\r
\r
    <div class="form-text">\r
      <label for="">Descripci\xF3n breve</label>\r
      <div class="input-container">\r
        <div class="input-base">\r
          <textarea type="text" formControlName="description" maxlength="500"></textarea>\r
        </div>\r
        <span class="count">{{editForm.value.description.length}}/500</span>\r
      </div>\r
      <div class="line"></div>\r
    </div>\r
\r
    <div class="form-text">\r
      <label for="">Productos</label>\r
      <div class="input-base" (click)="onOpenSelProd()">\r
        @if(selectedVariant){\r
        <div class="image"><img [src]="selectedVariant.image" alt=""></div>\r
        <label for="">{{selectedVariant.genericProd?.name}}</label>\r
        @if(calculateDiscount(selectedVariant)){\r
        <div class="discount">-{{calculateDiscount(selectedVariant) }} %</div>\r
        }\r
        }@else {\r
        <label for="">Selecciona las productos para esta promoci\xF3n</label>\r
        }\r
        <img src="chevron-down.svg" alt="">\r
        @if(openProdOption){\r
        <div class="dialog products">\r
          <div class="dialog-item">\r
            <div class="input-base" (click)="$event.stopPropagation()">\r
              <img src="search.svg" alt="">\r
              <input type="text" formControlName="search" #searchProd placeholder="Buscar" />\r
            </div>\r
          </div>\r
          @for (prod of filteredProd; track $index) {\r
          @for (variant of prod.variants; track $index) {\r
          <div class="dialog-item" (click)=" $event.stopPropagation(); slelectProd(variant)">\r
            <div class="image">\r
              <img [src]="variant.image" alt="">\r
            </div>\r
            <div class="data">\r
              <p>{{prod.name}}</p>\r
              @for (prom of filterActivePromotions(variant.promotions); track $index) {\r
              <span>{{prom.name}}</span>\r
              <div class="discount">-{{prom.discount + ' ' + (prom.discountType == 'percent'? '%':\r
                '$')}} </div>\r
              }\r
            </div>\r
            @if (variant.id == selectedVariant?.id) {\r
            <img src="check.svg" alt="">\r
            }\r
          </div>\r
          }\r
          }\r
        </div>\r
        }\r
      </div>\r
      <div class="line"></div>\r
    </div>\r
\r
    <div class="form-text">\r
      <label for="">Banner</label>\r
      <div class="image-container">\r
        <app-drag-and-drop style="width: 100%;" (uploaded)="onUploaded($event.valueOf())"></app-drag-and-drop>\r
        @if (editForm.get('image')?.value) {\r
        <div class="banner-prev">\r
          <img [src]="editForm.get('image')?.value" alt="">\r
        </div>\r
        }\r
      </div>\r
\r
      <div class="line"></div>\r
    </div>\r
\r
\r
\r
    <footer class="form-footer">\r
      <button class="button-chips" type="button" [routerLink]="'/dashboard/promotions'">\r
        <span>Cancelar</span>\r
      </button>\r
\r
      <button class="button-base" type="submit" [disabled]="!valid()">\r
        <span>Guardar</span>\r
      </button>\r
\r
    </footer>\r
  </form>\r
\r
\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\promotions\edit-banner\edit-banner.css
var edit_banner_default2;
var init_edit_banner2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\promotions\\edit-banner\\edit-banner.css"() {
    edit_banner_default2 = "/* src/app/features/dashboard/promotions/edit-banner/edit-banner.css */\n.main {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  position: relative;\n}\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-inline: 32px;\n}\nh1 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 30px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 38px;\n  margin: 0px;\n}\n.form-text {\n  display: flex;\n  gap: 32px;\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-text label {\n  width: 360px;\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n}\n.input-base {\n  width: 512px;\n  box-sizing: border-box;\n}\n.create-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding-inline: 32px;\n}\ntextarea {\n  field-sizing: content;\n  resize: none;\n}\n.line {\n  position: absolute;\n  width: 100%;\n  bottom: -20px;\n  height: 1px;\n  align-self: stretch;\n  background: var(--Gray-200, #E9EAEB);\n}\n.count {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n}\n.input-base label,\n.input-base span {\n  display: flex;\n  flex: 1;\n  color: var(--Gray-500, #717680);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n.disc-btn {\n  display: flex;\n  padding: 10px;\n  cursor: pointer;\n}\n.disc-btn :hover {\n  cursor: pointer;\n}\n.discount {\n  display: flex;\n  width: 170px;\n  border-radius: 8px;\n  border: 1px solid var(--Gray-300, #D5D7DA);\n  background: var(--White, #FFF);\n  overflow: hidden;\n}\n.discount-txt {\n  display: flex;\n  padding: 10px;\n  flex: 1;\n  align-items: center;\n  gap: 10px;\n  background: var(--Gray-50, #FAFAFA);\n  border-inline: 1px solid #D5D7DA;\n}\n.discount-txt span {\n  color: var(--Gray-800, #252B37);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\ninput[type=number] {\n  background-color: #FAFAFA;\n  text-align: right;\n  width: 40px;\n}\ninput[type=date] {\n  opacity: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.input-base {\n  position: relative;\n}\n.image {\n  position: relative;\n  height: 40px;\n  aspect-ratio: 1;\n  overflow: hidden;\n}\n.image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  justify-self: center;\n}\n.dialog.products {\n  overflow: auto;\n  max-height: 600px;\n}\n.input-base.propierty {\n  border-color: #279EA8;\n}\n.finish-data {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex: 1;\n}\n.finish-data p {\n  margin: 0px;\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.avatar {\n  display: flex;\n  width: 28px;\n  height: 28px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.avatar img {\n  height: 100%;\n}\n.selection {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.form-footer {\n  display: flex;\n  justify-content: end;\n  gap: 12px;\n}\n.delete {\n  cursor: pointer;\n}\n.data {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.discount {\n  background-color: #FEF3F2;\n  color: #B42318;\n  font-family: var(--montser-font);\n  border: initial;\n  display: flex;\n  width: fit-content;\n  padding-inline: 8px;\n  justify-content: center;\n}\n.dialog-item {\n  align-items: start;\n  border-top: 0.5px solid lightgray;\n}\n.dialog-item:hover {\n  cursor: pointer;\n}\n.image-container {\n  display: flex;\n  width: 512px;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n}\n.banner-prev {\n  display: flex;\n  width: 512px;\n  height: 199.111px;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 3.556px;\n  overflow: hidden;\n}\n.banner-prev img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n/*# sourceMappingURL=edit-banner.css.map */\n";
  }
});

// src/app/features/dashboard/promotions/edit-banner/edit-banner.ts
var EditBanner;
var init_edit_banner3 = __esm({
  "src/app/features/dashboard/promotions/edit-banner/edit-banner.ts"() {
    "use strict";
    init_tslib_es6();
    init_edit_banner();
    init_edit_banner2();
    init_core();
    init_box_loader();
    init_forms();
    init_http_service();
    init_errorParser();
    init_error_log_service();
    init_router();
    init_drag_and_drop();
    EditBanner = class EditBanner2 {
      router;
      route;
      fb;
      http;
      cdr;
      errorServ;
      loadProd = true;
      loadingBanner = true;
      openProdOption = false;
      editForm;
      currentBanner;
      filteredProd = [];
      selectedVariant;
      constructor(router, route, fb, http, cdr, errorServ) {
        this.router = router;
        this.route = route;
        this.fb = fb;
        this.http = http;
        this.cdr = cdr;
        this.errorServ = errorServ;
        this.editForm = fb.group({
          name: ["", Validators.required],
          description: ["", Validators.required],
          search: [""],
          image: ["", Validators.required],
          prodID: ["", Validators.required],
          publicID: ["", Validators.required]
        });
      }
      products = [];
      id = void 0;
      ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");
        this.id = id ? +id : void 0;
        this.editForm.get("search")?.valueChanges.subscribe((x) => {
          this.filteredProd = this.products.filter((prod) => this.match(prod.name, x));
        });
        this.loadData();
      }
      onSubmit() {
        if (this.valid() && this.currentBanner) {
          this.loadingBanner = true;
          const dto = {
            name: this.editForm.get("name")?.value,
            description: this.editForm.get("description")?.value,
            prodId: this.editForm.get("prodID")?.value,
            image: this.editForm.get("image")?.value,
            carouselId: this.currentBanner.carouselId,
            publicId: this.editForm.get("publicID")?.value
          };
          this.http.updateBanner(dto, this.currentBanner.id).subscribe({
            next: (val) => {
              this.loadingBanner = false;
              this.router.navigate(["/dashboard/promotions"]);
            },
            error: (err) => this.errorServ.addError(parseError(err))
          });
        }
      }
      slelectProd(variant) {
        this.selectedVariant = variant;
        this.editForm.get("prodID")?.setValue(variant.id);
        this.openProdOption = !this.openProdOption;
      }
      onUploaded(imageUrl) {
        let image = imageUrl;
        this.editForm.get("image")?.setValue(image.secure_url);
        this.editForm.get("publicID")?.setValue(image.public_id);
        console.log(image);
      }
      onOpenSelProd() {
        this.openProdOption = !this.openProdOption;
      }
      loadData() {
        this.loadProd = true;
        this.loadBanner();
        this.http.getProducts().subscribe({
          next: (val) => {
            this.products = val.products;
            this.filteredProd = this.products;
            this.loadProd = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.loadProd = false;
            this.cdr.detectChanges();
            this.errorServ.addError(parseError(err));
          }
        });
      }
      loadBanner() {
        if (this.id) {
          this.loadingBanner = true;
          this.http.getBanner(this.id).subscribe({
            next: (val) => {
              this.currentBanner = val;
              console.log(val);
              this.editForm.setValue({
                name: this.currentBanner.name,
                description: this.currentBanner.description,
                image: this.currentBanner.image,
                prodID: this.currentBanner.prodId,
                search: "",
                publicID: this.currentBanner.publicId
              });
              this.selectedVariant = this.currentBanner.product;
              this.loadingBanner = false;
              this.cdr.detectChanges();
            },
            error: (err) => {
              this.errorServ.addError(parseError(err));
              this.loadingBanner = false;
            }
          });
        }
      }
      valid() {
        return this.editForm.valid;
      }
      match(x, y) {
        x = x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        y = y.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return x.match(y);
      }
      calculateDiscount(prod) {
        const percentD = prod.promotions.filter((x) => x.promotion.discountType == "percent");
        const discount = this.filterActivePromotions(percentD).map((x) => x.discount);
        return discount.reduce((count, current) => count + current, 0);
      }
      filterActivePromotions(promos) {
        const now = /* @__PURE__ */ new Date();
        let filters = promos.filter((x) => new Date(x.promotion.endDate) > now && new Date(x.promotion.startDate) < now).map((x) => x.promotion);
        return filters;
      }
      loading = () => this.loadingBanner || this.loadProd;
      static ctorParameters = () => [
        { type: Router },
        { type: ActivatedRoute },
        { type: FormBuilder },
        { type: httpService },
        { type: ChangeDetectorRef },
        { type: ErrorLogService }
      ];
    };
    EditBanner = __decorate([
      Component({
        selector: "app-edit-banner",
        imports: [BoxLoader, ReactiveFormsModule, DragAndDrop, RouterLink],
        template: edit_banner_default,
        styles: [edit_banner_default2]
      })
    ], EditBanner);
  }
});

// src/app/features/dashboard/promotions/edit-banner/edit-banner.spec.ts
var require_edit_banner_spec = __commonJS({
  "src/app/features/dashboard/promotions/edit-banner/edit-banner.spec.ts"(exports) {
    init_testing();
    init_edit_banner3();
    describe("EditBanner", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [EditBanner]
        }).compileComponents();
        fixture = TestBed.createComponent(EditBanner);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_edit_banner_spec();
//# sourceMappingURL=spec-edit-banner.spec.js.map
