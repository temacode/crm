import {NgModule} from '@angular/core';
import {InputControlComponent} from './input-control/input-control.component';
import {ControlErrorPipe} from '../../pipes';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [InputControlComponent, ControlErrorPipe],
    imports: [CommonModule],
    exports: [InputControlComponent],
})
export class ControlsModule {}
