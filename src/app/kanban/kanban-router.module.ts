import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";

import {KanbanComponent} from "./kanban.component";

const routes: Route[] = [
    {
        path: "",
        component: KanbanComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class KanbanRouterModule {}
