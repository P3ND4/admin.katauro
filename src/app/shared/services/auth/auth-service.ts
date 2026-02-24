import { ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { httpService } from '../http/http.service';
import { ErrorLogService } from '../errors/error.log.service';
import { parseError } from '../errors/errorParser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpServ: httpService, private errorServ: ErrorLogService) {
    localStorage.getItem('admin') === 'true' ? this.isLogged.set(true) : this.isLogged.set(false)
  }

  isLogged = signal(false);

  isLoggedIn() {
    return this.httpServ.meAdmin().subscribe({
      next: (res) => {
        this.isLogged.set(true);
        localStorage.setItem('admin', 'true');
      },
      error: (err) => {
        this.errorServ.addError(parseError(err));
        if (err.error && err.status === 401) {
          localStorage.setItem('admin', 'false');
        }
        this.isLogged.set(false);
        return false;
      }
    });
  }

  login(password: string) {
    return this.httpServ.logAdmin(password).subscribe(
      {
        next: (res) => {
          this.isLogged.set(true);
          localStorage.setItem('admin', 'true');
        },
        error: (err) => {
          this.errorServ.addError(parseError(err));

        }
      }
    );
  }


}
