import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ButtonComponent} from "../button/button.component";
import {HeaderComponent} from "../header/header.component";
import {SettingsComponent} from "./settings.component";
import {SettingsRouterModule} from "./settings-router.module";

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        SettingsRouterModule,
        HeaderComponent,
        ButtonComponent,
    ],
})
export class SettingsModule {}
