import styled, { createGlobalStyle } from 'styled-components';

// =============================================================================

export const WrapperGlobalStyle = createGlobalStyle`
	:root {
		--header-background-color: hsla(0, 0%, 0%, 0.25);
		--header-shadow: 0px 4px 4px 0px hsla(0, 0%, 0%, 0.5);
		--result-shadow: 
			2px 2px 2px 0px hsla(0, 0%, 0%, 0.5),
			-1px -1px 2px 0px hsla(0, 0%, 0%, 0.25);
	}
	@media (prefers-color-scheme: dark) {
		:root {
			--header-background-color: hsla(0, 0%, 0%, 0.3);
			--header-shadow: 0px 4px 4px 0px hsla(0, 0%, 0%, 0.5);
		}
	}
`;

export const StyledWrapper = styled.div`
	height: 100%;
	overflow: auto;
	display: grid;
	grid-template-rows: auto 1fr auto;
`;

export const StyledHeader = styled.div`
	padding: var(--spacing);
	margin-bottom: var(--spacing);
	background-color: var(--header-background-color);
	box-shadow: var(--header-shadow);

	border-bottom-color: var(--button-border-color);
	border-bottom-width: 1px;
	border-bottom-style: solid;
`;

export const StyledMain = styled.div`
`;

export const StyledFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	font-size: var(--font-size-small);
	padding: var(--spacing);
`;
