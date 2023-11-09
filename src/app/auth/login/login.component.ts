import {Router} from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';
import {AuthService} from './../services/auth.service';
import {Component} from '@angular/core';
import {NotificationService} from 'src/app/common/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    readonly form = this.fb.group(
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        },
        {updateOn: 'blur'}
    );
    constructor(
        private readonly authService: AuthService,
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly notificationService: NotificationService
    ) {}

    login(): void {
        this.form.markAllAsTouched();

        if (!this.form.valid) {
            return;
        }

        this.authService
            .login$({
                email: this.form.value.email!,
                password: this.form.value.password!,
            })
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/');
                },
                error: (error) => {
                    this.notificationService.showNotification({
                        header: 'Ошибка входа',
                        text: error,
                        type: 'error',
                    });
                },
            });
    }

    checkErrorState(control: AbstractControl): boolean {
        return !control.valid && control.touched;
    }

    test(): void {
        this.authService.test$().subscribe();
    }
}
