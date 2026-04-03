import {
  MessageBox,
  init_message_box
} from "./chunk-XBM43HFD.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/shared/components/message-box/message-box.spec.ts
var require_message_box_spec = __commonJS({
  "src/app/shared/components/message-box/message-box.spec.ts"(exports) {
    init_testing();
    init_message_box();
    describe("MessageBox", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [MessageBox]
        }).compileComponents();
        fixture = TestBed.createComponent(MessageBox);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_message_box_spec();
//# sourceMappingURL=spec-message-box.spec.js.map
