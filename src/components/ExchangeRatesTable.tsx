import React from 'react';
import { useQuery } from 'react-query'
import { fetchExchangeRates } from '../api';
import type { CurrencyData } from '../api';


const ExchangeRatesTable = () => {

    const { isLoading, data } = useQuery<CurrencyData[], Error>('rates', fetchExchangeRates, { retry: false, refetchOnWindowFocus: false });

    return <div>
        Table
        <div>
            {!isLoading && data?.map(({ country, amount, currencyCode, rate }, index) => <div key={index}>{`${country} (${amount}${currencyCode}): ${rate}`}</div>)}
        </div>
    </div>

}

export default ExchangeRatesTable;