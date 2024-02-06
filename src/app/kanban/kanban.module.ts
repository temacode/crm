import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ButtonComponent} from "../button/button.component";
import {HeaderComponent} from "../header/header.component";
import {KanbanColumnComponent} from "./components/kanban-column/kanban-column.component";
import {KanbanComponent} from "./kanban.component";
import {KanbanRouterModule} from "./kanban-router.module";
import {KanbanService} from "./services/kanban.service";

@NgModule({
    declarations: [KanbanComponent],
    imports: [
        KanbanRouterModule,
        KanbanColumnComponent,
        CommonModule,
        HeaderComponent,
        ButtonComponent,
    ],
    exports: [KanbanComponent],
    providers: [KanbanService],
})
export class KanbanModule {}
