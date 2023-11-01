import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {AuthRouterModule} from './auth-router.module';
import {AuthService} from './services/auth.service';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from '../common/interceptors/api.interceptor';
import {ControlsModule, TokenInterceptor} from '../common';
import {ButtonComponent} from '../button/button.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

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
