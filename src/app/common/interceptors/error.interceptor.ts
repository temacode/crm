import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

import {NotificationService} from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private readonly notificationService: NotificationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (
                    error instanceof HttpErrorResponse &&
                    req.url.includes('api') &&
                    !req.url.includes('auth') &&
                    error.status >= 500
                ) {
                    return this.handle500Error(req, next);
                }

                return throwError(() => error);
            }),
        );
    }

    private handle500Error(request: HttpRequest<any>, next: HttpHandler) {
        this.notificationService.showNotification({
            type: 'error',
            header: 'Что-то пошло не так',
        });

        return;
    }
}
