import {
  OrderDetails,
  init_order_details
} from "./chunk-JWDBKLCA.js";
import "./chunk-QFLJSFW5.js";
import "./chunk-FQQDYBZG.js";
import "./chunk-PS4KN3D7.js";
import "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import "./chunk-FYBANU52.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/features/dashboard/orders/order-details/order-details.spec.ts
var require_order_details_spec = __commonJS({
  "src/app/features/dashboard/orders/order-details/order-details.spec.ts"(exports) {
    init_testing();
    init_order_details();
    describe("OrderDetails", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [OrderDetails]
        }).compileComponents();
        fixture = TestBed.createComponent(OrderDetails);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_order_details_spec();
//# sourceMappingURL=spec-order-details.spec.js.map
