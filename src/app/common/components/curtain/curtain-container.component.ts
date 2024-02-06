import {
    Component,
    ComponentRef,
    HostBinding,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import {
    ReplaySubject, Subject, take, takeUntil
} from "rxjs";

import {CurtainService} from "../../services/curtain.service";
import {OverlayService} from "../../services/overlay.service";

@Component({
    selector: "app-curtain-container",
    templateUrl: "./curtain-container.component.html",
    styleUrls: ["./curtain-container.component.scss"],
    standalone: true,
})
export class CurtainContainerComponent implements OnInit, OnDestroy {
    @ViewChild("curtiainContainer", {
        read: ViewContainerRef,
    })
        curtiainContainer: ViewContainerRef;

    title: string | null = null;
    @HostBinding("class.visible")
        visible = false;

    readonly showCurtain$ = this.curtainService.showCurtain$;
    private component: ComponentRef<any>;

    private readonly destroyed$ = new ReplaySubject<boolean>(1);
    private readonly closed$ = new Subject<boolean>();

    constructor(
        private readonly curtainService: CurtainService,
        private readonly overlayService: OverlayService
    ) {}

    ngOnInit(): void {
        this.showCurtain$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((curtain) => {
                this.title = curtain.title;
                this.visible = true;

                this.component = this.curtiainContainer.createComponent(
                    curtain.tpl
                );

                this.overlayService.overlayClicked$
                    .pipe(takeUntil(this.closed$), take(1))
                    .subscribe(() => {
                        this.close();
                    });
            });
    }

    close() {
        this.visible = false;
        this.overlayService.showOverlay(false);
        this.closed$.next(true);

        setTimeout(() => {
            this.title = null;
            this.component.destroy();
        }, 300);
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
    }
}
