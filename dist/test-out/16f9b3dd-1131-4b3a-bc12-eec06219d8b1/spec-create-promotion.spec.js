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
import "./chunk-PS4KN3D7.js";
import {
  CommonModule,
  init_common
} from "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
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

// angular:jit:template:src\app\features\dashboard\promotions\create-promotion\create-promotion.html
var create_promotion_default;
var init_create_promotion = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\promotions\\create-promotion\\create-promotion.html"() {
    create_promotion_default = `<div class="main">\r
    @if (loading) {\r
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
    <form class="create-form" [formGroup]="createForm" (submit)="onSubmit()">\r
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
                <span class="count">{{createForm.value.description.length}}/500</span>\r
            </div>\r
            <div class="line"></div>\r
        </div>\r
\r
        <div class="form-text">\r
            <label for="">Tipo de promoci\xF3n</label>\r
            <div class="input-base" (click)="openTypeOption = !openTypeOption">\r
                <label for="">{{ !general? 'Por producto y categor\xEDa': 'General (toda la tienda)'}}</label>\r
                <img src="chevron-down.svg" alt="">\r
\r
\r
                @if(openTypeOption){\r
                <div class="dialog">\r
                    <div class="dialog-item" (click)="onChangePromotionType(false)">\r
                        <p>Por producto y categor\xEDa</p>\r
                    </div>\r
                    <div class="dialog-item" (click)="onChangePromotionType(true)">\r
                        <p>General (toda la tienda)</p>\r
                    </div>\r
                </div>\r
                }\r
\r
\r
            </div>\r
            <div class="line"></div>\r
        </div>\r
\r
        <div class="form-text">\r
            <label for="">Valor del descuento</label>\r
            <div class="discount">\r
                <div class="disc-btn" (click)="increment(1)">\r
                    <img src="plus-black.svg" alt="">\r
                </div>\r
                <div class="discount-txt">\r
                    <input type="number" formControlName="discount">\r
                    <span>%</span>\r
                </div>\r
                <div class="disc-btn" (click)="increment(-1)">\r
                    <img src="minus.svg" alt="">\r
                </div>\r
            </div>\r
            <div class="line"></div>\r
        </div>\r
\r
\r
\r
        <div class="form-text">\r
            <label for="">Fecha de inicio</label>\r
            <div class="input-base">\r
                <img src="calendar.svg" alt="" (click)="pickDate('startDate')">\r
                <input type="text" id="startDate" formControlName="startDate" placeholder="aaaa-mm-dd"\r
                    pattern="\\d{4}-\\d{2}-\\d{2}" required>\r
                <input type="date" id="" #startDateInput>\r
            </div>\r
            <div class="line"></div>\r
        </div>\r
\r
        <div class="form-text">\r
            <label for="">Fecha de finalizaci\xF3n</label>\r
            <div class="input-base">\r
                <img src="calendar.svg" alt="" (click)="pickDate('endDate')">\r
                <input type="text" id="endDate" formControlName="endDate" placeholder="aaaa-mm-dd">\r
                <input type="date" id="" #endDateInput>\r
            </div>\r
            <div class="line"></div>\r
        </div>\r
\r
        @if (!general) {\r
\r
        <div class="form-text">\r
            <label for="">Categor\xEDas</label>\r
            <div class="selection">\r
\r
                <div class="input-base" (click)="openCatOption = !openCatOption">\r
                    <label for="">Selecciona las categor\xEDas para esta promoci\xF3n</label>\r
                    <img src="chevron-down.svg" alt="">\r
                    @if(openCatOption){\r
                    <div class="dialog">\r
                        @for (cat of categories; track $index) {\r
                        <div class="dialog-item" (click)="general = false" (click)="onSelectCat(cat)">\r
                            <p>{{cat.nombre}}</p>\r
                            @if(cat.id in selectedCat){\r
                            <img src="check.svg">\r
                            }\r
                        </div>\r
                        }\r
                    </div>\r
                    }\r
                </div>\r
\r
                @for (selected of getCategories(); track $index) {\r
                <div class="input-base propierty">\r
                    <div class="finish-data">\r
                        <p>{{selected.nombre}}</p>\r
                    </div>\r
                    <img class="delete" src="divide-circle.svg" alt="delete" (click)="onRemoveCat(selected)">\r
\r
                </div>\r
                }\r
\r
            </div>\r
            <div class="line"></div>\r
        </div>\r
\r
        <div class="form-text">\r
            <label for="">Productos</label>\r
            <div class="selection">\r
\r
                <div class="input-base" (click)="onOpenSelProd()">\r
                    <label for="">Selecciona las productos para esta promoci\xF3n</label>\r
                    <img src="chevron-down.svg" alt="">\r
                    @if(openProdOption){\r
                    <div class="dialog products">\r
                        <div class="dialog-item">\r
                            <div class="input-base" (click)="$event.stopPropagation()">\r
                                <img src="search.svg" alt="" (click)="onSearch()">\r
                                <input type="text" formControlName="search" #searchProd placeholder="Buscar"\r
                                    (keydown.enter)="onSearch()" />\r
                            </div>\r
                        </div>\r
                        @for (prod of filteredProd; track $index) {\r
                        @for (variant of prod.variants; track $index) {\r
                        <div class="dialog-item" (click)=" $event.stopPropagation(); slelectProd(variant)">\r
                            <div class="image">\r
                                <img [src]="variant.image" alt="">\r
                            </div>\r
                            <p>{{prod.name}}</p>\r
                            @if (variant.id in selectedVariants) {\r
                            <img src="check.svg" alt="">\r
                            }\r
                        </div>\r
                        }\r
                        }\r
                    </div>\r
                    }\r
                </div>\r
\r
                @for (selected of getVariants(); track $index) {\r
                <div class="input-base propierty">\r
                    <div class="finish-data">\r
                        <div class="image">\r
                            <img [src]="selected.image" alt="">\r
                        </div>\r
                        <p>{{selected.genericProd?.name}}</p>\r
                    </div>\r
                    <img class="delete" src="divide-circle.svg" alt="delete" (click)="removeSelected(selected.id)">\r
\r
                </div>\r
                }\r
\r
            </div>\r
            <div class="line"></div>\r
        </div>\r
        }\r
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

// angular:jit:style:src\app\features\dashboard\promotions\create-promotion\create-promotion.css
var create_promotion_default2;
var init_create_promotion2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\promotions\\create-promotion\\create-promotion.css"() {
    create_promotion_default2 = "/* src/app/features/dashboard/promotions/create-promotion/create-promotion.css */\n.main {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  position: relative;\n}\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-inline: 32px;\n}\nh1 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 30px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 38px;\n  margin: 0px;\n}\n.form-text {\n  display: flex;\n  gap: 32px;\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-text label {\n  width: 360px;\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n}\n.input-base {\n  width: 512px;\n  box-sizing: border-box;\n}\n.create-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding-inline: 32px;\n}\ntextarea {\n  field-sizing: content;\n  resize: none;\n}\n.line {\n  position: absolute;\n  width: 100%;\n  bottom: -20px;\n  height: 1px;\n  align-self: stretch;\n  background: var(--Gray-200, #E9EAEB);\n}\n.count {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n}\n.input-base label,\n.input-base span {\n  display: flex;\n  flex: 1;\n  color: var(--Gray-500, #717680);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n.disc-btn {\n  display: flex;\n  padding: 10px;\n  cursor: pointer;\n}\n.disc-btn :hover {\n  cursor: pointer;\n}\n.discount {\n  display: flex;\n  width: 170px;\n  border-radius: 8px;\n  border: 1px solid var(--Gray-300, #D5D7DA);\n  background: var(--White, #FFF);\n  overflow: hidden;\n}\n.discount-txt {\n  display: flex;\n  padding: 10px;\n  flex: 1;\n  align-items: center;\n  gap: 10px;\n  background: var(--Gray-50, #FAFAFA);\n  border-inline: 1px solid #D5D7DA;\n}\n.discount-txt span {\n  color: var(--Gray-800, #252B37);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\ninput[type=number] {\n  background-color: #FAFAFA;\n  text-align: right;\n  width: 40px;\n}\ninput[type=date] {\n  opacity: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.input-base {\n  position: relative;\n}\n.image {\n  position: relative;\n  height: 40px;\n  aspect-ratio: 1;\n  overflow: hidden;\n}\n.image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  justify-self: center;\n}\n.dialog.products {\n  overflow: auto;\n  max-height: 600px;\n}\n.input-base.propierty {\n  border-color: #279EA8;\n}\n.finish-data {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex: 1;\n}\n.finish-data p {\n  margin: 0px;\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.avatar {\n  display: flex;\n  width: 28px;\n  height: 28px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.avatar img {\n  height: 100%;\n}\n.selection {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.form-footer {\n  display: flex;\n  justify-content: end;\n  gap: 12px;\n}\n.delete {\n  cursor: pointer;\n}\n/*# sourceMappingURL=create-promotion.css.map */\n";
  }
});

// src/app/shared/validators/DateValidator.ts
function fechaRealValidator(control) {
  const value = control.value;
  if (!value)
    return null;
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)) {
    return { formatoInvalido: true };
  }
  const [year, month, day] = value.split("-").map(Number);
  const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const esBisiesto = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  if (esBisiesto)
    diasPorMes[1] = 29;
  if (day > diasPorMes[month - 1]) {
    return { fechaInvalida: true };
  }
  return null;
}
var init_DateValidator = __esm({
  "src/app/shared/validators/DateValidator.ts"() {
    "use strict";
  }
});

// src/app/shared/models/promotions.ts
var PromoType;
var init_promotions = __esm({
  "src/app/shared/models/promotions.ts"() {
    "use strict";
    (function(PromoType2) {
      PromoType2["prodCat"] = "Por producto y categor\xEDa";
      PromoType2["general"] = "General";
    })(PromoType || (PromoType = {}));
  }
});

// src/app/features/dashboard/promotions/create-promotion/create-promotion.ts
var CreatePromotion;
var init_create_promotion3 = __esm({
  "src/app/features/dashboard/promotions/create-promotion/create-promotion.ts"() {
    "use strict";
    init_tslib_es6();
    init_create_promotion();
    init_create_promotion2();
    init_common();
    init_core();
    init_forms();
    init_DateValidator();
    init_http_service();
    init_router();
    init_promotions();
    init_box_loader();
    init_error_log_service();
    init_errorParser();
    CreatePromotion = class CreatePromotion2 {
      fb;
      cdr;
      http;
      router;
      route;
      errorServ;
      createForm;
      endDateInput;
      startDateInput;
      loading = false;
      general = false;
      openTypeOption = false;
      openCatOption = false;
      openProdOption = false;
      products = [];
      categories = [];
      selectedCat = {};
      selectedVariants = {};
      filteredProd = [];
      edit;
      constructor(fb, cdr, http, router, route, errorServ) {
        this.fb = fb;
        this.cdr = cdr;
        this.http = http;
        this.router = router;
        this.route = route;
        this.errorServ = errorServ;
        this.createForm = fb.group({
          name: ["", [Validators.required]],
          description: ["", [Validators.required, Validators.maxLength(500)]],
          discount: [0, [Validators.required, Validators.min(0.01)]],
          startDate: ["", [Validators.required, fechaRealValidator]],
          endDate: ["", [Validators.required, fechaRealValidator]],
          search: [""]
        });
      }
      ngOnInit() {
        this.createForm.get("search")?.valueChanges.subscribe((x) => {
          this.filteredProd = this.products.filter((prod) => this.match(prod.name, x));
        });
        this.loadData();
        let id = this.route.snapshot.queryParamMap.get("edit");
        if (id) {
          this.loadPromo(id);
        }
      }
      loadPromo(id) {
        this.http.getPromotion(id).subscribe({
          next: (val) => {
            this.edit = val;
            let startDate = new Date(this.edit.startDate);
            console.log(startDate);
            let endDate = new Date(this.edit.endDate);
            this.createForm.setValue({
              name: this.edit.name,
              description: this.edit.description,
              discount: this.edit.discount,
              startDate: this.convertToDate(startDate),
              endDate: this.convertToDate(endDate),
              search: [""]
            });
            this.general = this.edit.Type == PromoType.general;
            console.log(val);
            this.edit.products.forEach((x) => this.selectedVariants[x.productId] = x.product);
            this.edit.categories.forEach((x) => this.selectedCat[x.categoryId] = x.category);
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorServ.addError(parseError(err));
          }
        });
      }
      ngAfterViewInit() {
        this.endDateInput.nativeElement.addEventListener("change", (event) => {
          this.createForm.get("endDate")?.setValue(event.target.value.toString());
        });
        this.startDateInput.nativeElement.addEventListener("change", (event) => {
          this.createForm.get("startDate")?.setValue(event.target.value.toString());
        });
      }
      loadData() {
        this.loading = true;
        this.http.getCategories().subscribe({
          next: (val) => {
            this.categories = val;
            this.loadProd();
          },
          error: (err) => {
            this.loading = false;
            this.cdr.detectChanges();
            this.errorServ.addError(parseError(err));
          }
        });
      }
      loadProd() {
        this.http.getProducts().subscribe({
          next: (val) => {
            this.products = val.products;
            this.filteredProd = this.products;
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.loading = false;
            this.cdr.detectChanges();
            this.errorServ.addError(parseError(err));
          }
        });
      }
      pickDate(field) {
        if (field === "startDate") {
          this.startDateInput.nativeElement.showPicker();
        } else {
          this.endDateInput.nativeElement.showPicker();
        }
      }
      increment(n) {
        const current = this.createForm.value.discount + n;
        if (current < 0)
          return;
        this.createForm.get("discount")?.setValue(current);
      }
      onSubmit() {
        if (this.valid()) {
          let StartDate = this.crearFechaConOffsetLocal(this.createForm.get("startDate")?.value);
          let endDate = this.crearFechaConOffsetLocal(this.createForm.get("endDate")?.value);
          const data = {
            startDate: StartDate,
            endDate,
            name: this.createForm.value.name,
            discountType: "percent",
            Type: this.general ? PromoType.general : PromoType.prodCat,
            categories: this.getCategories().map((x) => x.id),
            products: this.getVariants().map((x) => x.id),
            discount: this.createForm.value.discount,
            description: this.createForm.value.description
          };
          if (this.edit) {
            this.loading = true;
            this.http.updatePromo(this.edit.promo_id, data).subscribe({
              next: (val) => {
                this.loading = false;
                this.router.navigate(["dashboard/promotions"]);
              },
              error: (err) => {
                this.loading = false;
                this.errorServ.addError(parseError(err));
              }
            });
            return;
          }
          this.loading = true;
          this.http.createPromo(data).subscribe({
            next: (val) => {
              this.loading = false;
              this.router.navigate(["dashboard/promotions"]);
            },
            error: (err) => {
              this.loading = false;
              this.errorServ.addError(parseError(err));
            }
          });
        }
      }
      onSearch() {
      }
      slelectProd(prod) {
        this.selectedVariants[prod.id] = prod;
      }
      getVariants() {
        return Object.values(this.selectedVariants);
      }
      getCategories() {
        return Object.values(this.selectedCat);
      }
      removeSelected(id) {
        delete this.selectedVariants[id];
      }
      valid() {
        return this.createForm.valid && this.getVariants().length > 0;
      }
      onSelectCat(cat) {
        this.selectedCat[cat.id] = cat;
        this.products.forEach((x) => {
          if (x.category.id = cat.id) {
            x.variants.forEach((variant) => this.selectedVariants[variant.id] = variant);
          }
        });
      }
      onRemoveCat(cat) {
        delete this.selectedCat[cat.id];
        this.getVariants().forEach((x) => {
          if (x.genericProd.category.id = cat.id) {
            delete this.selectedVariants[x.id];
            this.cdr.detectChanges();
          }
        });
      }
      onChangePromotionType(general) {
        this.general = general;
        this.selectedCat = {};
        this.selectedVariants = {};
        if (general)
          this.products.forEach((x) => x.variants.forEach((y) => this.selectedVariants[y.id] = y));
      }
      onOpenSelProd() {
        this.openProdOption = !this.openProdOption;
      }
      onSearhValue(nuevoValor) {
        console.log("Valor cambiado:", nuevoValor);
      }
      match(x, y) {
        x = x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        y = y.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return x.match(y);
      }
      crearFechaConOffsetLocal(fechaString) {
        const [year, month, day] = fechaString.split("-").map(Number);
        const fechaLocal = new Date(year, month - 1, day, 12, 0, 0);
        return fechaLocal;
      }
      convertToDate(date) {
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1 + 100).toString().slice(1);
        let day = (date.getDate() + 100).toString().slice(1);
        return year + "-" + month + "-" + day;
      }
      static ctorParameters = () => [
        { type: FormBuilder },
        { type: ChangeDetectorRef },
        { type: httpService },
        { type: Router },
        { type: ActivatedRoute },
        { type: ErrorLogService }
      ];
      static propDecorators = {
        endDateInput: [{ type: ViewChild, args: ["endDateInput"] }],
        startDateInput: [{ type: ViewChild, args: ["startDateInput"] }]
      };
    };
    CreatePromotion = __decorate([
      Component({
        selector: "app-create-promotion",
        imports: [ReactiveFormsModule, CommonModule, BoxLoader, RouterLink],
        template: create_promotion_default,
        styles: [create_promotion_default2]
      })
    ], CreatePromotion);
  }
});

// src/app/features/dashboard/promotions/create-promotion/create-promotion.spec.ts
var require_create_promotion_spec = __commonJS({
  "src/app/features/dashboard/promotions/create-promotion/create-promotion.spec.ts"(exports) {
    init_testing();
    init_create_promotion3();
    describe("CreatePromotion", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CreatePromotion]
        }).compileComponents();
        fixture = TestBed.createComponent(CreatePromotion);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_create_promotion_spec();
//# sourceMappingURL=spec-create-promotion.spec.js.map
