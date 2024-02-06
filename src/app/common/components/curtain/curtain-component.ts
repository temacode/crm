import {Component, ViewContainerRef} from "@angular/core";

@Component({
    selector: "app-curtain",
    template: `<div>
        <ng-content></ng-content>
        <p>Curtain Component</p>
    </div>`,
})
export class CurtainComponent {
    constructor(readonly vcr: ViewContainerRef) {}
}
