import {
  ProductDetail,
  init_product_detail
} from "./chunk-PFESE2RF.js";
import "./chunk-QFLJSFW5.js";
import "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
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

// src/app/features/dashboard/products/product-detail/product-detail.spec.ts
var require_product_detail_spec = __commonJS({
  "src/app/features/dashboard/products/product-detail/product-detail.spec.ts"(exports) {
    init_testing();
    init_product_detail();
    describe("ProductDetail", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ProductDetail]
        }).compileComponents();
        fixture = TestBed.createComponent(ProductDetail);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_product_detail_spec();
//# sourceMappingURL=spec-product-detail.spec.js.map
