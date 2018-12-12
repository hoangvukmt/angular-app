import { AbstractControl, ValidationErrors } from '@angular/forms';
export type ValidationResult = ValidationErrors | null;
const reg = /^[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))$/;

export function lengthPasswordValidator(control: AbstractControl): ValidationResult {
    if (control.value.length < 8) {
        return {lengthError: true};
    }
    return null;
}

export function characterOtherValidator(control: AbstractControl): ValidationResult {
    if (control.value.includes(',') || control.value.includes('=')) {
        return {characterOther: true};
    }
    return null;
}

export function notHaveEnoughtCharacterValidator(control: AbstractControl): ValidationResult {
    if (!reg.test(control.value)) {
        return {notHaveNumberOrLatin: true};
    }
    return null;
}
