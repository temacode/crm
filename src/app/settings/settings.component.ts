import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {tap} from "rxjs";

import {CurtainService} from "../common/services/curtain.service";
import {NotificationService} from "../common/services/notification.service";
import {KanbanService} from "../kanban/services/kanban.service";
import {AddColumnCurtain} from "./add-column-curtain/add-column.curtain";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
    readonly columns$ = this.kanbanService.columns$;

    constructor(
        private readonly router: Router,
        private readonly curtainService: CurtainService,
        private readonly kanbanService: KanbanService,
        private readonly notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.kanbanService.getColumns();
    }

    navigateToMain() {
        this.router.navigateByUrl("/");
    }

    addColumn() {
        this.curtainService.showCurtain("Добавить колонку", AddColumnCurtain);
    }

    deleteColumn(columnId: number) {
        console.log(columnId);
        this.kanbanService
            .deleteColumn$(columnId)
            .pipe(tap(() => this.kanbanService.getColumns()))
            .subscribe((result) => {
                if (result) {
                    this.notificationService.showNotification({
                        header: "Колонка успешно удалена",
                    });
                }
            });
    }
}
