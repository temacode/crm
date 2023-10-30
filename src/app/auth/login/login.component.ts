import {
    AbstractControl,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';
import {AuthService} from './../services/auth.service';
import {Component} from '@angular/core';

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
        private readonly fb: FormBuilder
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
            .subscribe();
    }

    checkErrorState(control: AbstractControl): boolean {
        return !control.valid && control.touched;
    }

    test(): void {
        this.authService.test$().subscribe();
    }
}
