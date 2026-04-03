import {
  BehaviorSubject,
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// src/app/shared/services/errors/error.log.service.ts
var ErrorLogService;
var init_error_log_service = __esm({
  "src/app/shared/services/errors/error.log.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_esm();
    ErrorLogService = class ErrorLogService2 {
      _errors = new BehaviorSubject([]);
      errors = this._errors.asObservable();
      addError(error) {
        const current = this._errors.getValue();
        this._errors.next(current.concat([error]));
        setTimeout(() => {
          const current2 = this._errors.getValue();
          if (current2) {
            const current3 = this._errors.value;
            current3.pop();
            this._errors.next(current3);
          }
        }, 1e4);
      }
    };
    ErrorLogService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], ErrorLogService);
  }
});

export {
  ErrorLogService,
  init_error_log_service
};
//# sourceMappingURL=chunk-FYBANU52.js.map
