import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

type ButtonAppearance = 'regular' | 'outline' | 'flat';
type ButtonSize = 's' | 'm' | 'l';
type ButtonType = 'button' | 'submit' | 'link';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
})
export class ButtonComponent {
    @Input()
    set appearance(value: ButtonAppearance) {
        this._appearance = value;
    }

    get appearance(): ButtonAppearance {
        return this._appearance;
    }

    @Input()
    set size(value: ButtonSize) {
        this._size = value;
    }

    get size(): ButtonSize {
        return this._size;
    }

    @Input()
    set buttonType(value: ButtonType) {
        this._buttonType = value;
    }

    get buttonType(): ButtonType {
        return this._buttonType;
    }

    private _appearance: ButtonAppearance = 'regular';
    private _size: ButtonSize = 'm';
    private _buttonType: ButtonType = 'button';
}
