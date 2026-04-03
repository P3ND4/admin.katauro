import {
  httpService,
  init_errorParser,
  init_http_service,
  parseError
} from "./chunk-QFLJSFW5.js";
import {
  BoxLoader,
  init_box_loader
} from "./chunk-FQQDYBZG.js";
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

// angular:jit:template:src\app\features\dashboard\orders\order-details\order-details.html
var order_details_default;
var init_order_details = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\orders\\order-details\\order-details.html"() {
    order_details_default = `<div class="main">\r
    @if (loading) {\r
    <div class="loader-wrapper">\r
        <app-box-loader [message]="'Actualizando...'"></app-box-loader>\r
    </div>\r
    }\r
\r
\r
    <div class="details-main">\r
        <div class="cross" (click)="onClose()">\r
            <img src="x.svg" alt="">\r
        </div>\r
        <div class="head-container">\r
            <header class="details-header">\r
                <div class="id">\r
                    <p>\r
                        Pedido <span>{{order?.id}}</span>\r
                    </p>\r
                    <span class="date">Realizado el {{getDate()}}</span>\r
                </div>\r
                <div class="actions">\r
                    <div class="input-content drop" style="position: relative;"\r
                        (click)=" states.canceled == order?.state? '' : isDropdownOpen = !isDropdownOpen  ;">\r
                        <span class="input-txt"\r
                            [ngClass]="{'canceled': states.canceled == order?.state, 'completed': states.completed == order?.state, 'pending': states.pending == order?.state}">\r
                            {{order?.state}}\r
                        </span>\r
                        <img src="chevron-down.svg" alt="">\r
                        <div class="drop-down" [ngClass]="{'closed': !isDropdownOpen}">\r
                            @for (state of [states.canceled, states.pending, states.completed]; track $index) {\r
                            <div class="drop-item" (click)="changeState(state)">\r
                                <span class="input-txt" [ngClass]=" {'canceled': states.canceled==state, 'completed' :\r
                                    states.completed==state, 'pending' : states.pending==state}">\r
                                    <img [src]=" states.completed==state ? 'check.svg': states.canceled == state? 'x-red.svg': 'clock.svg'"\r
                                        alt="">\r
                                    {{state}}\r
                                </span>\r
                            </div>\r
                            }\r
                        </div>\r
                    </div>\r
                    <div class="button-chips">\r
                        <img src="upload-cloud.svg" alt="">\r
                        <span>Reenviar email</span>\r
                    </div>\r
                </div>\r
            </header>\r
        </div>\r
\r
        <div class="order">\r
            <div class="products">\r
                <h3>Resumen de pago</h3>\r
                <div class="order-summary">\r
                    @for (order of order?.products; track $index) {\r
                    <div class="variant">\r
                        <div class="image">\r
                            <img [src]="order.product.image" alt="">\r
                        </div>\r
                        <div class="prod-details">\r
\r
                            <span class="p-name">\r
                                {{order.product.genericProd?.name}}\r
                            </span>\r
                            <span class="p-cat">\r
                                {{order.product.genericProd?.category?.nombre}}\r
                            </span>\r
                            <span class="count">Cant: {{order.count}}</span>\r
                        </div>\r
                        <div class="pord-price">\r
                            <span class="dollars">{{order.product.price| currency}}</span>\r
                            <span class="cup">{{order.product.price}}</span>\r
                        </div>\r
\r
                    </div>\r
                    }\r
\r
                    <div class="check">\r
                        <div class="subtotal">\r
                            <h3>Subtotal</h3>\r
                            <h3>{{ order?.price| currency}}</h3>\r
                        </div>\r
                        <div class="subtotal">\r
                            <h3>Transportaci\xF3n</h3>\r
                            <h3>{{order && order.delivery? (order.delPrice | currency) : '--------'}}</h3>\r
                        </div>\r
                        <div class="total-price">\r
                            <div class="divider"></div>\r
                            <h2>Total</h2>\r
                            <h2>{{ order != undefined ? ((order.price + order.delPrice) | currency) : 0 | currency }}\r
                            </h2>\r
                        </div>\r
                    </div>\r
                </div>\r
            </div>\r
\r
            <div class="client-info">\r
                <h3>Informaci\xF3n del cliente</h3>\r
                <div class="buyer-info">\r
                    <div class="user">\r
                        <div class="avatar">\r
                            <img [src]="order?.user?.image || 'user.svg'" alt="">\r
                        </div>\r
                        <div class="user-info">\r
                            <p class="name">{{order?.user?.name}} {{order?.user?.lastName}}</p>\r
                            <span class="email">{{order?.user?.email}}</span>\r
                        </div>\r
                    </div>\r
                    <div class="contact-info">\r
                        <p>Tel\xE9fono</p>\r
                        <span>{{order?.user?.phone}}</span>\r
                    </div>\r
                    @if(order?.note) {\r
                    <div class="contact-info">\r
                        <p>Nota adicional</p>\r
                        <span>"{{order?.note?.length}}"</span>\r
                    </div>\r
                    }\r
                </div>\r
                <h3>Informaci\xF3n de la persona que recibe</h3>\r
                <div class="buyer-info">\r
                    <div class="contact-info">\r
                        <p>Nombre y apellidos</p>\r
                        <span>{{order?.name}} {{order?.lastName}}</span>\r
                    </div>\r
                    <div class="contact-info">\r
                        <p>email</p>\r
                        <span>{{order?.email}}</span>\r
                    </div>\r
                    <div class="contact-info">\r
                        <p>Tel\xE9fono</p>\r
                        <span>{{order?.phone}}</span>\r
                    </div>\r
                    @if(order?.delivery) {\r
                    <div class="contact-info">\r
                        <p>Direcci\xF3n</p>\r
                        <span>{{order?.address + ', ' + order?.city + ', ' + order?.province}}</span>\r
                    </div>\r
                    }\r
                </div>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <div class="client-orders">\r
        <div class="head-bar">\r
            @for (item of ['N\xBA pedido', 'Fecha', 'Total', 'Tipo de entrega', 'Estado']; track\r
            $index) {\r
            <div [className]="\`column \${item === '' ? 'action' : item.toLowerCase()}\`">\r
\r
                <div [className]="\`head-bar-item \${item === '' ? 'action' : item.toLowerCase()}\`">\r
                    <p>{{item}}</p>\r
                </div>\r
                @for (ord of order?.user?.orders; track $index) {\r
                <div [className]="\`product-item \${item === '' ? 'action' : item.toLowerCase()}\`">\r
\r
                    @if (item === 'N\xBA pedido') {\r
                    <p>{{ord.id}}</p>\r
                    }\r
                    @if (item === 'Fecha') {\r
                    <p>{{getDateByOrd(ord)}}</p>\r
                    }\r
                    @if (item === 'Total') {\r
                    <p>{{ord.price + ord.delPrice | currency}}</p>\r
                    }\r
                    @if (item === 'Tipo de entrega') {\r
                    <p>{{ord.delivery? 'A domicilio': 'Retiro en tienda'}}</p>\r
                    }\r
                    @if (item === 'Estado') {\r
                    <div class="status">\r
                        <img [src]="'Activo'==='Activo' ? './_Dot_green.svg' : './_Dot_red.svg'" alt="">\r
                        <p>{{'active' === 'active' ? 'Activo' : 'Inactivo'}}</p>\r
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

// angular:jit:style:src\app\features\dashboard\orders\order-details\order-details.css
var order_details_default2;
var init_order_details2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\orders\\order-details\\order-details.css"() {
    order_details_default2 = "/* src/app/features/dashboard/orders/order-details/order-details.css */\n.main {\n  width: 100%;\n  height: 95vh;\n  display: flex;\n  flex-direction: column;\n  gap: 48px;\n  border-radius: var(--Corner-Small, 8px);\n  background: var(--Gray-50, #FAFAFA);\n  padding: 24px 24px 24px 48px;\n  box-sizing: border-box;\n  box-shadow: 0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03);\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  overflow: auto;\n}\n.head-container {\n  display: flex;\n  flex-direction: column;\n  align-items: end;\n  width: 100%;\n}\n.input-content.drop {\n  cursor: pointer;\n}\n.cross {\n  position: absolute;\n  padding: 14px;\n  align-self: flex-end;\n  cursor: pointer;\n}\n.details-main {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 40px;\n  align-self: stretch;\n}\n.details-header {\n  margin-top: 52px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n}\n.id p {\n  font-family: var(--montser-font);\n  color: var(--Gray-700, #414651);\n  font-size: 28px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n  margin: 0;\n}\n.id p span {\n  color: #007981;\n}\n.date {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.input-txt {\n  text-align: center;\n  display: flex;\n  gap: 4px;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n}\n.input-txt.completed {\n  background: var(--Success-50, #ECFDF3);\n  color: var(--Success-700, #027A48);\n}\n.input-txt.pending {\n  color: #B54708;\n  background: var(--Warning-50, #FFFAEB);\n}\n.input-txt.canceled {\n  color: #B42318;\n  background: var(--Error-50, #FEF3F2);\n}\n.order {\n  display: flex;\n  align-items: flex-start;\n  gap: 40px;\n  align-self: stretch;\n}\n.products,\n.client-info {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n  flex: 1 0 0;\n}\n.products {\n  max-width: 600px;\n}\n.products h3,\n.client-info h3 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n  margin: 0px;\n}\n.order-summary {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  width: 100%;\n  border-radius: var(--Corner-Small, 8px);\n  border: 0.5px solid var(--Gray-500, #717680);\n  padding: 24px;\n  box-sizing: border-box;\n}\n.image {\n  display: flex;\n  width: 86px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  aspect-ratio: 1/1;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.variant {\n  display: flex;\n  padding: 16px;\n  gap: 16px;\n  align-items: center;\n  width: 100%;\n  box-sizing: border-box;\n  background-color: #F0FEFF;\n  border-radius: 8px;\n  border: 1px solid var(--Brand-300, #98CDD2);\n}\n.prod-details {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.pord-price {\n  display: flex;\n  flex-direction: column;\n}\n.count,\n.dollars {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.p-name {\n  color: var(--Brand-700, #007981);\n  font-family: var(--montser-font);\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 30px;\n}\n.p-cat {\n  color: var(--Brand-600, #178C94);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n.cup {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 18px;\n}\n.check {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding-inline: 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.subtotal {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.subtotal h3 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n  margin: 0px;\n}\n.total-price {\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding-top: 12px;\n}\n.divider {\n  position: absolute;\n  top: 0px;\n  width: 100%;\n  background: var(--Gray-200, #E9EAEB);\n  height: 1px;\n}\n.total-price h2 {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 24px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 32px;\n  margin: 0px;\n}\n.head-bar {\n  display: flex;\n  align-items: flex-start;\n  align-self: stretch;\n  width: 100%;\n}\n.head-bar-item {\n  display: flex;\n  flex: 1;\n  height: 44px;\n  padding: 12px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--Gray-50, #FAFAFA);\n  box-sizing: border-box;\n}\n.head-bar-item.action {\n  min-height: 44px;\n}\n.head-bar p {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n  margin: 0px;\n}\n.column {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.column.nombre {\n  min-width: 312px;\n}\n.column.action {\n  flex: none;\n  width: 160px;\n}\n.column.categor\\ed a {\n  width: 225px;\n  flex: none;\n}\n.product-item {\n  display: flex;\n  height: 72px;\n  padding: 16px 24px;\n  align-items: center;\n  gap: 12px;\n  align-self: stretch;\n  border-bottom: 1px solid var(--Gray-200, #E9EAEB);\n  box-sizing: border-box;\n  background-color: #FFFFFF;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.action-button {\n  border: none;\n  background: none;\n  padding: 10px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.status {\n  display: flex;\n  padding: 2px 8px 2px 6px;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  border-radius: 16px;\n  background: var(--Success-50, #ECFDF3);\n}\n.category {\n  display: flex;\n  padding: 2px 8px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  background: var(--Gray-100, #F5F5F5);\n}\n.status p {\n  color: var(--Success-700, #027A48);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 18px;\n}\n.client-orders {\n  display: flex;\n  flex: 1;\n  height: 100%;\n  width: 100%;\n}\n.drop-down {\n  display: flex;\n  position: absolute;\n  flex-direction: column;\n  padding: 4px 0;\n  left: 0px;\n  top: 100%;\n  width: 100%;\n  align-items: flex-start;\n  border-radius: 8px;\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--White, #FFF);\n  box-shadow: 0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03);\n}\n.drop-down.closed {\n  display: none;\n}\n.drop-item {\n  display: flex;\n  padding: 10px 14px;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n}\n.buyer-info {\n  display: flex;\n  padding: 24px;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n  align-self: stretch;\n  border-radius: var(--Corner-Small, 8px);\n  border: 0.5px solid var(--Gray-500, #717680);\n}\n.user {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.avatar {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  border: 4px solid var(--Brand-100, #D3F3F5);\n  box-sizing: border-box;\n}\n.avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.user-info {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.buyer-info p {\n  color: var(--Gray-700, #414651);\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.buyer-info span {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n/*# sourceMappingURL=order-details.css.map */\n";
  }
});

// src/app/shared/models/Order.ts
var OrderState;
var init_Order = __esm({
  "src/app/shared/models/Order.ts"() {
    "use strict";
    (function(OrderState2) {
      OrderState2["pending"] = "Pendiente";
      OrderState2["completed"] = "Realizado";
      OrderState2["canceled"] = "Cancelado";
    })(OrderState || (OrderState = {}));
  }
});

// src/app/features/dashboard/orders/order-details/order-details.ts
var OrderDetails;
var init_order_details3 = __esm({
  "src/app/features/dashboard/orders/order-details/order-details.ts"() {
    "use strict";
    init_tslib_es6();
    init_order_details();
    init_order_details2();
    init_core();
    init_Order();
    init_common();
    init_http_service();
    init_error_log_service();
    init_errorParser();
    init_box_loader();
    OrderDetails = class OrderDetails2 {
      http;
      cdr;
      errorServ;
      ngAfterViewInit() {
        console.log(this.order);
      }
      isDropdownOpen = false;
      states = OrderState;
      order;
      close = new EventEmitter(false);
      constructor(http, cdr, errorServ) {
        this.http = http;
        this.cdr = cdr;
        this.errorServ = errorServ;
      }
      getDate() {
        const date = new Date(this.order?.createdAt ?? "");
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }
      getDateByOrd(ord) {
        const date = new Date(ord.createdAt ?? "");
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }
      onClose() {
        this.close.emit(true);
      }
      loading = false;
      changeState(state) {
        this.loading = true;
        this.http.updateOrder(this.order?.id ?? "", { state }).subscribe({
          next: (res) => {
            console.log(res);
            if (this.order) {
              this.order.state = state;
            }
            this.isDropdownOpen = false;
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
        { type: ChangeDetectorRef },
        { type: ErrorLogService }
      ];
      static propDecorators = {
        order: [{ type: Input }],
        close: [{ type: Output }]
      };
    };
    OrderDetails = __decorate([
      Component({
        selector: "app-order-details",
        imports: [CommonModule, BoxLoader],
        template: order_details_default,
        styles: [order_details_default2]
      })
    ], OrderDetails);
  }
});

export {
  OrderState,
  init_Order,
  OrderDetails,
  init_order_details3 as init_order_details
};
//# sourceMappingURL=chunk-JWDBKLCA.js.map
