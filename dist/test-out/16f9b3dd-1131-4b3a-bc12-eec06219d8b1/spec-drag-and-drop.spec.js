import {
  DragAndDrop,
  init_drag_and_drop
} from "./chunk-ODCXZD6S.js";
import "./chunk-YLGU4GEO.js";
import "./chunk-PS4KN3D7.js";
import "./chunk-734FOWQQ.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/shared/components/drag-and-drop/drag-and-drop.spec.ts
var require_drag_and_drop_spec = __commonJS({
  "src/app/shared/components/drag-and-drop/drag-and-drop.spec.ts"(exports) {
    init_testing();
    init_drag_and_drop();
    describe("DragAndDrop", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [DragAndDrop]
        }).compileComponents();
        fixture = TestBed.createComponent(DragAndDrop);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_drag_and_drop_spec();
//# sourceMappingURL=spec-drag-and-drop.spec.js.map
