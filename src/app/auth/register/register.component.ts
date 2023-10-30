import {Component} from '@angular/core';
import {AuthService, RegisterCredentials} from '../services/auth.service';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';

const checkPasswords: ValidatorFn = (
    group: AbstractControl
): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let passwordRepeat = group.get('passwordRepeat')?.value;

    if (!password || !passwordRepeat) {
        return {required: true};
    }

    return password === passwordRepeat ? null : {passwordsNotSame: true};
};

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    readonly form = this.fb.group(
        {
            name: new FormControl('Артем', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            nickname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            passwordRepeat: new FormControl('', [Validators.required]),
        },
        {validators: [checkPasswords], updateOn: 'blur'}
    );
    constructor(
        private readonly authService: AuthService,
        private readonly fb: FormBuilder
    ) {}

    checkErrorState(control: AbstractControl): boolean {
        return !control.valid && control.touched;
    }

    checkPasswordError(): boolean {
        if (this.form.errors && this.form.controls.passwordRepeat.dirty) {
            return this.form.errors['passwordsNotSame'];
        }

        return false;
    }

    register(): void {
        this.form.markAllAsTouched();

        if (!this.form.valid) {
            return;
        }

        const credentials: RegisterCredentials = {
            name: this.form.value.name!,
            surname: this.form.value.surname!,
            email: this.form.value.email!,
            nickname: this.form.value.nickname!,
            password: this.form.value.password!,
        };

        this.authService.register$(credentials).subscribe();
    }
}
