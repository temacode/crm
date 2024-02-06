import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Route[] = [
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "register",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRouterModule {}
