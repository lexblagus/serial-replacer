export interface Replacer {
	input: string;
	steps: Step[]
}

export interface Step {
	find?: string;
	replace?: string;
	result?: string;
	options?: Options;
};

export type Options = Record<Option, boolean>;

export enum Option {
	RegularExpression = 'regexp',
	Global = 'global',
	Multiline = 'multiline',
	CaseSensitive = 'caseSensitive'
}

export type AddStep = (index: number) => void;
export type ChangeFind = (index: number, value: string) => void;
export type ChangeInput = (value: string) => void;
export type ChangeOption = (option: Option, index: number, enabled: boolean) => void;
export type ChangeReplace = (index: number, value: string) => void;
export type RemoveStep = (index: number) => void;
export type ReplaceAll = () => void;
export type ReplaceStep = (index: number) => void;
