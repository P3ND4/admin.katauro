import { AbstractControl, ValidationErrors } from "@angular/forms";

export function fechaRealValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)) {
        return { formatoInvalido: true };
    }

    const [year, month, day] = value.split('-').map(Number);

    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Verificar bisiesto
    const esBisiesto = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (esBisiesto) diasPorMes[1] = 29;

    if (day > diasPorMes[month - 1]) {
        return { fechaInvalida: true };
    }

    return null;
}