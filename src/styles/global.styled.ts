import 'normalize.css';
import { createGlobalStyle } from 'styled-components';
import fonts from '../fonts';

// =============================================================================

const GlobalStyle = createGlobalStyle`
	${fonts}

	/* -------------------------------------------------------------------------- */

	:root {
		--text-color: initial;
		--text-link: hsl(240, 100%, 47%);
		--text-link-visited: hsl(270, 44%, 38%);
		--text-link-active: hsl(240, 100%, 80%);
		--background-color: hsl(0, 0%, 90%);
		--button-text-color: hsla(0, 0%, 20%, 1);
		--button-background-color: hsla(0, 0%, 80%, 1);
		--textarea-background-color: hsla(0, 0%, 0%, 0.15);

		--button-border-color: var(--button-text-color);

		--spacing: 4px;

		/*
		'Bodoni Moda'
		'IBM Plex Sans'
		'IBM Plex Sans Condensed'
		'IBM Plex Mono'
		'IBM Plex Serif'
		'Roboto'
		'Titillium Web'
		'Rajdhani'
		*/
		--font-family: 'IBM Plex Sans Condensed', sans-serif;
		--font-family-monospace: 'IBM Plex Mono', monospace;
		--font-size-small: 0.8em;
		
		--box-shadow-input-concave:
			inset 2px 2px 2px 0px hsla(0, 0%, 0%, 0.5),
			inset -1px -1px 2px 0px hsla(0, 0%, 0%, 0.25);
		--box-shadow-input-convex:
			1px 1px 1px 0px hsla(0, 0%, 0%, 0.75),
			2px 2px 2px 0px hsla(0, 0%, 0%, 0.25);

		--element-min-height: 10em;
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--text-color: hsl(0, 0%, 85%);
			--text-link: hsl(210, 72%, 56%);
			--text-link-visited: hsl(270, 29%, 53%);
			--text-link-active: hsl(240, 100%, 80%);
			--background-color: hsl(0, 0%, 25%);
			--button-text-color: hsla(0, 0%, 0%, 1);
			--button-background-color: hsla(0, 0%, 35%, 1);
		}
	}

	/* -------------------------------------------------------------------------- */

	* {
		box-sizing: border-box;
	}
	html, body {
		height: 100%;
	}
	body {
		font-family: var(--font-family);
		color: var(--text-color);
		background-color: var(--background-color);
	}
	body, h1, h2, h3, h4, h5, h6, p {
		margin: 0;
	}
	#root {
		height: 100%;
	}

	/* -------------------------------------------------------------------------- */

	a,
	a:link {
		color: var(--text-link);
	}

	a:visited {
		color: var(--text-link-visited);
	}

	a:active,
	a:hover{
		color: var(--text-link-active);
	}
	a,
	a:link,
	a:visited{
		text-decoration: none;
	}
	a:active,
	a:hover{
		text-decoration: underline;
	}

	/* -------------------------------------------------------------------------- */

	button {
		color: var(--button-text-color);
		box-shadow: var(--box-shadow-input-convex);
		background-color: var(--button-background-color);
		border-color: var(--button-border-color);
		border-width: 1px;
		border-style: solid;
		border-radius: 3px;
		font-weight: bold;
	}
	input[type=checkbox] {
		border-color: var(--button-border-color);
		border-width: 1px;
		border-style: solid;
		border-radius: 3px;
		box-shadow: var(--box-shadow-input-concave);
		background-color: var(--textarea-background-color);
		accent-color: var(--textarea-background-color);
		appearance: none;
		width: 1.2em;
		height: 1.2em;
		vertical-align: text-top;
	}
	input[type=checkbox]:checked {
		/* box-shadow: var(--box-shadow-input-convex);
		position: relative;
		top: -1px;
		left: -1px; */
		background-image: linear-gradient(
			to right,
			var(--button-text-color),
			var(--button-text-color));
		background-size: calc(1.2em - 6px) calc(1.2em - 6px);
		background-position: center;
		background-repeat: no-repeat;
	}
	textarea {
		width: 100%;
		height: 100%;
		min-height: var(--element-min-height);
		resize: none;
		box-sizing: border-box;
		outline-style: none;
		padding: var(--spacing);
		color: var(--text-color);
		border-color: var(--button-border-color);
		border-width: 1px;
		border-style: solid;
		border-radius: 6px;
		box-shadow: var(--box-shadow-input-concave);
		background-color: var(--textarea-background-color);
		font-family: var(--font-family-monospace);
	}

	/* -------------------------------------------------------------------------- */
`;

export default GlobalStyle;
