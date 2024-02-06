import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

import {ButtonComponent} from "../button/button.component";
import {ControlsModule} from "../common";
import {AuthRouterModule} from "./auth-router.module";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

@NgModule({
    imports: [
        CommonModule,
        AuthRouterModule,
        ButtonComponent,
        ReactiveFormsModule,
        ControlsModule,
    ],
    exports: [],
    declarations: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
