import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CurtainService, NotificationService} from '@common';
import {BehaviorSubject, ReplaySubject, Subject, tap} from 'rxjs';
import {ButtonComponent} from 'src/app/button/button.component';
import {AddWorkspaceCurtain} from './add-workspace-curtain/add-workspace.curtain';
import {KanbanService} from '@kanban';

@Component({
    selector: 'app-workspace-settings',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './workspace-settings.component.html',
    styleUrls: ['./workspace-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceSettingsComponent implements OnInit {
    readonly subject$ = new ReplaySubject(1);
    readonly workspaces$ = this.kanbanService.workspaces$;

    readonly obs$ = this.subject$.asObservable().pipe(tap(() => console.log('subscribed!')));

    constructor(
        private readonly curtainService: CurtainService,
        private readonly kanbanService: KanbanService,
        private readonly notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.kanbanService.getWorkspaces();
    }

    createWorkspace() {
        const sub = this.curtainService.open('Создать воркспейс', AddWorkspaceCurtain).subscribe();
    }

    deleteWorkspace(workspaceId: number): void {
        this.kanbanService
            .deleteWorkspace$(workspaceId)
            .pipe(tap(() => this.kanbanService.getWorkspaces()))
            .subscribe(result => {
                if (result) {
                    this.notificationService.showNotification({
                        header: 'Рабочее пространство успешно удалено',
                    });
                }
            });
    }

    open() {
        this.subject$.next('lol');
    }
}
