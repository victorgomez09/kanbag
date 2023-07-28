import { Route } from "@angular/router";
import { RegisterComponent } from "./register.component";

export const REGISTER_ROUTES: Route[] = [
    {
        path: 'sign-up',
        component: RegisterComponent
    }
]