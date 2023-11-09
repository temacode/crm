import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {Router, RouterModule} from '@angular/router';
import {AppService} from '../app.service';
import {AuthService} from '../auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ButtonComponent, RouterModule],
})
export class HeaderComponent {
    readonly user$ = this.appService.user$;

    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    logout() {
        this.authService.logout();
    }

    navigateToSettings() {
        this.router.navigateByUrl('/settings');
    }
}
