import {Injectable} from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    catchError,
    map,
    of,
    take,
    tap,
} from 'rxjs';
import {Column} from '../interfaces/column.interface';
import {Task} from '../interfaces/tasl.interface';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from 'src/app/common/services/notification.service';

const description =
    'Сверстать подобие канбан доски и сделать возможжность перекидывать задачи между колонками';

@Injectable()
export class KanbanService {
    readonly columns$ = new BehaviorSubject<Column[]>([]);

    private readonly tasksSubject$ = new BehaviorSubject<Task[]>([
        {
            id: 1,
            columnId: 26,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 2,
            columnId: 26,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 3,
            columnId: 26,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 4,
            columnId: 26,
            title: 'Создать скелет канбана',
            description,
        },
    ]);

    readonly tasks$ = this.tasksSubject$.asObservable();

    // const a = new KanbanService(вот сюда)
    constructor(
        private readonly http: HttpClient,
        private readonly notificationService: NotificationService
    ) {}

    getTask(taskId: number): Task | undefined {
        return this.tasksSubject$.getValue().find((task) => task.id === taskId);
    }

    moveTask$(taskId: number, toColumnId: number): Observable<boolean> {
        return of(true).pipe(
            tap(() => {
                const updatedTask = this.getTask(taskId);

                if (updatedTask) {
                    updatedTask.columnId = toColumnId;
                    console.log(updatedTask);
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

    getColumns(): void {
        this.http
            .get<Column[]>(`/api/v1/todo/get-columns`)
            .pipe(take(1))
            .subscribe({
                next: (columns) => {
                    this.columns$.next(columns);
                },
                error: (errorBody: HttpErrorResponse) => {
                    this.notificationService.showNotification({
                        header: 'Что-то пошло не так',
                        text: errorBody.error.error,
                        type: 'error',
                    });
                },
            });
    }

    addColumn$(column: Pick<Column, 'title'>): Observable<boolean> {
        return this.http.post<Column>(`/api/v1/todo/add-column`, column).pipe(
            map(() => true),
            catchError((errorBody: HttpErrorResponse) => {
                this.notificationService.showNotification({
                    header: 'Что-то пошло не так',
                    text: errorBody.error.error,
                    type: 'error',
                });

                return of(false);
            })
        );
    }

    deleteColumn$(columnId: number): Observable<boolean> {
        return this.http
            .delete<Column>(`/api/v1/todo/delete-column`, {body: {columnId}})
            .pipe(
                map(() => true),
                catchError((errorBody: HttpErrorResponse) => {
                    this.notificationService.showNotification({
                        header: 'Что-то пошло не так',
                        text: errorBody.error.error,
                        type: 'error',
                    });

                    return of(false);
                })
            );
    }
}
