import {Injectable} from "@angular/core";
import {ReplaySubject, Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class OverlayService {
    readonly showOverlay$ = new ReplaySubject<boolean>(1);
    private readonly click = new Subject();
    readonly overlayClicked$ = this.click.asObservable();

    showOverlay(value: boolean): void {
        this.showOverlay$.next(value);
    }

    overlayClick(): void {
        this.click.next(true);
    }
}
