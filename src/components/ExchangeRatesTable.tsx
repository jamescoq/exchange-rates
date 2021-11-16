import { Fragment } from 'react';
import styled from 'styled-components';

import icons from '../assets/flags/icons';
import { ReactComponent as Loading } from '../assets/loading.svg';
import useExchangeRates from '../useExchangeRates';

import Icon from './Icon';
import Row from './Row';
import Wrapper from './Wrapper';

const Separator = styled.hr<{ size?: number }>`
	border-top: ${({ size = 1 }) => size}px solid;
`;

const Item = styled.span<{ bold?: boolean }>`
	width: 15vw;
	font-weight: ${({ bold }) => (bold ? '600' : '400')};
`;

const ExchangeRatesTable = () => {
	const { isLoading, data = [] } = useExchangeRates();

	return (
		<Wrapper width="80vw">
			<Row>
				<Item bold>Země</Item>
				<Item bold>Měna</Item>
				<Item bold>Množství</Item>
				<Item bold>Částka</Item>
			</Row>
			<Separator size={2} />
			{isLoading && <Loading />}
			{!isLoading &&
				data?.map(({ country, amount, currencyCode, rate }, index) => (
					<Fragment key={index}>
						<Row>
							<Item>
								<Icon src={icons[currencyCode]} />
							</Item>
							<Item>{country}</Item>
							<Item>{`${amount} ${currencyCode}`}</Item>
							<Item>{`${rate} Kč`}</Item>
						</Row>
						{index < data.length - 1 && <Separator />}
					</Fragment>
				))}
		</Wrapper>
	);
};

export default ExchangeRatesTable;
