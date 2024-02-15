import {Component, HostBinding, HostListener, Input} from "@angular/core";

import {Task} from "../../interfaces/task.interface";

@Component({
    selector: "app-task",
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"],
    standalone: true,
})
export class TaskComponent {
    @Input()
    task: Task;

    @HostBinding("attr.draggable") draggable = true;

    @HostListener("dragstart", ["$event"])
    drag($event: DragEvent): void {
        if ($event.dataTransfer) {
            $event.dataTransfer.setData("string", this.task.id.toString());
        }
    }
}
