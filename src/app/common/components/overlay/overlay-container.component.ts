import {
    Component,
    ComponentRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import {Subscription} from "rxjs";

import {OverlayService} from "../../services/overlay.service";
import {OverlayComponent} from "./overlay.component";

@Component({
    selector: "app-overlay-container",
    templateUrl: "./overlay-container.component.html",
    styleUrls: ["./overlay-container.component.scss"],
    standalone: true,
})
export class OverlayContainerComponent implements OnInit, OnDestroy {
    @ViewChild("overlayContainer", {
        read: ViewContainerRef,
    })
    overlayContainer: ViewContainerRef;

    readonly showOverlay$ = this.overlayService.showOverlay$;
    private overlaySub: Subscription;
    private component: ComponentRef<OverlayComponent> | null;

    constructor(private readonly overlayService: OverlayService) {}

    ngOnInit(): void {
        this.overlaySub = this.showOverlay$.subscribe((showOverlay) => {
            if (!showOverlay && this.component) {
                this.component.instance.visible = false;

                setTimeout(() => {
                    this.component?.destroy();
                    this.component = null;
                }, 300);

                return;
            }

            this.component =
                this.overlayContainer.createComponent(OverlayComponent);

            setTimeout(() => {
                this.component!.instance.visible = true;
            }, 10);
        });
    }

    ngOnDestroy(): void {
        this.overlaySub.unsubscribe();
    }
}
