import {
  HttpClient,
  init_http
} from "./chunk-PS4KN3D7.js";
import {
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// src/app/shared/services/cloudinary/cloudinary.service.ts
var CloudinaryService;
var init_cloudinary_service = __esm({
  "src/app/shared/services/cloudinary/cloudinary.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_http();
    init_core();
    CloudinaryService = class CloudinaryService2 {
      http;
      progress = -1;
      cloudName = "";
      url = "https://api.katauro.com/cloudinary/";
      constructor(http) {
        this.http = http;
        this.http.get(`${this.url}signature`).subscribe({ next: (val) => this.cloudName = val.cloud_name });
      }
      uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "luminarias");
        return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData, {
          reportProgress: true,
          observe: "events"
        });
      }
      static ctorParameters = () => [
        { type: HttpClient }
      ];
    };
    CloudinaryService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], CloudinaryService);
  }
});

export {
  CloudinaryService,
  init_cloudinary_service
};
//# sourceMappingURL=chunk-YLGU4GEO.js.map
