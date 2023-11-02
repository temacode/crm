import {
    Component,
    ElementRef,
    Injector,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewContainerRef,
    ViewRef,
} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Subscription, take} from 'rxjs';
import {ToastComponent} from './toast/toast.component';

export interface NotificationContent {
    header: string;
    text?: string;
    timeout?: number;
    type?: 'success' | 'error' | 'warning';
}

const DEFAULT_TOAST_TIMEOUT = 3000;

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    standalone: true,
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('dynamic', {
        read: ViewContainerRef,
    })
    viewContainerRef: ViewContainerRef;
    readonly events$ = this.notificationService.events$;

    private eventSub: Subscription;

    constructor(
        private readonly notificationService: NotificationService,
        private readonly injector: Injector
    ) {}

    ngOnInit(): void {
        this.eventSub = this.events$.subscribe((data) => {
            const toast = this.viewContainerRef.createComponent(
                ToastComponent,
                {
                    injector: this.injector,
                }
            );

            toast.instance.data = data;
            setTimeout(() => {
                toast.instance.visible = true;
            }, 100);

            setTimeout(() => {
                toast.instance.visible = false;

                setTimeout(() => {
                    toast.instance.removed = true;

                    setTimeout(() => {
                        toast.destroy();
                    }, 300);
                }, 300);
            }, data.timeout ?? DEFAULT_TOAST_TIMEOUT);
        });
    }

    ngOnDestroy(): void {
        this.eventSub.unsubscribe();
    }
}
