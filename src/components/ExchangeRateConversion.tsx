import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query'
// import debounce from 'lodash.debounce'
import { fetchExchangeRates } from '../api';
import type { CurrencyData } from '../api';


const ExchangeRateConversion = () => {
    const [amount, setAmount] = useState<number>(0)
    const [currency, setCurrency] = useState<CurrencyData>()
    const [conversion, setConversion] = useState<string>()

    const { data = [] } = useQuery<CurrencyData[], Error>('rates', fetchExchangeRates, { retry: false, refetchOnWindowFocus: false });
    const currencies = useMemo(() => data.map(({ currencyCode }) => currencyCode), [data]);

    useEffect(() => {
        console.log(`useEffect`, currency, amount)
        if (currency) {
            setConversion(((amount / currency.rate) * currency.amount).toFixed(3))
        }

    }, [currency, amount])

    const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) =>
        setCurrency(data.find(({ currencyCode }) => currencyCode === event.target?.value))

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.valueAsNumber)

    // const handleAmountChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target?.valueAsNumber;
    //     setAmount(value > 0 ? value : 0);
    // }, 500)

    return <div>
        Calculation
        <div>
            <input type="number" value={amount} onChange={handleAmountChange} /> CZK
            {/* <input type="number" name="amount" onChange={handleAmountChange} value={amount}/> CZK */}
            <span>= {conversion}</span>
            <select onChange={handleCurrencyChange} value={currency?.currencyCode}>
                <option value="-"></option>
                {currencies.map((code) => (<option key={code} value={code}>{code}</option>))}
            </select>
        </div>
    </div>

}

export default ExchangeRateConversion;