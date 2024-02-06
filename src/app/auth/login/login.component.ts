import {Component} from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    Validators,
} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationService} from "src/app/common/services/notification.service";

import {AuthService} from "../services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    readonly form = this.fb.group({
        email: new FormControl("", {
            validators: [Validators.required, Validators.email],
            nonNullable: true,
        }),
        password: new FormControl("", {
            validators: [Validators.required],
            nonNullable: true,
        }),
    });
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
                email: this.form.getRawValue().email,
                password: this.form.getRawValue().password,
            })
            .subscribe({
                next: () => {
                    this.router.navigateByUrl("/");
                },
                error: (error) => {
                    this.notificationService.showNotification({
                        header: "Ошибка входа",
                        text: error,
                        type: "error",
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
