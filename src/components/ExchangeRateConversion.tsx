import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Select, { components } from "react-select";

import icons from '../assets/flags/icons';
import RightArrow from '../assets/right-arrow.svg';
import type { CurrencyData } from '../api';
import useExchangeRates from '../useExchangeRates';

import Icon from './Icon';
import Row from './Row';
import Wrapper from './Wrapper';

type OptionType = {
    value: string; label: string; icon: string;
}

const FlagIcon = styled(Icon)`
    margin-right: 1vw;
    border-radius: 10%;
`
const FormGroup = styled.div`
    display: inline-block;
`

const Input = styled.input`
    align-items: center;
    text-align: end;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%)};
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    min-height: 38px;
    width: 13vw;
    padding: 0px 0px;
    padding-right: 3vw;
    font-size: 16px;
`
const CurrencySuffix = styled.span`
    position: relative;
    content: "€";
    &:before {
        position: absolute;
        top: 0;
        content:"Kč";
        right: 10px;
    }
`

const OptionWrapper = styled.div`
    display: flex;
    flex-direction: row;  
    align-items: center;
`

const CurrencySelect = styled<any>(Select)`
    width: 16vw;
`

const Text = styled.span`
    align-items: center;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    min-height: 38px;
    width: 16vw;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 1vw;
`

const Label = styled.label`
    display: block;
    font-weight: 600;
    margin-bottom: 1vh;
`

const { Option } = components;

const IconOption = (props: any) => (
    <Option {...props}>
        <OptionWrapper>
            <FlagIcon alt={props.data.label} src={props.data.icon} />
            {`${props.data.label} (${props.data.value})`}
        </OptionWrapper>
    </Option>
);

const ExchangeRateConversion = () => {
    const [amount, setAmount] = useState<string>('')
    const [currency, setCurrency] = useState<CurrencyData>()
    const [conversion, setConversion] = useState<string | undefined>()

    const { data = [] } = useExchangeRates()
    const options = useMemo(() => data.map(({ country, currencyCode, }) => ({ value: currencyCode, label: country, icon: icons[currencyCode] })), [data]);

    useEffect(() => {
        if (currency) {
            setConversion(((Number(amount) / currency.rate) * currency.amount).toFixed(3))
        }

    }, [currency, amount])

    const handleCurrencyChange = (changedValue: OptionType) =>
        setCurrency(data.find(({ currencyCode }) => currencyCode === changedValue?.value))


    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\+?(0|[1-9]\d*)$/.test(value) || value === '') {
            setAmount(value)
        }
    }

    return <Wrapper width="60vw">
        <Row>
            <FormGroup>
                <Label>Částka</Label>
                <CurrencySuffix>
                    <Input name="amount" value={amount} onChange={handleAmountChange} />
                </CurrencySuffix>
            </FormGroup>
            <FormGroup>
                <Label>Měna</Label>
                <CurrencySelect
                    options={options}
                    components={{ Option: IconOption }}
                    onChange={handleCurrencyChange}
                />
            </FormGroup>
            <Icon src={RightArrow} width="4vh" height="4vh" />
            <FormGroup>
                <Label>Přepočet</Label>
                <Text>{`${conversion ?? ''} ${currency?.currencyCode ?? ''}`}</Text>
            </FormGroup>
        </Row >
    </Wrapper >

}

export default ExchangeRateConversion;