import {Component} from '@angular/core';
import {AuthService, RegisterCredentials} from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(private readonly authService: AuthService) {}

    register(): void {
        const credentials: RegisterCredentials = {
            name: 'Artem',
            surname: 'Mikhailov',
            login: 'artem',
            password: 'password',
        };

        this.authService.register$(credentials).subscribe();
    }
}
