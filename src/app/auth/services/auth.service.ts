import {LocalStorageService} from './../../../../.history/src/app/common/services/local-storage.service_20231026001758';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {ACCESS_TOKEN_KEY} from 'src/app/common';

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
    token$ = new BehaviorSubject<string | null>(
        this.localStorageService.getValue<string>(ACCESS_TOKEN_KEY)
    );

    constructor(
        private readonly http: HttpClient,
        private readonly localStorageService: LocalStorageService
    ) {}

    register$(credentials: RegisterCredentials): Observable<boolean> {
        return this.http.post<boolean>(`/api/v1/auth/register`, {
            ...credentials,
        });
    }

    test$(): Observable<boolean> {
        return this.http.get<boolean>(`/api/v1/test`);
    }

    login$(credentials: LoginCredentials): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`/api/v1/auth/login`, credentials)
            .pipe(
                tap((res) => {
                    if (res.accessToken) {
                        this.setToken(res.accessToken);
                    }
                })
            );
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

    checkNicknameAvailability(): Observable<boolean> {
        return this.http.get<boolean>(`api/v1/auth/nickname-check`);
    }
}
