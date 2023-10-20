import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { KanbanModule } from './kanban/kanban.module';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HeaderComponent,
        KanbanModule,
        ButtonComponent,
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
