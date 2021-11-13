import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query'
import { fetchExchangeRates } from '../api';
import type { CurrencyData } from '../api';


const ExchangeRateConversion = () => {
    const [currency, setCurrency] = useState<string>('')
    const [conversion, setConversion] = useState(0)

    const { data = [] } = useQuery<CurrencyData[], Error>('rates', fetchExchangeRates, { retry: false, refetchOnWindowFocus: false });
    const currencies = useMemo(() => data.map(({ currencyCode }) => currencyCode)
        , [data]);

    useEffect(() => {
        if (currency) {

        }

    }, [currency])

    const changeCurrency = (event: ChangeEvent<HTMLSelectElement>) => setCurrency(event.target?.value)

    return <div>
        <div>Calculation</div>
        <div>
            <input type="text" />
            <select onChange={changeCurrency}>
                {currencies.map((code) => (<option selected={code === currency} key={code} value={code}>{code}</option>))}
            </select>
            <span>Result: ${conversion}</span>
        </div>
    </div>

}

export default ExchangeRateConversion;