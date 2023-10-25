import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';

const routes: Route[] = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'register',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class AuthRouterModule {}
