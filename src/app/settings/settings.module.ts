import {NgModule} from '@angular/core';
import {SettingsComponent} from './settings.component';
import {SettingsRouterModule} from './settings-router.module';
import {HeaderComponent} from '../header/header.component';
import {ButtonComponent} from '../button/button.component';

@NgModule({
    declarations: [SettingsComponent],
    imports: [SettingsRouterModule, HeaderComponent, ButtonComponent],
})
export class SettingsModule {}
