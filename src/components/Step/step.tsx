import { ChangeEvent } from 'react';
import { StyledActions, StyledLabel, StyledOptions, StyledResult, StyledStep } from "./styled"
import { StepComponent } from './types.d';
import { Option } from "../../types.d";

// =============================================================================

const Step = (props: StepComponent) => {

	const {
		find,
		handleAddStep,
		handleChangeFind,
		handleChangeInput,
		handleChangeOption,
		handleChangeReplace,
		handleRemoveStep,
		handleReplaceAll,
		handleReplaceStep,
		index,
		input,
		options,
		replace,
		result,
		showInput,
		showRemoveStep,
		showReplaceAll,
		showStepNumber,
	} = props;

	return (
		<StyledStep>
			{showStepNumber && <>
					<StyledLabel></StyledLabel>
					<div><h2>Step {index + 1}</h2></div>
			</>}
			{showInput && <>
					<StyledLabel>input</StyledLabel>
					<div><textarea
						wrap="off"
						value={input || ''}
						onChange={event => {
							handleChangeInput(event.target.value);
						}}
					></textarea></div>
			</>}
				<StyledLabel>find</StyledLabel>
				<div><textarea
					wrap="off"
					value={find || ''}
					onChange={event => {
						handleChangeFind(index, event.target.value);
					}}
				></textarea></div>
				<StyledLabel>replace</StyledLabel>
				<div><textarea
					wrap="off"
					value={replace || ''}
					onChange={event => {
						handleChangeReplace(index, event.target.value);
					}}
				></textarea></div>
				<StyledLabel>options</StyledLabel>
				<StyledOptions>
					<input
						type="checkbox"
						id={`checkbox-regexp-${index}`}
						checked={options.regexp}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							handleChangeOption(Option.RegularExpression, index, event.target.checked);
						}}
					/>
					<label htmlFor={`checkbox-regexp-${index}`}>regular expression</label>

					<input
						type="checkbox"
						id={`checkbox-global-${index}`}
						checked={options.global}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							handleChangeOption(Option.Global, index, event.target.checked);
						}}
					/>
					<label htmlFor={`checkbox-global-${index}`}>find all occurrences (global)</label>

					<input
						type="checkbox"
						id={`checkbox-multiline-${index}`}
						checked={options.multiline}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							handleChangeOption(Option.Multiline, index, event.target.checked);
						}}
					/>
					<label htmlFor={`checkbox-multiline-${index}`}>multiline search</label>

					<input
						type="checkbox"
						id={`checkbox-caseSensitive-${index}`}
						checked={options.caseSensitive}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							handleChangeOption(Option.CaseSensitive, index, event.target.checked);
						}}
					/>
					<label htmlFor={`checkbox-caseSensitive-${index}`}>case sensitive</label>
				</StyledOptions>
				<div></div>
				<StyledActions>
					<button onClick={() => {
						handleReplaceStep(index);
					}}>replace step</button>
				</StyledActions>
				<StyledLabel>result</StyledLabel>
				<StyledResult>{result}</StyledResult>
				<div></div>
				<StyledActions>
					{showRemoveStep && <button onClick={() => {
						handleRemoveStep(index);
					}}>remove step</button>}
					
					<button onClick={() => {
						handleAddStep(index);
					}}>add step above</button>
					<button onClick={() => {
						handleAddStep(index + 1);
					}}>add step bellow</button>
					{showReplaceAll && <button onClick={() => {
						handleReplaceAll();
					}}>replace all</button>}
					{/* <button onClick={() => {}}>save</button> */}
				</StyledActions>
		</StyledStep>
	)
}

export default Step
