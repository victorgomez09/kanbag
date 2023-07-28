import { Route } from "@angular/router";
import { LoginComponent } from "./login.component";

export const LOGIN_ROUTES: Route[] = [
    {
        path: 'sign-in',
        component: LoginComponent
    }
]