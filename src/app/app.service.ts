import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, tap} from 'rxjs';

export interface UserInfo {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    email: string;
}

@Injectable()
export class AppService {
    readonly user$ = new BehaviorSubject<UserInfo | null>(null);

    constructor(private readonly http: HttpClient) {}

    getUserInfo$(): Observable<UserInfo> {
        return this.http.get<UserInfo>(`/api/v1/service/user`).pipe(
            tap((userInfo) => {
                this.user$.next(userInfo);
            })
        );
    }
}
