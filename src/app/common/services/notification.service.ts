import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

export interface NotificationContent {
    header: string;
    text?: string;
    timeout?: number;
    type?: "success" | "error" | "warning";
}

@Injectable({providedIn: "root"})
export class NotificationService {
    readonly events$ = new ReplaySubject<NotificationContent>(1);

    showNotification(data: NotificationContent): void {
        this.events$.next(data);
    }
}
