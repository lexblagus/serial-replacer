import styled from 'styled-components';

// =============================================================================

export const StyledStep = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	gap: var(--spacing);
	margin: calc(var(--spacing) * 2);
	padding: calc(var(--spacing) * 4);
	box-shadow: var(--box-shadow-input-concave);
	background-color: var(--textarea-background-color);

	h2 {
		margin-bottom: calc(var(--spacing) * 2);
	}
`;

export const StyledLabel = styled.div`
	font-size: 0.8em;
	text-transform: uppercase;
	display: flex;
	justify-content: flex-end;
	margin-top: var(--spacing);
`;

export const StyledOptions = styled.div`
	font-size: 0.8em;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: var(--spacing);
`;

export const StyledActions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: var(--spacing);

	button {
		font-size: 0.8em;
		text-transform: uppercase;
	}
`;

export const StyledResult = styled.div`
	font-family: monospace;
	white-space: pre;
	overflow: auto;
	box-shadow: var(--result-shadow);
	border-color: var(--button-border-color);
	border-width: 1px;
	border-style: solid;
	border-radius: 3px;
	background-color: var(--textarea-background-color);
	padding: var(--spacing);
	min-height: var(--element-min-height);
`;
