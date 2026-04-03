import {
  Component,
  Input,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\shared\components\box-loader\box-loader.html
var box_loader_default;
var init_box_loader = __esm({
  "angular:jit:template:src\\app\\shared\\components\\box-loader\\box-loader.html"() {
    box_loader_default = '<div class="main">\r\n    <div class="circle">\r\n        <img class="loader" src="Loader.svg" alt="">\r\n    </div>\r\n    <span class="txt">{{message}}</span>\r\n</div>';
  }
});

// angular:jit:style:src\app\shared\components\box-loader\box-loader.css
var box_loader_default2;
var init_box_loader2 = __esm({
  "angular:jit:style:src\\app\\shared\\components\\box-loader\\box-loader.css"() {
    box_loader_default2 = "/* src/app/shared/components/box-loader/box-loader.css */\n.main {\n  display: flex;\n  flex-direction: column;\n  padding: 24px;\n  align-items: center;\n  width: 236px;\n  gap: 20px;\n  box-sizing: border-box;\n  background-color: white;\n  opacity: 1;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px 0 rgba(10, 13, 18, 0.06);\n}\n.circle {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  border: solid #F0FEFF 20px;\n  background-color: #D3F3F5;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.loader {\n  width: 60px;\n  height: 60px;\n  animation: spin 2s linear infinite;\n}\n.txt {\n  color: var(--Gray-900, #181D27);\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 24px;\n}\n/*# sourceMappingURL=box-loader.css.map */\n";
  }
});

// src/app/shared/components/box-loader/box-loader.ts
var BoxLoader;
var init_box_loader3 = __esm({
  "src/app/shared/components/box-loader/box-loader.ts"() {
    "use strict";
    init_tslib_es6();
    init_box_loader();
    init_box_loader2();
    init_core();
    BoxLoader = class BoxLoader2 {
      message = "Cargando...";
      static propDecorators = {
        message: [{ type: Input }]
      };
    };
    BoxLoader = __decorate([
      Component({
        selector: "app-box-loader",
        imports: [],
        template: box_loader_default,
        styles: [box_loader_default2]
      })
    ], BoxLoader);
  }
});

export {
  BoxLoader,
  init_box_loader3 as init_box_loader
};
//# sourceMappingURL=chunk-FQQDYBZG.js.map
