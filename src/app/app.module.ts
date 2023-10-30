import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {KanbanModule} from './kanban/kanban.module';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './common/interceptors/api.interceptor';
import {TokenInterceptor} from './common';
import {AuthService} from './auth/services/auth.service';
import {AuthModule} from './auth/auth.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        HeaderComponent,
        KanbanModule,
        ButtonComponent,
    ],
    exports: [],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        {
            provide: APP_BASE_HREF,
            useValue: '/',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
