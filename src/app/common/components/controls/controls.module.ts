import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ControlErrorPipe} from "../../pipes";
import {InputControlComponent} from "./input-control/input-control.component";

@NgModule({
    declarations: [InputControlComponent, ControlErrorPipe],
    imports: [CommonModule],
    exports: [InputControlComponent],
})
export class ControlsModule {}
