
import Papa from 'papaparse'

export interface CurrencyData {
    country: string;
    currency: string;
    amount: number;
    currencyCode: string;
    rate: number;
}

const ratesUrl = 'https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt';
const fieldsLine = 'country|currency|amount|currencyCode|rate';

export const fetchExchangeRates = async (): Promise<CurrencyData[]> => {
    const { data } = await fetch(`https://cors-proxy-client.herokuapp.com/${ratesUrl}`)
        .then(result => result.text())
        .then(text => {
            const headlessText = text.split('\n').slice(2);
            const appendedText = [fieldsLine, ...headlessText];
            const updatedText = appendedText.join('\n');

            return Papa.parse<CurrencyData>(updatedText,
                {
                    header: true,
                    delimiter: '|',
                    skipEmptyLines: true,
                    transform: (value, field) => (field === 'amount' || field === 'rate') ? parseFloat(value.replace(",", ".")) : value
                });
        })

    return data;
}

