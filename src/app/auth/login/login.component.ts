import {AuthService} from './../services/auth.service';
import {Component} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private readonly authService: AuthService) {}

    login(): void {
        this.authService
            .login$({email: 'qwe@qwe.qwe', password: 'password'})
            .subscribe();
    }

    test(): void {
        this.authService.test$().subscribe();
    }
}
