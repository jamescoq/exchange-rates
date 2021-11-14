import React, { Fragment } from 'react';
import { useQuery } from 'react-query'
import styled from 'styled-components';

import { fetchExchangeRates } from '../api';
import type { CurrencyData } from '../api';
import icons from '../assets/flags/icons';
import { ReactComponent as Loading } from '../assets/loading.svg';
interface SeparatorProps {
    size: number;
}

const TableContainer = styled.div`
    margin: 2vh;
    width: 80vw;
`

const Icon = styled.img`
    border-radius: 70%;
    width: 3vh;
    height: 3vh;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;  
    align-items: center;
    justify-content: space-between;
    margin-top: 2vh;
    margin-bottom: 2vh;
`

const Separator = styled.hr<SeparatorProps>`
    border-top: ${({ size = 1 }) => size}px solid;
`

const Item = styled.span`
    width: 15vw;
`

const ExchangeRatesTable = () => {
    const { isLoading, data } = useQuery<CurrencyData[], Error>('rates', fetchExchangeRates, { retry: false, refetchOnWindowFocus: false });

    return <TableContainer>
        <Row>
            <Item>Země</Item>
            <Item>Měna</Item>
            <Item>Množství</Item>
            <Item>Částka (CZK)</Item>
        </Row>
        <Separator size={2} />
        {isLoading && <Loading />}
        {!isLoading && data?.map(({ country, amount, currencyCode, rate }, index) =>
            <Fragment key={index}>
                <Row>
                    <Item><Icon src={icons[currencyCode]} /></Item>
                    <Item>{country}</Item>
                    <Item>{`${amount} ${currencyCode}`}</Item>
                    <Item>{`${rate} Kč`}</Item>
                </Row>
                {index < data.length - 1 && <Separator size={1} />}
            </Fragment>
        )}
    </TableContainer >

}

export default ExchangeRatesTable;