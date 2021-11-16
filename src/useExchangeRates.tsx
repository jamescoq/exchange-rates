import { useQuery } from 'react-query';

import { fetchExchangeRates } from './api';
import type { CurrencyData } from './api';

const useExchangeRates = () => {
	const {
		data = [],
		isLoading,
		error,
	} = useQuery<CurrencyData[], Error>('rates', fetchExchangeRates, {
		retry: false,
		refetchOnWindowFocus: false,
	});

	return { data, isLoading, error };
};

export default useExchangeRates;
