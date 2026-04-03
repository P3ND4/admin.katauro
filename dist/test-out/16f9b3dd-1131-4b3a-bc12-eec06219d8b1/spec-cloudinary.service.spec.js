import {
  CloudinaryService,
  init_cloudinary_service
} from "./chunk-YLGU4GEO.js";
import "./chunk-PS4KN3D7.js";
import "./chunk-734FOWQQ.js";
import {
  TestBed,
  init_testing
} from "./chunk-W7AWB7PO.js";

// src/app/shared/services/cloudinary/cloudinary.service.spec.ts
init_testing();
init_cloudinary_service();
describe("CloudinaryService", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudinaryService);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=spec-cloudinary.service.spec.js.map
