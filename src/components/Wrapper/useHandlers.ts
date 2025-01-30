import { Dispatch, SetStateAction } from 'react';
import { AddStep, ChangeFind, ChangeInput, ChangeOption, ChangeReplace, RemoveStep, ReplaceAll, Replacer, ReplaceStep, Options } from '../../types.d';
import { replaceStep } from '../../utils/aux';

const useHandlers = (state: Replacer, setState: Dispatch<SetStateAction<Replacer>>) => {
	const handleChangeOption: ChangeOption = (option, index, enabled) => {
		setState({
			...state,
			steps: [
				...state.steps.slice(0, index),
				{
					...state.steps[index],
					options: {
						...state.steps[index].options,
						[option]: enabled,
					} as Options, // trust options as complete from state
				},
				...state.steps.slice(index + 1)
			]
		})
	};

	const handleChangeInput: ChangeInput = (content) => {
		setState({
			...state,
			input: content
		});
	};

	const handleChangeFind: ChangeFind = (index, content) => {
		setState({
			...state,
			steps: [
				...state.steps.slice(0, index),
				{
					...state.steps[index],
					find: content,
				},
				...state.steps.slice(index + 1)
			]
		});
	};

	const handleChangeReplace: ChangeReplace = (index, content) => {
		setState({
			...state,
			steps: [
				...state.steps.slice(0, index),
				{
					...state.steps[index],
					replace: content,
				},
				...state.steps.slice(index + 1)
			]
		});
	};

	const handleReplaceStep: ReplaceStep = (index) => {
		setState(replaceStep(state, index));
	};

	const handleReplaceAll: ReplaceAll = () => {
		let currentState = Object.freeze(state);
		for(let i = 0; i < state.steps.length; i++){
			currentState = replaceStep(currentState, i)
		}
		setState(currentState);
	};

	const handleRemoveStep: RemoveStep = (index) => {
		if( state.steps.length > 1 ){
			setState({
				...state,
				steps: [
					...state.steps.slice(0, index),
					...state.steps.slice(index + 1)
				]
			});
		}
	};

	const handleAddStep: AddStep = (index) => {
		setState({
			...state,
			steps: [
				...state.steps.slice(0, index),
				{},
				...state.steps.slice(index),
			]
		})
	};

	return {
		handleChangeOption,
		handleReplaceStep,
		handleReplaceAll,
		handleRemoveStep,
		handleAddStep,
		handleChangeInput,
		handleChangeFind,
		handleChangeReplace,
	};
};

export default useHandlers;
