import {Injectable, Type} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {OverlayService} from './overlay.service';
import {CurtainContent} from '../components';

@Injectable({providedIn: 'root'})
export class CurtainService {
    readonly showCurtain$ = new ReplaySubject<CurtainContent>(1);

    constructor(private readonly overlayService: OverlayService) {}

    showCurtain(title: string, tpl: Type<any>): void {
        const content: CurtainContent = {
            title,
            tpl,
        };

        this.overlayService.showOverlay(true);
        this.showCurtain$.next(content);
    }

    closeCurtain(): void {
        this.overlayService.overlayClick();
    }
}
