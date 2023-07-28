import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { UserState } from '../store/user.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private authService: AuthService = inject(AuthService);
  private userState: UserState = inject(UserState);

  constructor(private router: Router) { }

  canActivate(_router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if the user is logged in
    if (localStorage.getItem(environment.tokenStorageKey)) {
      this.authService.getMe().subscribe((result) => {
        if (result.success) this.userState.setUser(result.data);
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
