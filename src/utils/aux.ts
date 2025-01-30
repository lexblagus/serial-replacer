import defaultOptions from "../constants/options";
import { Replacer } from "../types.d";

export const replaceStep = (state: Replacer, index: number): Replacer => {
	const input =
		index === 0 ? state.input : state.steps[index - 1].result ?? "";
	const find = state.steps[index].find ?? "";
	const regexp = state.steps[index].options?.regexp ?? defaultOptions.regexp;
	const global = state.steps[index].options?.global ?? defaultOptions.global;
	const multiline =
		state.steps[index].options?.multiline ?? defaultOptions.multiline;
	const caseSensitive =
		state.steps[index].options?.caseSensitive ??
		defaultOptions.caseSensitive;
	const replace = state.steps[index].replace ?? "";

	const re = new RegExp(
		regexp ? find : find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
		`${global ? "g" : ""}${caseSensitive ? "" : "i"}${multiline ? "m" : ""}`
	);

	const result = input.replace(re, replace);

	const prefix = state.steps.slice(0, index);

	const infix = {
		...state.steps[index],
		result: result,
	};

	const suffix = state.steps.slice(index + 1);

	const newState = {
		...state,
		steps: [...prefix, infix, ...suffix],
	};

	return newState;
};
