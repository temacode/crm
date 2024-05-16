import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {CurtainService} from '../../services/curtain.service';
import {CommonModule} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {OverlayService} from '../../services/overlay.service';
import {Subscription, tap} from 'rxjs';

@Component({
    selector: 'app-curtain-container',
    templateUrl: './curtain-container.component.html',
    styleUrls: ['./curtain-container.component.scss'],
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('hiddenCurtain', [
            transition('void => *', [style({right: '-600px'}), animate('0.1s', style({right: '0px'}))]),
            transition('* => void', [animate('0.1s', style({right: '-600px'}))]),
        ]),
    ],
})
export class CurtainContainerComponent {
    @ViewChild('curtiainContainer', {
        read: ViewContainerRef,
    })
    curtiainContainer: ViewContainerRef;

    private overlaySub: Subscription = Subscription.EMPTY;

    readonly curtains$ = this.curtainService.curtains$.pipe(
        tap(curtains => {
            if (curtains.length > 0) {
                this.overlayService.open();
                this.overlaySub.unsubscribe();

                this.overlaySub = this.overlayService.overlayClicked$.subscribe(() => {
                    curtains[curtains.length - 1].completeWith(null);
                });
            } else {
                this.overlayService.close();
                this.overlaySub.unsubscribe();
            }
        }),
    );

    constructor(
        private readonly curtainService: CurtainService,
        private readonly overlayService: OverlayService,
    ) {}
}
