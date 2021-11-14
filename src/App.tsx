import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import styled from 'styled-components'
import ExchangeRateConversion from './components/ExchangeRateConversion';
import ExchangeRatesTable from './components/ExchangeRatesTable';

const queryClient = new QueryClient()

const Container = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: center;
  height: 100%;
  margin: 5vh;
`;

const Heading = styled.h2`
  font-size: 3em;
  line-height: $h2-line-height-mobile;
`

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Container>
      <Heading>Kurzovní lístek</Heading>
      <ExchangeRateConversion />
      <ExchangeRatesTable />
    </Container>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
