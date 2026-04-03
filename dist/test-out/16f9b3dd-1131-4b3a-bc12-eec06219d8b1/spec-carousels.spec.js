import {
  Carousels,
  init_carousels
} from "./chunk-MH3NFAOH.js";
import "./chunk-QFLJSFW5.js";
import "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
import "./chunk-FQQDYBZG.js";
import "./chunk-6V3F57C2.js";
import "./chunk-PS4KN3D7.js";
import {
  CommonModule,
  init_common
} from "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import "./chunk-FYBANU52.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/features/dashboard/promotions/carousels/carousels.spec.ts
var require_carousels_spec = __commonJS({
  "src/app/features/dashboard/promotions/carousels/carousels.spec.ts"(exports) {
    init_testing();
    init_carousels();
    init_common();
    describe("Carousels", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Carousels, CommonModule]
        }).compileComponents();
        fixture = TestBed.createComponent(Carousels);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_carousels_spec();
//# sourceMappingURL=spec-carousels.spec.js.map
