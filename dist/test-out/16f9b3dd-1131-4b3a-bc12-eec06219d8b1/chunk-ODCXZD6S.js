import {
  CloudinaryService,
  init_cloudinary_service
} from "./chunk-YLGU4GEO.js";
import {
  HttpEventType,
  init_http
} from "./chunk-PS4KN3D7.js";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewChild,
  __async,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\shared\components\drag-and-drop\drag-and-drop.html
var drag_and_drop_default;
var init_drag_and_drop = __esm({
  "angular:jit:template:src\\app\\shared\\components\\drag-and-drop\\drag-and-drop.html"() {
    drag_and_drop_default = '<div class="drag-n-drop-cont" (click)="onFilesSelected($event)" (dragleave)="onDragLeave($event)"\r\n  (dragover)="onDragOver($event)" (drop)="onDrop($event)">\r\n  <div class="dnd-icon">\r\n    <img src="upload-cloud.svg" alt="">\r\n  </div>\r\n  <input type="file" #fileInput style="display: none;" (change)="onFileChange($event)" id="">\r\n  <div class="dnd-txt">\r\n    <p><span>Haga clic para cargar</span> o arrastrar y soltar</p>\r\n    <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>\r\n  </div>\r\n  <div class="progress-bar" [style.width.%]="progress">\r\n  </div>\r\n</div>';
  }
});

// angular:jit:style:src\app\shared\components\drag-and-drop\drag-and-drop.css
var drag_and_drop_default2;
var init_drag_and_drop2 = __esm({
  "angular:jit:style:src\\app\\shared\\components\\drag-and-drop\\drag-and-drop.css"() {
    drag_and_drop_default2 = "/* src/app/shared/components/drag-and-drop/drag-and-drop.css */\n.drag-n-drop-cont {\n  display: flex;\n  position: relative;\n  padding: 16px 24px;\n  width: 100%;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  align-self: stretch;\n  border-radius: 8px;\n  border: 1px solid var(--Gray-200, #E9EAEB);\n  background: var(--White, #FFF);\n  box-sizing: border-box;\n}\n.progress-bar {\n  position: absolute;\n  bottom: 0px;\n  width: 0%;\n  left: 0px;\n  height: 4px;\n  background-color: var(--Brand-700, #007981);\n  border-radius: 0 0 8px 8px;\n  transition: width 0.3s ease;\n}\n.dnd-icon {\n  display: flex;\n  width: 40px;\n  height: 40px;\n  padding: 10px;\n  justify-content: center;\n  align-items: center;\n  border-radius: 28px;\n  box-sizing: border-box;\n  border: 6px solid var(--Gray-50, #FAFAFA);\n  background: var(--Gray-100, #F5F5F5);\n}\n.dnd-txt p {\n  color: var(--Gray-600, #535862);\n  font-family: var(--montser-font);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n  margin: 0px;\n}\n.dnd-txt p span {\n  color: var(--Brand-700, #007981);\n  font-weight: 600;\n}\n/*# sourceMappingURL=drag-and-drop.css.map */\n";
  }
});

// src/app/shared/components/drag-and-drop/drag-and-drop.ts
var DragAndDrop;
var init_drag_and_drop3 = __esm({
  "src/app/shared/components/drag-and-drop/drag-and-drop.ts"() {
    "use strict";
    init_tslib_es6();
    init_drag_and_drop();
    init_drag_and_drop2();
    init_core();
    init_cloudinary_service();
    init_http();
    DragAndDrop = class DragAndDrop2 {
      cloudy;
      cdr;
      fileInput;
      progress = -1;
      imagePreview = "";
      isHovering = false;
      uploaded = new EventEmitter();
      constructor(cloudy, cdr) {
        this.cloudy = cloudy;
        this.cdr = cdr;
      }
      onFileChange(event) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          this.upload(file);
        }
      }
      onDrop(event, option) {
        return __async(this, null, function* () {
          event.preventDefault();
          this.isHovering = false;
          if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            this.upload(file);
            event.dataTransfer.clearData();
          }
        });
      }
      onFilesSelected(event) {
        this.fileInput.nativeElement.click();
      }
      upload(file) {
        this.progress = 0;
        this.cloudy.uploadFile(file).subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round(event.loaded / event.total * 100);
            this.cdr.detectChanges();
          } else if (event.type === HttpEventType.Response) {
            console.log("\u2705 Subida completa:", event.body);
            const body = event.body;
            const optimizedUrl = body.secure_url.replace("/upload/", "/upload/q_auto,f_auto/");
            this.progress = 100;
            this.imagePreview = optimizedUrl;
            this.uploaded.emit({ secure_url: optimizedUrl, public_id: body.public_id });
            setTimeout(() => {
              this.progress = 0;
              this.cdr.detectChanges();
            }, 3e3);
            this.cdr.detectChanges();
          }
        });
      }
      onDragOver(event, option) {
        event.preventDefault();
        this.isHovering = true;
      }
      onDragLeave(event) {
        this.isHovering = false;
      }
      static ctorParameters = () => [
        { type: CloudinaryService },
        { type: ChangeDetectorRef }
      ];
      static propDecorators = {
        fileInput: [{ type: ViewChild, args: ["fileInput"] }],
        uploaded: [{ type: Output }]
      };
    };
    DragAndDrop = __decorate([
      Component({
        selector: "app-drag-and-drop",
        imports: [],
        template: drag_and_drop_default,
        styles: [drag_and_drop_default2]
      })
    ], DragAndDrop);
  }
});

export {
  DragAndDrop,
  init_drag_and_drop3 as init_drag_and_drop
};
//# sourceMappingURL=chunk-ODCXZD6S.js.map
