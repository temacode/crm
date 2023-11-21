import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OverlayService {
    readonly showOverlay$ = new ReplaySubject<boolean>(1);
    private readonly click = new Subject();
    readonly overlayClicked$ = this.click.asObservable();

    constructor() {}

    showOverlay(value: boolean): void {
        this.showOverlay$.next(value);
    }

    overlayClick(): void {
        this.click.next(true);
    }
}
