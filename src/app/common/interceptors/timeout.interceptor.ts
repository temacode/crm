import {NotificationService} from './../services/notification.service';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, catchError, tap, throwError} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly router: Router
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status >= 500) {
                    return this.handle500Error(request, next);
                }

                return throwError(() => error);
            })
        );
    }

    private handle500Error(request: HttpRequest<any>, next: HttpHandler) {
        this.notificationService.showNotification({
            header: 'Что-то пошло не так',
            text: 'Попробуйте перезагрузить страницу или повторите попытку позже',
            type: 'error',
        });

        this.router.navigateByUrl('/auth/login');

        return throwError(() => request);
    }
}
