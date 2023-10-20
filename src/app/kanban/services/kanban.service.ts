import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Column } from '../interfaces/column.interface';
import { Task } from '../interfaces/tasl.interface';

const description =
    'Сверстать подобие канбан доски и сделать возможжность перекидывать задачи между колонками';

@Injectable()
export class KanbanService {
    readonly columns$ = new BehaviorSubject<Column[]>([
        { id: 1, title: 'Беклог' },
        { id: 2, title: 'Запланировано' },
        { id: 3, title: 'В процессе' },
        { id: 4, title: 'Выполнено' },
    ]);

    private readonly tasksSubject$ = new BehaviorSubject<Task[]>([
        {
            id: 1,
            columnId: 1,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 2,
            columnId: 1,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 3,
            columnId: 1,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 4,
            columnId: 1,
            title: 'Создать скелет канбана',
            description,
        },
    ]);

    readonly tasks$ = this.tasksSubject$.asObservable();

    getTask(taskId: number): Task | undefined {
        return this.tasksSubject$.getValue().find((task) => task.id === taskId);
    }

    moveTask$(taskId: number, toColumnId: number): Observable<boolean> {
        return of(true).pipe(
            tap(() => {
                const updatedTask = this.getTask(taskId);

                if (updatedTask) {
                    updatedTask.columnId = toColumnId;
                    //TODO: Запрос на бек

                    this.tasksSubject$.next([
                        ...this.tasksSubject$
                            .getValue()
                            .map((task) =>
                                task.id === taskId ? updatedTask : task
                            ),
                    ]);
                }
            }),
            map(() => true)
        );
    }
}
