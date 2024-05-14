import {Injectable, Type} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, combineLatest, map, merge, switchMap, take, tap} from 'rxjs';

import {OverlayService} from './overlay.service';

export interface CurtainContent {
    title: string;
    tpl?: Type<any>;
    completeWith: (result: any) => void;
}

@Injectable({providedIn: 'root'})
export class CurtainService {
    private readonly curtainsSubject$ = new BehaviorSubject<ReadonlyArray<CurtainContent>>([]);

    readonly curtains$ = this.curtainsSubject$.asObservable();

    open(title: string, tpl?: Type<any>): Observable<any> {
        return new Observable(observer => {
            const completeWith = (result: any): void => {
                observer.next(result);
                observer.complete();
            };

            const curtain = {
                title,
                tpl,
                completeWith,
            };

            this.curtainsSubject$.next([...this.curtainsSubject$.value, curtain]);

            return () => {
                this.curtainsSubject$.next(this.curtainsSubject$.value.filter(x => x !== curtain));
            };
        });
    }
}
