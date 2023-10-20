import {Component, HostBinding, HostListener, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from '../task/task.component';
import {Column} from '../../interfaces/column.interface';
import {Task} from '../../interfaces/tasl.interface';
import {KanbanService} from '../../services/kanban.service';
import {take} from 'rxjs';

@Component({
    selector: 'app-kanban-column',
    templateUrl: './kanban-column.component.html',
    styleUrls: ['./kanban-column.component.scss'],
    standalone: true,
    imports: [CommonModule, TaskComponent],
})
export class KanbanColumnComponent {
    @Input()
    column: Column;

    @Input()
    set tasks(value: Task[]) {
        this._tasks = value.filter((task) => task.columnId === this.column.id);
    }

    get tasks(): Task[] {
        return this._tasks;
    }

    @HostBinding('class.dragover') isDragOver = false;

    private _tasks: Task[];

    constructor(private readonly kanbanService: KanbanService) {}

    @HostListener('dragover', ['$event'])
    dragover($event: DragEvent): void {
        $event.preventDefault();
        this.isDragOver = true;
    }

    @HostListener('dragleave')
    dragleave(): void {
        this.isDragOver = false;
    }

    @HostListener('drop', ['$event'])
    drop($event: DragEvent): void {
        $event.preventDefault();

        this.isDragOver = false;

        const taskId = Number($event.dataTransfer?.getData('string'));

        if (isNaN(taskId)) {
            return;
        }

        const task = this.kanbanService.getTask(taskId);

        if (task?.columnId !== this.column.id) {
            this.kanbanService
                .moveTask$(taskId, this.column.id)
                .pipe(take(1))
                .subscribe();
        }
    }
}
