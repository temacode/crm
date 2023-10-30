import {Component} from '@angular/core';

@Component({
    selector: 'app-input-control',
    templateUrl: './input-control.component.html',
    styleUrls: ['./input-control.component.scss'],
})
export class InputControlComponent {
    checkErrorState(): boolean {
        return false;
    }
}
