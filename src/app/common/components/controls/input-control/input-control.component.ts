import {
    ChangeDetectorRef,
    Component,
    Input,
    Optional,
    Self,
} from "@angular/core";
import {
    ControlValueAccessor,
    FormControlName,
    FormControlStatus,
    ValidationErrors,
} from "@angular/forms";

type InputType = "text" | "email" | "password";

@Component({
    selector: "app-input-control",
    templateUrl: "./input-control.component.html",
    styleUrls: ["./input-control.component.scss"],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlComponent implements ControlValueAccessor {
    set value(value: string) {
        this._value = value;
        this.onChange(value);
    }

    get value(): string {
        return this._value;
    }

    private _value: string;

    touched: boolean;

    @Input() type: InputType;

    @Input() name = "";
    @Input() autocomplete = "";

    @Input() placeholder = "";

    disabled = false;

    constructor(
        @Self() @Optional() private control: FormControlName,
        private readonly cdr: ChangeDetectorRef
    ) {
        this.control.valueAccessor = this;
    }

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    input(e: Event): void {
        this.value = (e.target as HTMLInputElement).value;
    }

    touch(): void {
        if (!this.touched) {
            this.onTouched();
        }
    }

    get invalid(): boolean {
        if (!this.control) {
            return false;
        }

        const {dirty, touched} = this.control;

        return this.control.invalid ? !!dirty || !!touched : false;
    }

    get errors(): ValidationErrors | null {
        if (!this.control) {
            return null;
        }

        const {errors} = this.control;

        return errors;
    }

    private get controlTouched(): boolean {
        return this.control ? !!this.control.touched : false;
    }

    get status(): FormControlStatus {
        return this.control
            ? (this.control.status as FormControlStatus)
            : "INVALID";
    }

    private get controlInvalid(): boolean {
        return this.control ? !!this.control.invalid : false;
    }

    private onChange(_: any) {}
    private onTouched() {}
}
