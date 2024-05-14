import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

interface OverlayConfig {
    close: () => void;
}

@Injectable({providedIn: 'root'})
export class OverlayService {
    private readonly overlayActiveSubject$ = new BehaviorSubject<boolean>(false);
    readonly overlayActive$ = this.overlayActiveSubject$.asObservable();

    private readonly overlayClickedSubject$ = new Subject<void>();
    readonly overlayClicked$ = this.overlayClickedSubject$.asObservable();

    open(): void {
        this.overlayActiveSubject$.next(true);
    }

    close(): void {
        this.overlayActiveSubject$.next(false);
    }

    overlayClicked(): void {
        this.overlayClickedSubject$.next();
    }
}
