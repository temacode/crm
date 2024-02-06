import {Pipe, PipeTransform} from "@angular/core";
import {ValidationErrors} from "@angular/forms";

import {ValidationErrorsEnum} from "../enums";

@Pipe({
    name: "controlError",
})
export class ControlErrorPipe implements PipeTransform {
    public transform(errors: ValidationErrors | null): string {
        if (!errors) {
            return "";
        }

        const validatorError = Object.keys(errors)[0] as ValidationErrorsEnum;

        switch (validatorError) {
            case ValidationErrorsEnum.EMAIL:
                return "Введите корректный Email";
            case ValidationErrorsEnum.PASSWORDS_NOT_SAME:
                return "Пароли должны совпадать";
            case ValidationErrorsEnum.REQUIRED:
                return "Это поле обязательное";
            case ValidationErrorsEnum.NICKNAME_NOT_AVAILABLE:
                return "Этот ник недоступен";
            default:
                return "Что-то пошло не так";
        }
    }
}
