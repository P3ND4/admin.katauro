import {
  BoxLoader,
  init_box_loader
} from "./chunk-FQQDYBZG.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/shared/components/box-loader/box-loader.spec.ts
var require_box_loader_spec = __commonJS({
  "src/app/shared/components/box-loader/box-loader.spec.ts"(exports) {
    init_testing();
    init_box_loader();
    describe("BoxLoader", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [BoxLoader]
        }).compileComponents();
        fixture = TestBed.createComponent(BoxLoader);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_box_loader_spec();
//# sourceMappingURL=spec-box-loader.spec.js.map
