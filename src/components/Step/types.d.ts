import { Options, Option } from "../../types.d";
import { AddStep, ChangeFind, ChangeInput, ChangeOption, ChangeReplace, RemoveStep, ReplaceAll, Replacer, ReplaceStep } from '../../types.d';

export interface StepComponent {
	input?: string;
	find?: string;
	index: number;
	replace?: string;
	result?: string;
	options: Options;

	showInput: boolean;
	showRemoveStep: boolean;
	showReplaceAll: boolean;
	showStepNumber: boolean;

	handleAddStep: AddStep;
	handleChangeFind: ChangeFind;
	handleChangeInput: ChangeInput;
	handleChangeOption: ChangeOption;
	handleChangeReplace: ChangeReplace;
	handleRemoveStep: RemoveStep;
	handleReplaceAll: ReplaceAll;
	handleReplaceStep: ReplaceStep;
};
