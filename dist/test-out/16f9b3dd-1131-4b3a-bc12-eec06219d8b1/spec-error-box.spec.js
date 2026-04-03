import {
  ErrorBox,
  init_error_box
} from "./chunk-VWLVSS7J.js";
import "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/shared/components/error-box/error-box.spec.ts
var require_error_box_spec = __commonJS({
  "src/app/shared/components/error-box/error-box.spec.ts"(exports) {
    init_testing();
    init_error_box();
    describe("ErrorBox", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ErrorBox]
        }).compileComponents();
        fixture = TestBed.createComponent(ErrorBox);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_error_box_spec();
//# sourceMappingURL=spec-error-box.spec.js.map
