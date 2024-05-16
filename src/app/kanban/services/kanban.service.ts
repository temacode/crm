import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, take, tap} from 'rxjs';
import {NotificationService} from 'src/app/common/services/notification.service';

import {Column} from '../interfaces/column.interface';
import {Task} from '../interfaces/task.interface';
import {Workspace, WorkspaceDto} from '../interfaces';

const description = 'Сверстать подобие канбан доски и сделать возможжность перекидывать задачи между колонками';

@Injectable()
export class KanbanService {
    readonly columns$ = new BehaviorSubject<Column[]>([]);
    readonly workspaces$ = new BehaviorSubject<Workspace[]>([]);
    readonly columnId = 27;

    private readonly tasksSubject$ = new BehaviorSubject<Task[]>([
        {
            id: 1,
            columnId: this.columnId,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 2,
            columnId: this.columnId,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 3,
            columnId: this.columnId,
            title: 'Создать скелет канбана',
            description,
        },
        {
            id: 4,
            columnId: this.columnId,
            title: 'Создать скелет канбана',
            description,
        },
    ]);

    readonly tasks$ = this.tasksSubject$.asObservable();

    // const a = new KanbanService(вот сюда)
    constructor(
        private readonly http: HttpClient,
        private readonly notificationService: NotificationService,
    ) {}

    getTask(taskId: number): Task | undefined {
        return this.tasksSubject$.getValue().find(task => task.id === taskId);
    }

    moveTask$(taskId: number, toColumnId: number): Observable<boolean> {
        return of(true).pipe(
            tap(() => {
                const updatedTask = this.getTask(taskId);

                if (updatedTask) {
                    updatedTask.columnId = toColumnId;
                    console.log(updatedTask);
                    // TODO: Запрос на бек

                    this.tasksSubject$.next([
                        ...this.tasksSubject$.getValue().map(task => (task.id === taskId ? updatedTask : task)),
                    ]);
                }
            }),
            map(() => true),
        );
    }

    getColumns(): void {
        this.http
            .get<Column[]>('/api/v1/todo/get-columns')
            .pipe(take(1))
            .subscribe({
                next: columns => {
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
        return this.http.post<Column>('/api/v1/todo/add-column', column).pipe(
            map(() => true),
            catchError((errorBody: HttpErrorResponse) => {
                this.notificationService.showNotification({
                    header: 'Что-то пошло не так',
                    text: errorBody.error.error,
                    type: 'error',
                });

                return of(false);
            }),
        );
    }

    deleteColumn$(columnId: number): Observable<boolean> {
        return this.http.delete<Column>('/api/v1/todo/delete-column', {body: {columnId}}).pipe(
            map(() => true),
            catchError((errorBody: HttpErrorResponse) => {
                this.notificationService.showNotification({
                    header: 'Что-то пошло не так',
                    text: errorBody.error.error,
                    type: 'error',
                });

                return of(false);
            }),
        );
    }

    getWorkspaces(): void {
        this.http
            .get<WorkspaceDto[]>('/api/v1/todo/get-workspaces')
            .pipe(
                take(1),
                map<WorkspaceDto[], Workspace[]>(workspaces => workspaces.map(x => ({...x, userId: x.user_id}))),
            )
            .subscribe({
                next: workspaces => {
                    this.workspaces$.next(workspaces);
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

    addWorkspace$(workspace: Pick<Workspace, 'title' | 'description'>): Observable<boolean> {
        return this.http
            .post<boolean>('/api/v1/todo/add-workspace', {title: workspace.title, description: workspace.description})
            .pipe(
                map(() => true),
                catchError((errorBody: HttpErrorResponse) => {
                    this.notificationService.showNotification({
                        header: 'Что-то пошло не так',
                        text: errorBody.error.error,
                        type: 'error',
                    });

                    return of(false);
                }),
            );
    }

    deleteWorkspace$(workspaceId: number): Observable<boolean> {
        return this.http.delete<Column>('/api/v1/todo/delete-workspace', {body: {workspaceId}}).pipe(
            map(() => true),
            catchError((errorBody: HttpErrorResponse) => {
                this.notificationService.showNotification({
                    header: 'Что-то пошло не так',
                    text: errorBody.error.error,
                    type: 'error',
                });

                return of(false);
            }),
        );
    }
}
