import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router) { }
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // check if the user is logged in
        if (localStorage.getItem(environment.tokenStorageKey)) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}