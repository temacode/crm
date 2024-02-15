import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
    constructor(
        private readonly router: Router,
        private readonly http: HttpClient
    ) {}

    navigateToMain() {
        this.router.navigateByUrl("/");
    }

    test(): void {
        this.http.get(`/api/v1/test`).subscribe((r) => console.log(r));
    }
}
