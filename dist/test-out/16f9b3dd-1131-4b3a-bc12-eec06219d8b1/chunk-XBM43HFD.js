import {
  Component,
  EventEmitter,
  Input,
  Output,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\shared\components\message-box\message-box.html
var message_box_default;
var init_message_box = __esm({
  "angular:jit:template:src\\app\\shared\\components\\message-box\\message-box.html"() {
    message_box_default = '<div class="message-main">\r\n    <div class="message">\r\n        <div class="icon">\r\n            <img src="alert-circle.svg" alt="">\r\n        </div>\r\n        <div class="txt">\r\n            <h2>{{data?.msg}}</h2>\r\n            <p>{{data?.warn}}</p>\r\n        </div>\r\n    </div>\r\n    <div class="actions">\r\n        <div class="cancel" (click)="onAction(false)">\r\n            <span>Cancelar</span>\r\n        </div>\r\n        <div class="accept" (click)="onAction(true)">\r\n            <span>Eliminar</span>\r\n        </div>\r\n    </div>\r\n</div>';
  }
});

// angular:jit:style:src\app\shared\components\message-box\message-box.css
var message_box_default2;
var init_message_box2 = __esm({
  "angular:jit:style:src\\app\\shared\\components\\message-box\\message-box.css"() {
    message_box_default2 = "/* src/app/shared/components/message-box/message-box.css */\n.message-main {\n  display: flex;\n  width: 400px;\n  padding: 24px;\n  flex-direction: column;\n  align-items: center;\n  gap: 32px;\n  border-radius: 12px;\n  background: var(--White, #FFF);\n  box-shadow: 0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03);\n}\n.message {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  align-self: stretch;\n}\n.icon {\n  display: flex;\n  padding: 12px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  border: 8px solid var(--Error-50, #FEF3F2);\n  background: var(--Error-100, #FEE4E2);\n}\n.txt {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n}\n.txt h2 {\n  color: var(--Gray-900, #181D27);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n  margin: 0px;\n}\n.txt p {\n  color: var(--Gray-600, #535862);\n  text-align: center;\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n  margin: 0px;\n}\n.cancel {\n  display: flex;\n  padding: 10px 18px;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n  flex: 1 0 0;\n  box-sizing: border-box;\n  border-radius: 8px;\n  border: 1px solid var(--Gray-300, #D5D7DA);\n  background: var(--White, #FFF);\n  box-shadow: 0 1px 2px 0 rgba(10, 13, 18, 0.05);\n  cursor: pointer;\n}\n.accept {\n  display: flex;\n  padding: 10px 18px;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n  flex: 1 0 0;\n  border-radius: 8px;\n  border: 1px solid var(--Error-600, #D92D20);\n  background: var(--Error-600, #D92D20);\n  box-shadow: 0 1px 2px 0 rgba(10, 13, 18, 0.05);\n  cursor: pointer;\n}\n.actions {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  align-self: stretch;\n}\n.accept span,\n.cancel span {\n  font-family: var(--montser-font);\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 24px;\n}\n.accept span {\n  color: var(--White, #FFF);\n}\n.cancel span {\n  color: var(--Gray-700, #414651);\n}\n/*# sourceMappingURL=message-box.css.map */\n";
  }
});

// src/app/shared/components/message-box/message-box.ts
var MessageBox;
var init_message_box3 = __esm({
  "src/app/shared/components/message-box/message-box.ts"() {
    "use strict";
    init_tslib_es6();
    init_message_box();
    init_message_box2();
    init_core();
    MessageBox = class MessageBox2 {
      data;
      acept = new EventEmitter(false);
      onAction(action) {
        this.acept.emit(action);
      }
      static propDecorators = {
        data: [{ type: Input }],
        acept: [{ type: Output }]
      };
    };
    MessageBox = __decorate([
      Component({
        selector: "app-message-box",
        imports: [],
        template: message_box_default,
        styles: [message_box_default2]
      })
    ], MessageBox);
  }
});

export {
  MessageBox,
  init_message_box3 as init_message_box
};
//# sourceMappingURL=chunk-XBM43HFD.js.map
