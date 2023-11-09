import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {
    BehaviorSubject,
    Observable,
    catchError,
    map,
    of,
    tap,
    throwError,
} from 'rxjs';
import {
    ACCESS_TOKEN_KEY,
    LocalStorageService,
    REFRESH_TOKEN_KEY,
} from 'src/app/common';
import {NotificationService} from 'src/app/common/services/notification.service';
import {Router} from '@angular/router';

export interface RegisterCredentials {
    name: string;
    surname: string;
    email: string;
    nickname: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    id: number;
    name: string;
    surname: string;
    login: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class AuthService {
    token$ = new BehaviorSubject<string | null>(this.getToken());

    constructor(
        private readonly http: HttpClient,
        private readonly localStorageService: LocalStorageService,
        private readonly router: Router
    ) {}

    register$(credentials: RegisterCredentials): Observable<boolean> {
        return this.http
            .post<boolean>(`/api/v1/auth/register`, {
                ...credentials,
            })
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    return throwError(
                        () => response.error.error ?? 'Что-то пошло не так'
                    );
                })
            );
    }

    test$(): Observable<boolean> {
        return this.http.get<boolean>(`/api/v1/test`);
    }

    login$(credentials: LoginCredentials): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`/api/v1/auth/login`, credentials)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    return throwError(
                        () => response.error.error ?? 'Что-то пошло не так'
                    );
                }),
                tap((res) => {
                    this.setToken(res.accessToken);
                })
            );
    }

    logout(): void {
        this.deleteToken();

        this.router.navigateByUrl('/auth/login');
    }

    refreshToken(): Observable<{accessToken: string}> {
        return this.http
            .get<{accessToken: string}>(`/api/v1/auth/refresh-token`)
            .pipe(
                tap((res) => {
                    if (res.accessToken) {
                        this.setToken(res.accessToken);
                    }
                })
            );
    }

    setToken(token: string): void {
        this.token$.next(token);
        this.localStorageService.setValue<string>(ACCESS_TOKEN_KEY, token);
    }

    getToken(): string | null {
        return this.localStorageService.getValue<string>(ACCESS_TOKEN_KEY);
    }

    deleteToken(): void {
        this.token$.next(null);
        this.localStorageService.deleteValue(ACCESS_TOKEN_KEY);
    }

    checkNicknameAvailability(nickname: string): Observable<boolean> {
        return this.http.post<boolean>(`api/v1/auth/check-nickname`, {
            nickname,
        });
    }
}
