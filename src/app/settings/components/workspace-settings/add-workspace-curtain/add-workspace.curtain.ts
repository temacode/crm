import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {tap} from 'rxjs';
import {ButtonComponent} from 'src/app/button/button.component';
import {ControlsModule, lengthValidator} from 'src/app/common';
import {NotificationService} from 'src/app/common/services/notification.service';
import {Workspace} from 'src/app/kanban/interfaces';
import {KanbanService} from 'src/app/kanban/services/kanban.service';

@Component({
    templateUrl: './add-workspace.curtain.html',
    styleUrls: ['./add-workspace.curtain.scss'],
    standalone: true,
    imports: [ButtonComponent, ControlsModule, ReactiveFormsModule],
})
export class AddWorkspaceCurtain {
    @Input()
    completeWith: () => void;

    readonly addWorkspaceForm = this.fb.group({
        title: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        description: new FormControl('', {
            validators: [lengthValidator(255)],
            nonNullable: true,
        }),
    });

    constructor(
        private readonly fb: FormBuilder,
        private readonly kanbanService: KanbanService,
        private readonly notificationService: NotificationService,
    ) {}

    submit() {
        this.addWorkspaceForm.markAllAsTouched();

        if (!this.addWorkspaceForm.valid) {
            return;
        }

        const workspace: Pick<Workspace, 'title' | 'description'> = this.addWorkspaceForm.getRawValue();

        this.kanbanService
            .addWorkspace$({title: workspace.title, description: workspace.description})
            .pipe(tap(() => this.kanbanService.getWorkspaces()))
            .subscribe(result => {
                if (result) {
                    this.notificationService.showNotification({
                        header: 'Рабочее пространство успешно создано',
                        type: 'success',
                    });

                    this.completeWith();
                }
            });
    }
}
