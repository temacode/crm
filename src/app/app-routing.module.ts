import {NgModule, inject} from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {AppService, UserInfo} from './app.service';

const KanbanResolver: ResolveFn<UserInfo> = () =>
    inject(AppService).getUserInfo$();

const routes: Routes = [
    {
        path: '',
        resolve: {userInfo: KanbanResolver},
        loadChildren: () =>
            import('./kanban/kanban.module').then((m) => m.KanbanModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'settings',
        resolve: {userInfo: KanbanResolver},
        loadChildren: () =>
            import('./settings/settings.module').then((m) => m.SettingsModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
