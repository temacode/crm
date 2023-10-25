import {NgModule} from '@angular/core';
import {KanbanComponent} from './kanban.component';
import {KanbanColumnComponent} from './components/kanban-column/kanban-column.component';
import {KanbanService} from './services/kanban.service';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {ButtonComponent} from '../button/button.component';
import {KanbanRouterModule} from './kanban-router.module';

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
