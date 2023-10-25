import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {AuthRouterModule} from './auth-router.module';
import {AuthService} from './services/auth.service';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from '../common/interceptors/api.interceptor';
import {TokenInterceptor} from '../common';

@NgModule({
    imports: [AuthRouterModule],
    exports: [],
    declarations: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
