import {Component, OnInit} from '@angular/core';
import {AuthService, RegisterCredentials} from '../services/auth.service';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import {map, switchMap, timer, catchError, of, filter} from 'rxjs';
import {ValidationErrorsEnum} from 'src/app/common';
import {NotificationService} from 'src/app/common/services/notification.service';
import {Router} from '@angular/router';

const checkPasswords: ValidatorFn = (
    group: AbstractControl
): ValidationErrors | null => {
    let password = group.get('password')?.value.trim();
    let passwordRepeat = group.get('passwordRepeat')?.value.trim();

    if (!password || !passwordRepeat) {
        return {required: true};
    }

    return password === passwordRepeat ? null : {passwordsNotSame: true};
};

const requiredValidator: ValidatorFn = (control: AbstractControl) => {
    let value = control.value.trim();

    if (!value) {
        return {required: true};
    }

    return null;
};

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    readonly ValidationErrorsEnum = ValidationErrorsEnum;

    private asyncNicknameCheck: AsyncValidatorFn = (
        control: AbstractControl
    ) => {
        if (!control.value.trim()) {
            return of(null);
        }
        return timer(1000).pipe(
            switchMap(() =>
                this.authService.checkNicknameAvailability(control.value).pipe(
                    map((nicknameAvailable) => {
                        if (nicknameAvailable) {
                            return null;
                        }

                        return {nicknameNotAvailable: true};
                    }),
                    catchError(() => {
                        console.log(control);

                        return of({nicknameNotAvailable: true});
                    })
                )
            )
        );
    };
    readonly form = this.fb.group(
        {
            name: new FormControl('', [requiredValidator]),
            surname: new FormControl('', [requiredValidator]),
            nickname: new FormControl('', {
                validators: [requiredValidator],
                asyncValidators: [this.asyncNicknameCheck],
            }),
            email: new FormControl('', [requiredValidator, Validators.email]),
            password: new FormControl('', [requiredValidator]),
            passwordRepeat: new FormControl('', {
                validators: [requiredValidator],
            }),
        },
        {validators: [checkPasswords]}
    );
    constructor(
        private readonly authService: AuthService,
        private readonly fb: FormBuilder,
        private readonly notificationService: NotificationService,
        private readonly router: Router
    ) {}

    checkPasswordError(): boolean {
        if (this.form.errors && this.form.controls.passwordRepeat.dirty) {
            return this.form.errors['passwordsNotSame'];
        }

        return false;
    }

    register(): void {
        this.form.markAllAsTouched();

        if (!this.form.valid) {
            if (this.form.errors && this.form.errors['passwordsNotSame']) {
                this.form.controls.passwordRepeat.setErrors(this.form.errors);
            }

            this.notificationService.showNotification({
                header: 'Ошибка отправки формы',
                text: 'Некоторые поля заполнены неверно',
                type: 'warning',
            });

            return;
        }

        const credentials: RegisterCredentials = {
            name: this.form.value.name!.trim(),
            surname: this.form.value.surname!.trim(),
            email: this.form.value.email!.trim(),
            nickname: this.form.value.nickname!.trim(),
            password: this.form.value.password!.trim(),
        };

        this.authService.register$(credentials).subscribe({
            next: () => {
                this.notificationService.showNotification({
                    header: 'Пользователь успешно создан',
                    type: 'success',
                });

                this.router.navigateByUrl('/');
            },
            error: (error) => {
                this.notificationService.showNotification({
                    header: 'Ошибка создания пользователя',
                    text: error,
                    type: 'error',
                    timeout: 5000,
                });
            },
        });
    }
}
