import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {OverlayService} from '../common/services/overlay.service';
import {CurtainService} from '../common/services/curtain.service';
import {AddColumnCurtain} from './add-column-curtain/add-column.curtain';
import {KanbanService} from '../kanban/services/kanban.service';
import {Column} from '../kanban/interfaces/column.interface';
import {NotificationService} from '../common/services/notification.service';
import {tap} from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    readonly columns$ = this.kanbanService.columns$;

    constructor(
        private readonly router: Router,
        private readonly curtainService: CurtainService,
        private readonly kanbanService: KanbanService,
        private readonly notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.kanbanService.getColumns();
    }

    navigateToMain() {
        this.router.navigateByUrl('/');
    }

    addColumn() {
        this.curtainService.showCurtain('Добавить колонку', AddColumnCurtain);
    }

    deleteColumn(columnId: number) {
        console.log(columnId);
        this.kanbanService
            .deleteColumn$(columnId)
            .pipe(tap(() => this.kanbanService.getColumns()))
            .subscribe((result) => {
                if (result) {
                    this.notificationService.showNotification({
                        header: 'Колонка успешно удалена',
                    });
                }
            });
    }
}
