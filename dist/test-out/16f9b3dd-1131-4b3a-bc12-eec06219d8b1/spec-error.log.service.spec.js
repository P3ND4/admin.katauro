import {
  ErrorLogService,
  init_error_log_service
} from "./chunk-FYBANU52.js";
import {
  TestBed,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/shared/services/errors/error.log.service.spec.ts
init_testing();
init_error_log_service();
describe("ErrorLogService", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorLogService);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=spec-error.log.service.spec.js.map
