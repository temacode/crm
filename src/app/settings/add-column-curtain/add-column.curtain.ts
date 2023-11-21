import {Component} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {ButtonComponent} from 'src/app/button/button.component';
import {ControlsModule} from 'src/app/common';

@Component({
    templateUrl: './add-column.curtain.html',
    styleUrls: ['./add-column.curtain.scss'],
    standalone: true,
    imports: [ButtonComponent, ControlsModule, ReactiveFormsModule],
})
export class AddColumnCurtain {
    readonly addColumnForm = this.fb.group({
        name: new FormControl('', [Validators.required]),
    });
    constructor(private readonly fb: FormBuilder) {}
}
