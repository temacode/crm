import {Component, OnInit} from '@angular/core';
import {KanbanService} from './services/kanban.service';

@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
    readonly columns$ = this.kanbanService.columns$;
    readonly tasks$ = this.kanbanService.tasks$;

    constructor(private readonly kanbanService: KanbanService) {}
}
