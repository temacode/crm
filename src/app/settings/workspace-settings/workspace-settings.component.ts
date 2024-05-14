import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CurtainService} from '@common';
import {BehaviorSubject, ReplaySubject, Subject, tap} from 'rxjs';
import {ButtonComponent} from 'src/app/button/button.component';

@Component({
    selector: 'app-workspace-settings',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './workspace-settings.component.html',
    styleUrls: ['./workspace-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceSettingsComponent {
    readonly subject$ = new ReplaySubject(1);
    readonly obs$ = this.subject$.asObservable().pipe(tap(() => console.log('subscribed!')));

    constructor(private readonly curtainService: CurtainService) {}

    createWorkspace() {
        const sub = this.curtainService.open('Создать воркспейс').subscribe();

        setTimeout(() => {
            this.curtainService.open('Создать воркспейс').subscribe();
            //sub.unsubscribe();
        }, 2000);
    }

    open() {
        this.subject$.next('lol');
    }
}
