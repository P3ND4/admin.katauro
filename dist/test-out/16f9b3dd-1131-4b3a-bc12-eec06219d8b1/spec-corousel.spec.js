import {
  Corousel,
  init_corousel
} from "./chunk-6V3F57C2.js";
import "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/shared/components/corousel/corousel.spec.ts
var require_corousel_spec = __commonJS({
  "src/app/shared/components/corousel/corousel.spec.ts"(exports) {
    init_testing();
    init_corousel();
    describe("Corousel", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Corousel]
        }).compileComponents();
        fixture = TestBed.createComponent(Corousel);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_corousel_spec();
//# sourceMappingURL=spec-corousel.spec.js.map
