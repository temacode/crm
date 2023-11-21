import {
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import {OverlayService} from '../../services/overlay.service';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
    @Input()
    @HostBinding('class.visible')
    visible: boolean;

    constructor(private readonly overlayService: OverlayService) {}

    @HostListener('click')
    emitClick() {
        this.overlayService.overlayClick();
    }
}
