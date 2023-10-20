import { NgModule } from '@angular/core';
import { KanbanComponent } from './kanban.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanService } from './services/kanban.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [KanbanComponent],
    imports: [KanbanColumnComponent, CommonModule],
    exports: [KanbanComponent],
    providers: [KanbanService],
})
export class KanbanModule {}
