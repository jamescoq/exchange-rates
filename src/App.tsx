import { QueryClient, QueryClientProvider } from 'react-query';
import styled, { createGlobalStyle } from 'styled-components';

import { ExchangeRateConversion, ExchangeRatesTable } from './components';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  html: {
    height: 100%;
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
`;

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
`;

const App = () => (
	<QueryClientProvider client={queryClient}>
		<GlobalStyle />
		<Container>
			<Heading>Kurzovní lístek</Heading>
			<ExchangeRateConversion />
			<ExchangeRatesTable />
		</Container>
	</QueryClientProvider>
);

export default App;
