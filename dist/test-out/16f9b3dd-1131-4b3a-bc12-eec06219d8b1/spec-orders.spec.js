import {
  OrderDetails,
  OrderState,
  init_Order,
  init_order_details
} from "./chunk-JWDBKLCA.js";
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
  CurrencyPipe,
  NgClass,
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

// angular:jit:template:src\app\features\dashboard\orders\orders.html
var orders_default;
var init_orders = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\orders\\orders.html"() {
    orders_default = `<div class="orders-main">\r
\r
    @if (loading) {\r
    <div class="loader-wrapper">\r
        <app-box-loader message="Cargando pedidos..."></app-box-loader>\r
    </div>\r
    }\r
\r
\r
    @if(openOrder){\r
    <div class="ord-detail">\r
        <app-order-details [order]="openOrder" (close)="openOrder = undefined"></app-order-details>\r
    </div>\r
    }\r
    <header class="ord-header">\r
        <h1>Pedidos</h1>\r
        <div class="ord-actions">\r
            <button class="button-chips">\r
                <img src="upload-cloud.svg" alt="">\r
                <label>\r
                    Importar\r
                </label>\r
            </button>\r
\r
        </div>\r
    </header>\r
\r
    <div class="filters">\r
        @for (fil of filters; track $index) {\r
        <div class="button-chips">\r
            <label>\r
                {{fil}}\r
            </label>\r
            <img src="x.svg" alt="" (click)="onDeleteFilter(fil)">\r
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
                @for (filter of ['M\xE1s recientes', 'Antiguos', 'Realizado', 'Pendiente', 'Cancelado']; track $index) {\r
                <div class="dropdown-item"\r
                    (click)="['Realizado', 'Pendiente', 'Cancelado'].includes(filter) ? onStateFilter(filter) : onOrderBy(filter == 'M\xE1s recientes'? 2 : 1)">\r
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
\r
    </div>\r
\r
    <div class="ord-container">\r
        <header class="order-list-header">\r
            <h2>Pedidos</h2>\r
            <div class="count">\r
                <p>{{count}} pedidos</p>\r
            </div>\r
        </header>\r
\r
        <div class="head-bar">\r
            @for (item of ['N\xBA pedido', 'Fecha', 'Total', 'Tipo de entrega', 'Estado']; track\r
            $index) {\r
            <div [className]="\`column \${item === '' ? 'action' : item.toLowerCase()}\`">\r
\r
                <div [className]="\`head-bar-item \${item === '' ? 'action' : item.toLowerCase()}\`">\r
                    <p>{{item}}</p>\r
                </div>\r
                @for (ord of orders; track $index) {\r
                <div [className]="\`product-item \${item === '' ? 'action' : item.toLowerCase()}\`"\r
                    (click)="onOpenOrder(ord)">\r
\r
                    @if (item === 'N\xBA pedido') {\r
                    <p>{{ord.id}}</p>\r
                    }\r
                    @if (item === 'Fecha') {\r
                    <p>{{getDate(ord)}}</p>\r
                    }\r
                    @if (item === 'Total') {\r
                    <p>{{ord.price + ord.delPrice | currency}}</p>\r
                    }\r
                    @if (item === 'Tipo de entrega') {\r
                    <p>{{ord.delivery? 'A domicilio': 'Retiro en tienda'}}</p>\r
                    }\r
                    @if (item === 'Estado') {\r
                    <div class="input-txt"\r
                        [ngClass]="{'pending': states.pending == ord.state, 'completed': states.completed == ord.state, 'canceled': states.canceled == ord.state}">\r
                        <img [src]=" states.completed==ord.state ? 'check.svg': states.canceled == ord.state? 'x-red.svg': 'clock.svg'"\r
                            alt="">\r
                        <span>{{ord.state}}</span>\r
                    </div>\r
                    }\r
                </div>\r
                }\r
\r
\r
            </div>\r
            }\r
        </div>\r
    </div>\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\orders\orders.css
var orders_default2;
var init_orders2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\orders\\orders.css"() {
    orders_default2 = "/* src/app/features/dashboard/orders/orders.css */\n.orders-main {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  position: relative;\n}\n.ord-detail {\n  position: absolute;\n  z-index: 1;\n  width: calc(100% - 40px);\n  left: 20px;\n  height: 100%;\n  object-position: center;\n  box-sizing: border-box;\n}\n.ord-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-inline: 32px;\n}\n.ord-actions {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\nh1 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 30px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 38px;\n  margin: 0px;\n}\n.filters {\n  display: flex;\n  gap: 12px;\n  padding-inline: 32px;\n}\n.order-list-header {\n  display: flex;\n  align-items: center;\n  padding: 20px 24px;\n  gap: 8px;\n}\n.order-list-header h2 {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 28px;\n  margin: 0px;\n}\n.order-list-header p {\n  color: var(--Brand-700, #007981);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  margin: 0px;\n}\n.ord-container {\n  margin-inline: 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: stretch;\n  border-radius: 12px;\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--White, #FFF);\n  box-shadow: 0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px 0 rgba(10, 13, 18, 0.06);\n}\n.count {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Brand-50, #F0FEFF);\n}\n.head-bar {\n  display: flex;\n  align-items: flex-start;\n  align-self: stretch;\n}\n.head-bar-item {\n  display: flex;\n  flex: 1;\n  height: 44px;\n  padding: 12px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--Gray-50, #FAFAFA);\n  box-sizing: border-box;\n}\n.head-bar-item.action {\n  min-height: 44px;\n}\n.head-bar p {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  margin: 0px;\n}\n.column {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.column.nombre {\n  min-width: 312px;\n}\n.column.action {\n  flex: none;\n  width: 160px;\n}\n.column.categor\\ed a {\n  width: 225px;\n  flex: none;\n}\n.product-item {\n  display: flex;\n  height: 72px;\n  padding: 16px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.action-button {\n  border: none;\n  background: none;\n  padding: 10px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.status {\n  display: flex;\n  padding: 2px 8px 2px 6px;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  border-radius: 16px;\n  background: var(--Success-50, #ECFDF3);\n}\n.category {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Gray-100, #F5F5F5);\n}\n.status p {\n  color: var(--Success-700, #027A48);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n}\n.pagination {\n  display: flex;\n  padding: 12px 24px 16px 24px;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n  border: 0 solid var(--Gray-200, #E9EAEB);\n}\n.pages {\n  display: flex;\n}\n.page {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  box-sizing: border-box;\n  padding: 12px;\n}\n.page label {\n  color: var(--Gray-500, #717680);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.filters-dorp-menu {\n  position: relative;\n}\n.dropdown-content {\n  display: flex;\n  width: 292px;\n  position: absolute;\n  background-color: var(--White, #FFF);\n  min-width: 160px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n  z-index: 1;\n  top: 48px;\n  left: 0;\n  flex-direction: column;\n  padding: 8px 0;\n}\n.dropdown-item {\n  display: flex;\n  padding: 10px 14px;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n  cursor: pointer;\n}\n.dropdown-item p {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 24px;\n  margin: 0px;\n}\n.page.active {\n  background: #F0FEFF;\n}\n.page.active label {\n  color: var(--Brand-900, #175659);\n}\n.input-txt {\n  text-align: center;\n  display: flex;\n  gap: 4px;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n}\n.input-txt.completed {\n  background: var(--Success-50, #ECFDF3);\n  color: var(--Success-700, #027A48);\n}\n.input-txt.pending {\n  color: #B54708;\n  background: var(--Warning-50, #FFFAEB);\n}\n.input-txt.canceled {\n  color: #B42318;\n  background: var(--Error-50, #FEF3F2);\n}\n/*# sourceMappingURL=orders.css.map */\n";
  }
});

// src/app/features/dashboard/orders/orders.ts
var Orders;
var init_orders3 = __esm({
  "src/app/features/dashboard/orders/orders.ts"() {
    "use strict";
    init_tslib_es6();
    init_orders();
    init_orders2();
    init_core();
    init_router();
    init_http_service();
    init_Order();
    init_common();
    init_order_details();
    init_error_log_service();
    init_errorParser();
    init_box_loader();
    Orders = class Orders2 {
      router;
      route;
      http;
      cdr;
      errorServ;
      filterMenu = false;
      stateParser = [OrderState.canceled, OrderState.completed, OrderState.pending];
      count = 0;
      orders = [];
      orderOpen = true;
      openOrder;
      options = {};
      search;
      filters = [];
      querySub;
      states = OrderState;
      constructor(router, route, http, cdr, errorServ) {
        this.router = router;
        this.route = route;
        this.http = http;
        this.cdr = cdr;
        this.errorServ = errorServ;
      }
      ngOnInit() {
        this.querySub = this.route.queryParams.subscribe((x) => this.loadQuerys());
      }
      loadQuerys() {
        this.filters = [];
        const order = this.route.snapshot.queryParamMap.get("order");
        this.options.order = order == "1" ? 1 : order == "2" ? 2 : void 0;
        if (this.options.order)
          this.filters.push(this.options.order == 2 ? "M\xE1s recientes" : "Antiguos");
        const search = this.route.snapshot.queryParamMap.get("search");
        this.options.search = search ?? void 0;
        if (this.options.search)
          this.filters.push(this.options.search);
        const state = this.route.snapshot.queryParamMap.get("state");
        this.options.state = state ?? void 0;
        if (state) {
          state.split("-").map((x) => this.filters.push(this.stateParser[x]));
        }
        this.readData();
      }
      onDeleteFilter(filter) {
        if (["Realizado", "Pendiente", "Cancelado"].includes(filter)) {
          const states = this.options.state.split("-").map((x) => x);
          const toDelete = this.stateParser.indexOf(filter);
          var resultString = "";
          for (let index = 0; index < states.length; index++) {
            if (states[index] == toDelete)
              continue;
            if (index != 0)
              resultString += resultString.length > 0 ? "-" : "";
            resultString += states[index];
          }
          this.options.state = resultString;
        } else if (["M\xE1s recientes", "Antiguos"].includes(filter))
          this.options.order = void 0;
        else
          this.options.search = void 0;
        this.router.navigate(["dashboard", "orders"], {
          queryParams: this.options
        });
      }
      readData() {
        this.loading = true;
        this.http.getOrders(this.options).subscribe({
          next: (val) => {
            this.orders = val;
            console.log(this.orders);
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
      onOpenOrder(order) {
        this.openOrder = order;
        this.orderOpen = true;
      }
      onStateFilter(state) {
        const states = this.options.state;
        if (states?.split("-").includes(this.stateParser.indexOf(state).toString()))
          return;
        const params = {
          search: this.options.search,
          order: this.options.order,
          state: this.options.state ? this.options.state + `-${this.stateParser.indexOf(state)}` : `${this.stateParser.indexOf(state)}`
        };
        this.router.navigate(["dashboard", "orders"], {
          queryParams: params
        });
      }
      onOrderBy(orderBy) {
        this.options.order = orderBy;
        const params = {
          search: this.options.search,
          order: this.options.order,
          state: this.options.state
        };
        this.router.navigate(["dashboard", "orders"], {
          queryParams: params
        });
      }
      loading = false;
      onSearch() {
        const search = this.search.nativeElement.value;
        const params = {
          search,
          order: this.options.order,
          state: this.options.state
        };
        this.router.navigate(["dashboard", "orders"], {
          queryParams: params
        });
      }
      getDate(ord) {
        const date = new Date(ord.createdAt);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
      }
      static ctorParameters = () => [
        { type: Router },
        { type: ActivatedRoute },
        { type: httpService },
        { type: ChangeDetectorRef },
        { type: ErrorLogService }
      ];
      static propDecorators = {
        search: [{ type: ViewChild, args: ["search"] }]
      };
    };
    Orders = __decorate([
      Component({
        selector: "app-orders",
        imports: [CurrencyPipe, OrderDetails, NgClass, BoxLoader],
        template: orders_default,
        styles: [orders_default2]
      })
    ], Orders);
  }
});

// src/app/features/dashboard/orders/orders.spec.ts
var require_orders_spec = __commonJS({
  "src/app/features/dashboard/orders/orders.spec.ts"(exports) {
    init_testing();
    init_orders3();
    describe("Orders", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Orders]
        }).compileComponents();
        fixture = TestBed.createComponent(Orders);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_orders_spec();
//# sourceMappingURL=spec-orders.spec.js.map
