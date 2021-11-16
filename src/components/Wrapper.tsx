import styled from 'styled-components';

const Wrapper = styled.div<{ margin?: string; width: string }>`
	margin: ${({ margin = '2vh' }) => margin};
	width: ${({ width }) => width};

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export default Wrapper;
