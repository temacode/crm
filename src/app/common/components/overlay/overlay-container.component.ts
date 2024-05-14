import {Component} from '@angular/core';
import {OverlayService} from '../../services/overlay.service';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-overlay-container',
    templateUrl: './overlay-container.component.html',
    styleUrls: ['./overlay-container.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class OverlayContainerComponent {
    readonly overlayActive$ = this.overlayService.overlayActive$;

    constructor(readonly overlayService: OverlayService) {}

    overlayClicked(): void {
        this.overlayService.overlayClicked();
    }
}
