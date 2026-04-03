import {
  RouterOutlet,
  init_router
} from "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
import "./chunk-PS4KN3D7.js";
import {
  ErrorBox,
  init_error_box
} from "./chunk-VWLVSS7J.js";
import "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import {
  ErrorLogService,
  init_error_log_service
} from "./chunk-FYBANU52.js";
import {
  ChangeDetectorRef,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  provideZonelessChangeDetection,
  signal
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\app.html
var app_default;
var init_app = __esm({
  "angular:jit:template:src\\app\\app.html"() {
    app_default = '@if(globalErrors.length > 0){\r\n<div class="errors-wrapepr">\r\n    @for (item of globalErrors; track $index) {\r\n    <app-error-box [errorTitle]="item.name" [errorMessage]="item.error"></app-error-box>\r\n    }\r\n</div>\r\n}\r\n<router-outlet></router-outlet>';
  }
});

// angular:jit:style:src\app\app.css
var app_default2;
var init_app2 = __esm({
  "angular:jit:style:src\\app\\app.css"() {
    app_default2 = "/* src/app/app.css */\n.errors-wrapepr {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: auto;\n  bottom: 40px;\n  position: fixed;\n  z-index: 1000;\n  left: initial;\n  left: calc(50% - 165px);\n}\n/*# sourceMappingURL=app.css.map */\n";
  }
});

// src/app/app.ts
var App;
var init_app3 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_app2();
    init_core();
    init_router();
    init_error_log_service();
    init_error_box();
    App = class App2 {
      errorServ;
      cdr;
      globalErrors = [];
      constructor(errorServ, cdr) {
        this.errorServ = errorServ;
        this.cdr = cdr;
      }
      ngOnInit() {
        this.errorServ.errors.subscribe((val) => this.updateErrors(val));
      }
      title = signal("admin.katauro");
      updateErrors(val) {
        this.globalErrors = val;
        this.cdr.detectChanges();
      }
      static ctorParameters = () => [
        { type: ErrorLogService },
        { type: ChangeDetectorRef }
      ];
    };
    App = __decorate([
      Component({
        selector: "app-root",
        imports: [RouterOutlet, ErrorBox],
        template: app_default,
        styles: [app_default2]
      })
    ], App);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_core();
    init_testing();
    init_app3();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App],
          providers: [provideZonelessChangeDetection()]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
      it("should render title", () => {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Hello, admin.katauro");
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app.spec.js.map
