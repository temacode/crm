import {CommonModule} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
} from "@angular/core";

import {NotificationContent} from "../../../services";

@Component({
    selector: "app-toast",
    templateUrl: "./toast.component.html",
    styleUrls: ["./toast.component.scss"],
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
    @Input()
        data: NotificationContent;

    @Input()
    @HostBinding("class.visible")
        visible: boolean;

    @Input()
    @HostBinding("class.removed")
        removed = false;
}
