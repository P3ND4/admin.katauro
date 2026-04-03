import {
  httpService,
  init_errorParser,
  init_http_service,
  parseError
} from "./chunk-QFLJSFW5.js";
import {
  Router,
  RouterLink,
  RouterOutlet,
  init_router
} from "./chunk-6CBWGU4L.js";
import "./chunk-PI36XLRZ.js";
import "./chunk-PS4KN3D7.js";
import {
  CommonModule,
  init_common
} from "./chunk-QVDWSDMI.js";
import "./chunk-734FOWQQ.js";
import {
  ErrorLogService,
  init_error_log_service
} from "./chunk-FYBANU52.js";
import {
  Component,
  Injectable,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  signal
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\features\dashboard\dashboard.html
var dashboard_default;
var init_dashboard = __esm({
  "angular:jit:template:src\\app\\features\\dashboard\\dashboard.html"() {
    dashboard_default = `<div class="dashboard">\r
    <div class="navigation">\r
        <div class="nav-items-container">\r
            <header class="nav-header">\r
                <img src="K.png" alt="katauro logo" class="logo">\r
            </header>\r
            <div class="nav-items">\r
                <div class="nav-item products" [ngClass]="{'active': isRoute('/dashboard/products')}"\r
                    (click)="navigate('/dashboard/products')">\r
                    <div class="nav-icon" src="luminarias.svg" alt=""></div>\r
                </div>\r
                <div class="nav-item users" [routerLink]="'/dashboard/users'"\r
                    [ngClass]="{'active': isRoute('/dashboard/users')}">\r
                    <div class="nav-icon" src="users.svg" alt=""></div>\r
                </div>\r
                <div class="nav-item promotions" [routerLink]="'/dashboard/promotions'"\r
                    [ngClass]="{'active': isRoute('/dashboard/promotions')}">\r
                    <div class="nav-icon" src="tag.svg" alt=""></div>\r
                </div>\r
                <div class="nav-item orders" [routerLink]="'/dashboard/orders'"\r
                    [ngClass]="{'active': isRoute('/dashboard/orders')}">\r
                    <div class="nav-icon" src="layout.svg" alt=""></div>\r
                </div>\r
                <div class="nav-item blogs" [routerLink]="'/dashboard/blogs'"\r
                    [ngClass]="{'active': isRoute('/dashboard/blogs')}">\r
                    <div class="nav-icon" alt=""></div>\r
                </div>\r
            </div>\r
        </div>\r
\r
    </div>\r
\r
    <div class="route">\r
        <router-outlet></router-outlet>\r
    </div>\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\features\dashboard\dashboard.css
var dashboard_default2;
var init_dashboard2 = __esm({
  "angular:jit:style:src\\app\\features\\dashboard\\dashboard.css"() {
    dashboard_default2 = "/* src/app/features/dashboard/dashboard.css */\n.dashboard {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  min-height: 100vh;\n  background-color: #007981;\n  box-sizing: border-box;\n}\n.navigation {\n  width: 81px;\n  display: flex;\n  flex-direction: column;\n  padding-top: 32px;\n  gap: 24px;\n}\n.nav-header {\n  display: flex;\n  justify-content: center;\n  padding-inline: 24px 20px;\n}\n.nav-items {\n  display: flex;\n  flex-direction: column;\n  padding-inline: 16px;\n  gap: 8px;\n}\n.nav-item {\n  display: flex;\n  padding: 12px;\n  cursor: pointer;\n  justify-content: center;\n  align-items: center;\n  height: 48px;\n  width: 48px;\n  box-sizing: border-box;\n}\n.route {\n  display: flex;\n  flex-direction: column;\n  padding-block: 32px 48px;\n  border-radius: 40px 0px 0px 0px;\n  background-color: #FAFAFA;\n  margin-top: 12px;\n  flex: 1;\n  box-sizing: border-box;\n  overflow: auto;\n}\n.nav-icon {\n  width: 24px;\n  height: 24px;\n  background-color: #98CDD2;\n  -webkit-mask-image: url(/luminarias.svg);\n  mask-image: url(/luminarias.svg);\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-size: contain;\n  mask-size: contain;\n  -webkit-mask-position: center;\n  mask-position: center;\n}\n.nav-item.promotions .nav-icon {\n  -webkit-mask-image: url(/tag.svg);\n  mask-image: url(/tag.svg);\n}\n.nav-item.active .nav-icon {\n  background-color: #FFFFFF;\n}\n.nav-item.orders .nav-icon {\n  -webkit-mask-image: url(/orders.svg);\n  mask-image: url(/orders.svg);\n}\n.nav-item.users .nav-icon {\n  -webkit-mask-image: url(/users.svg);\n  mask-image: url(/users.svg);\n}\n.nav-item.blogs .nav-icon {\n  -webkit-mask-image: url(/users.svg);\n  mask-image: url(/layout.svg);\n}\n.nav-items-container {\n  position: fixed;\n  padding-top: 32px;\n  width: 81px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  top: 0px;\n}\n.nav-item.active {\n  border-radius: 6px;\n  background: var(--Brand-600, #178C94);\n}\n/*# sourceMappingURL=dashboard.css.map */\n";
  }
});

// src/app/shared/services/auth/auth-service.ts
var AuthService;
var init_auth_service = __esm({
  "src/app/shared/services/auth/auth-service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http_service();
    init_error_log_service();
    init_errorParser();
    AuthService = class AuthService2 {
      httpServ;
      errorServ;
      constructor(httpServ, errorServ) {
        this.httpServ = httpServ;
        this.errorServ = errorServ;
        localStorage.getItem("admin") === "true" ? this.isLogged.set(true) : this.isLogged.set(false);
      }
      isLogged = signal(false);
      isLoggedIn() {
        return this.httpServ.meAdmin().subscribe({
          next: (res) => {
            this.isLogged.set(true);
            localStorage.setItem("admin", "true");
          },
          error: (err) => {
            this.errorServ.addError(parseError(err));
            if (err.error && err.status === 401) {
              localStorage.setItem("admin", "false");
            }
            this.isLogged.set(false);
            return false;
          }
        });
      }
      login(password) {
        return this.httpServ.logAdmin(password).subscribe({
          next: (res) => {
            this.isLogged.set(true);
            localStorage.setItem("admin", "true");
          },
          error: (err) => {
            this.errorServ.addError(parseError(err));
          }
        });
      }
      static ctorParameters = () => [
        { type: httpService },
        { type: ErrorLogService }
      ];
    };
    AuthService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], AuthService);
  }
});

// src/app/features/dashboard/dashboard.ts
var Dashboard;
var init_dashboard3 = __esm({
  "src/app/features/dashboard/dashboard.ts"() {
    "use strict";
    init_tslib_es6();
    init_dashboard();
    init_dashboard2();
    init_common();
    init_core();
    init_router();
    init_auth_service();
    Dashboard = class Dashboard2 {
      router;
      auth;
      constructor(router, auth) {
        this.router = router;
        this.auth = auth;
      }
      ngOnInit() {
        this.auth.isLoggedIn().add(() => {
          if (!this.auth.isLogged())
            this.router.navigate(["login"]);
        });
      }
      isRoute(route) {
        return window.location.pathname.includes(route);
      }
      navigate(route) {
        this.router.navigate([route]);
      }
      static ctorParameters = () => [
        { type: Router },
        { type: AuthService }
      ];
    };
    Dashboard = __decorate([
      Component({
        selector: "app-dashboard",
        imports: [RouterOutlet, CommonModule, RouterLink],
        template: dashboard_default,
        styles: [dashboard_default2]
      })
    ], Dashboard);
  }
});

// src/app/features/dashboard/dashboard.spec.ts
var require_dashboard_spec = __commonJS({
  "src/app/features/dashboard/dashboard.spec.ts"(exports) {
    init_testing();
    init_dashboard3();
    describe("Dashboard", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Dashboard]
        }).compileComponents();
        fixture = TestBed.createComponent(Dashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_dashboard_spec();
//# sourceMappingURL=spec-dashboard.spec.js.map
