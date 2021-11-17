import styled from 'styled-components';

const Icon = styled.img<{ width?: string; height?: string }>`
	border-radius: 70%;
	width: ${({ width = '4vh' }) => width};
	height: ${({ height = '4vh' }) => height};
`;
export default Icon;
