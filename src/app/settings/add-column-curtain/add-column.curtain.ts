import {Component} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {tap} from 'rxjs';
import {ButtonComponent} from 'src/app/button/button.component';
import {ControlsModule} from 'src/app/common';
import {CurtainService} from 'src/app/common/services/curtain.service';
import {NotificationService} from 'src/app/common/services/notification.service';
import {Column} from 'src/app/kanban/interfaces/column.interface';
import {KanbanService} from 'src/app/kanban/services/kanban.service';

@Component({
    templateUrl: './add-column.curtain.html',
    styleUrls: ['./add-column.curtain.scss'],
    standalone: true,
    imports: [ButtonComponent, ControlsModule, ReactiveFormsModule],
})
export class AddColumnCurtain {
    readonly addColumnForm = this.fb.group({
        title: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
    });

    constructor(
        private readonly fb: FormBuilder,
        private readonly kanbanService: KanbanService,
        private readonly curtainService: CurtainService,
        private readonly notificationService: NotificationService
    ) {}

    submit() {
        this.addColumnForm.markAllAsTouched();

        if (!this.addColumnForm.valid) {
            return;
        }

        const column: Pick<Column, 'title'> = this.addColumnForm.getRawValue();

        this.kanbanService
            .addColumn$(column)
            .pipe(tap(() => this.kanbanService.getColumns()))
            .subscribe((result) => {
                if (result) {
                    this.notificationService.showNotification({
                        header: 'Колонка успешно добавлена',
                        type: 'success',
                    });
                    this.curtainService.closeCurtain();
                }
            });
    }
}
