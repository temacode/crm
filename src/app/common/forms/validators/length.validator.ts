import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function lengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        console.log('validation');

        return control.value.length >= maxLength ? {maxLength: `Максимальная длина - ${maxLength}`} : null;
    };
}
