import {
  PromotionInfo,
  init_promotion_info
} from "./chunk-FGLIXYHW.js";
import "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
import "./chunk-PS4KN3D7.js";
import "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/features/dashboard/promotions/promotion-info/promotion-info.spec.ts
var require_promotion_info_spec = __commonJS({
  "src/app/features/dashboard/promotions/promotion-info/promotion-info.spec.ts"(exports) {
    init_testing();
    init_promotion_info();
    describe("PromotionInfo", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [PromotionInfo]
        }).compileComponents();
        fixture = TestBed.createComponent(PromotionInfo);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_promotion_info_spec();
//# sourceMappingURL=spec-promotion-info.spec.js.map
