import {Injectable, ViewContainerRef} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {NotificationContent} from '../components';

@Injectable({providedIn: 'root'})
export class NotificationService {
    readonly events$ = new ReplaySubject<NotificationContent>(1);

    constructor() {}

    showNotification(data: NotificationContent): void {
        this.events$.next(data);
    }
}
