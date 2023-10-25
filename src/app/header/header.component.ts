import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, RouterModule],
})
export class HeaderComponent {}
