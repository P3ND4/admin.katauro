import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLogged()) {
    return true;
  }
  return router.createUrlTree(['/login'], {
    queryParams: {
      message: 'Debes iniciar sesión para acceder a esta página',
      returnUrl: state.url
    }
  });;
};
