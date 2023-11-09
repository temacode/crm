import {Router} from '@angular/router';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, switchMap, throwError} from 'rxjs';
import {LocalStorageService} from '../services';
import {ACCESS_TOKEN_KEY} from '../consts';
import {AuthService} from 'src/app/auth/services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private readonly localStorageService: LocalStorageService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });

        return next.handle(req).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    req.url.includes('api') &&
                    !req.url.includes('auth') &&
                    (error.status === 403 || error.status === 401)
                ) {
                    return this.handle401Error(req, next);
                }

                return throwError(() => error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.localStorageService.getValue(ACCESS_TOKEN_KEY)) {
            this.router.navigateByUrl('/auth/login');

            return throwError(() => request);
        }

        return this.authService.refreshToken().pipe(
            switchMap(() => {
                return next.handle(request);
            }),
            catchError((error) => {
                if (error.status == 401) {
                    this.localStorageService.deleteValue(ACCESS_TOKEN_KEY);
                    this.router.navigateByUrl('/auth/login');
                }

                return throwError(() => error);
            })
        );
    }
}
