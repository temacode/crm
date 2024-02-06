import {
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    Renderer2,
    ViewContainerRef,
} from "@angular/core";

import {Task} from "../../interfaces/tasl.interface";

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

    constructor(
        private readonly r2: Renderer2,
        private readonly el: ElementRef,
        private readonly vcr: ViewContainerRef
    ) {}

    @HostListener("dragstart", ["$event"])
    drag($event: DragEvent): void {
        if ($event.dataTransfer) {
            $event.dataTransfer.setData("string", this.task.id.toString());
        }
    }
}
