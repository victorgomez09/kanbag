import { Inject, Injectable, inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { $user } from '../store/user.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private authService: AuthService = inject(AuthService);

  constructor(private router: Router) { }

  canActivate(_router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if the user is logged in
    if (localStorage.getItem(environment.tokenStorageKey)) {
      this.authService.getMe().subscribe((result) => {
        console.log('getting user from database');

        if (result.success) $user.next(result.data);
      });
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/sign-in'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
