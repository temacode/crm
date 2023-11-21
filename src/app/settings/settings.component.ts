import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {OverlayService} from '../common/services/overlay.service';
import {CurtainService} from '../common/services/curtain.service';
import {AddColumnCurtain} from './add-column-curtain/add-column.curtain';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    constructor(
        private readonly router: Router,
        private readonly overlayService: OverlayService,
        private readonly curtainService: CurtainService
    ) {}

    navigateToMain() {
        this.router.navigateByUrl('/');
    }

    addColumn() {
        this.curtainService.showCurtain('Добавить колонку', AddColumnCurtain);
    }
}
