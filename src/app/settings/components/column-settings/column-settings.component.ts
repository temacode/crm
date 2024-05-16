import {Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject, distinctUntilChanged, from, takeUntil, tap, throttleTime} from 'rxjs';
import {CurtainService, NotificationService} from '@common';
import {KanbanService} from '@kanban';
import {AddColumnCurtain} from './add-column-curtain/add-column.curtain';

@Component({
    selector: 'app-column-settings',
    templateUrl: './column-settings.component.html',
    styleUrls: ['./column-settings.component.scss'],
})
export class ColumnSettingsComponent implements OnInit, OnDestroy {
    @ViewChildren('columnItem')
    columnElements: QueryList<ElementRef<HTMLElement>>;

    @ViewChildren('table')
    tableElement: QueryList<ElementRef<HTMLElement>>;

    readonly columns$ = this.kanbanService.columns$;
    private readonly dragEvent$ = new Subject<DragEvent>();

    draggableElement: {elem: HTMLElement; pos: number; newPos: number} | null = null;

    private readonly destroy$ = new ReplaySubject(1);

    constructor(
        private readonly kanbanService: KanbanService,
        private readonly notificationService: NotificationService,
        private readonly curtainService: CurtainService,
        private readonly r2: Renderer2,
    ) {}

    ngOnInit(): void {
        this.kanbanService.getColumns();
        this.listenForDragover();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

    listenForDragover(): void {
        this.dragEvent$
            .pipe(
                throttleTime(100),
                distinctUntilChanged((prev, next) => prev.clientX === next.clientX && prev.clientY === next.clientY),
                takeUntil(this.destroy$),
            )
            .subscribe(e => {
                if (!this.draggableElement) {
                    return;
                }

                const hoveredElement = this.columnElements.find(x => this.checkMouseOverElement(e, x.nativeElement));

                if (!hoveredElement) {
                    return;
                }

                const shouldInsertAfter =
                    this.draggableElement.elem.getBoundingClientRect().y <
                    hoveredElement.nativeElement.getBoundingClientRect().y;

                this.r2.insertBefore(
                    this.tableElement.first.nativeElement,
                    this.draggableElement.elem,
                    shouldInsertAfter ? hoveredElement.nativeElement.nextSibling : hoveredElement.nativeElement,
                    true,
                );
            });
    }

    makeDraggable(id: number, pos: number): void {
        const elem = this.columnElements.find(x => x.nativeElement.id === id.toString())?.nativeElement;

        if (elem) {
            this.draggableElement = {elem, pos, newPos: pos};
        }

        if (this.draggableElement) {
            this.draggableElement.elem.setAttribute('draggable', 'true');
        }
    }

    dragstart(e: DragEvent): void {
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';

            if (this.draggableElement) {
                this.draggableElement.elem.style.opacity = '0.3';
            }
        }
    }

    dragend(e: DragEvent): void {
        e.preventDefault();

        console.log('dragend', {...this.draggableElement});

        if (e.dataTransfer && e.dataTransfer.dropEffect === 'none' && this.draggableElement) {
            // вернуть на свое место
        }

        if (this.draggableElement) {
            this.draggableElement.elem.style.opacity = '1';
            this.draggableElement.elem.setAttribute('draggable', 'false');
        }

        this.draggableElement = null;
    }

    dragover(e: DragEvent): void {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }

        this.dragEvent$.next(e);
    }

    drop(e: DragEvent): void {
        e.preventDefault();

        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }
    }

    addColumn() {
        this.curtainService.open('Добавить колонку', AddColumnCurtain);
    }

    deleteColumn(columnId: number) {
        this.kanbanService
            .deleteColumn$(columnId)
            .pipe(tap(() => this.kanbanService.getColumns()))
            .subscribe(result => {
                if (result) {
                    this.notificationService.showNotification({
                        header: 'Колонка успешно удалена',
                    });
                }
            });
    }

    private checkMouseOverElement(e: DragEvent, elem: HTMLElement): boolean {
        const rect = elem.getBoundingClientRect();
        const mouse = {x: e.clientX, y: e.clientY};

        if (mouse.y > rect.y && mouse.y < rect.y + rect.height) {
            return true;
        }

        return false;
    }
}
