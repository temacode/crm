import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";

import {SettingsComponent} from "./settings.component";

const routes: Route[] = [{path: "", component: SettingsComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRouterModule {}
