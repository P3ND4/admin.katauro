import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

    constructor(private currencyPipe: CurrencyPipe) { }

    transform(
        value: number,
        currencyCode: string = 'USD',
        display: string = 'symbol',
        digitsInfo: string = '1.2-2',
        locale: string = 'en-US'
    ): string | null {

        const formatted = this.currencyPipe.transform(
            value,
            currencyCode,
            display,
            digitsInfo,
            locale
        );

        if (!formatted) return null;
        console.log('Formatted value:', formatted);

        // 🔥 Aquí metemos el espacio después del símbolo
        return formatted.replace('$', '$ ');
    }
}