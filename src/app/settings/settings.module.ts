import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ButtonComponent} from "../button/button.component";
import {HeaderComponent} from "../header/header.component";
import {SettingsComponent} from "./settings.component";
import {SettingsRouterModule} from "./settings-router.module";
import {ColumnSettingsComponent} from "./column-settings/column-settings.component";

@NgModule({
    declarations: [SettingsComponent, ColumnSettingsComponent],
    imports: [
        CommonModule,
        SettingsRouterModule,
        HeaderComponent,
        ButtonComponent,
    ],
})
export class SettingsModule {}
