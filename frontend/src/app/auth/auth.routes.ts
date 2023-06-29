import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const AUTH_ROUTES: Route[] = [
    { path: 'sign-in', component: LoginComponent },
    { path: 'sign-up', component: RegisterComponent },
];