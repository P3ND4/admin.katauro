import {
  CommonModule,
  init_common
} from "./chunk-QVDWSDMI.js";
import {
  ChangeDetectorRef,
  Component,
  Input,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\shared\components\error-box\error-box.html
var error_box_default;
var init_error_box = __esm({
  "angular:jit:template:src\\app\\shared\\components\\error-box\\error-box.html"() {
    error_box_default = `<div class="container" animate.enter="animate" [ngClass]="!exitAnim ? 'animate-exit' : ''">\r
    <div class="icon">\r
        <img src="alert-circle.svg" alt="">\r
    </div>\r
    <div class="content">\r
        <span>{{errorTitle}}</span>\r
        <p>{{errorMessage}}</p>\r
    </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\shared\components\error-box\error-box.css
var error_box_default2;
var init_error_box2 = __esm({
  "angular:jit:style:src\\app\\shared\\components\\error-box\\error-box.css"() {
    error_box_default2 = "/* src/app/shared/components/error-box/error-box.css */\n.container {\n  display: flex;\n  gap: 12px;\n  padding: 12px;\n  width: 307px;\n  align-items: center;\n  justify-content: start;\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03);\n  transition: opacity 100ms ease-out, transform 100ms ease-out;\n}\n.content span {\n  font-family: var(--montser-font);\n  line-height: 18px;\n  color: #D92D20;\n  font-weight: 600;\n  font-size: 12px;\n}\n.content p {\n  font-family: var(--montser-font);\n  line-height: 18px;\n  color: #535862;\n  font-weight: 400;\n  font-size: 11px;\n}\n.container.animate-exit {\n  transform: translateX(40px);\n  opacity: 0;\n}\n.animate {\n  animation: enter 500ms ease forwards;\n}\n.icon {\n  display: flex;\n  border-radius: 50%;\n  width: auto;\n  height: auto;\n  border: 5.33px solid #FEF3F2;\n  padding: 5px;\n  box-sizing: border-box;\n  background-color: #FEE4E2;\n}\n@keyframes enter {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes exit {\n  from {\n    opacity: 1;\n    transform: translateY(0);\n  }\n  to {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n}\n/*# sourceMappingURL=error-box.css.map */\n";
  }
});

// src/app/shared/components/error-box/error-box.ts
var ErrorBox;
var init_error_box3 = __esm({
  "src/app/shared/components/error-box/error-box.ts"() {
    "use strict";
    init_tslib_es6();
    init_error_box();
    init_error_box2();
    init_common();
    init_core();
    ErrorBox = class ErrorBox2 {
      cdr;
      errorTitle = "Error";
      errorMessage = "An unexpected error occurred.";
      constructor(cdr) {
        this.cdr = cdr;
      }
      ngOnDestroy() {
        this.exitAnim = true;
      }
      exitAnim = true;
      ngOnInit() {
        setTimeout(() => {
          this.exitAnim = false;
          this.cdr.detectChanges();
        }, 8500);
      }
      static ctorParameters = () => [
        { type: ChangeDetectorRef }
      ];
      static propDecorators = {
        errorTitle: [{ type: Input }],
        errorMessage: [{ type: Input }]
      };
    };
    ErrorBox = __decorate([
      Component({
        selector: "app-error-box",
        imports: [CommonModule],
        template: error_box_default,
        styles: [error_box_default2]
      })
    ], ErrorBox);
  }
});

export {
  ErrorBox,
  init_error_box3 as init_error_box
};
//# sourceMappingURL=chunk-VWLVSS7J.js.map
