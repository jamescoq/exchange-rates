import styled from 'styled-components';

const Icon = styled.img<{ width?: string, height?: string }>`
    border-radius: 70%;
    width: ${({width = '3vh'}) => width};
    height: ${({height = '3vh'}) => height};
`
export default Icon;