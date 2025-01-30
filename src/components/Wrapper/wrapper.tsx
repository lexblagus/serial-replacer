import { useState } from "react";
import { Options, Replacer, Step as TypeStep } from "../../types.d";
import defaultOptions from "../../constants/options";
import Step from "../Step";
import { StyledFooter, StyledHeader, StyledMain, StyledWrapper, WrapperGlobalStyle } from "./styled";
import useHandlers from './useHandlers';

// =============================================================================

const Wrapper = () => {
	const [state, setState] = useState<Replacer>({
		input: '',
		steps: [{}],
	});

	const {
		handleChangeOption,
		handleReplaceStep,
		handleReplaceAll,
		handleRemoveStep,
		handleAddStep,
		handleChangeInput,
		handleChangeFind,
		handleChangeReplace,
	} = useHandlers(state, setState);

	const mergeOptions = (options?: Options): Options => ({
		...defaultOptions,
		...options
	});

	return (<>
			<WrapperGlobalStyle />
			<StyledWrapper>
				<StyledHeader>
					<h1>Serial Replacer</h1>
					<p>Consecutive find-and-replace steps</p>
				</StyledHeader>
				<StyledMain>
					{state.steps.map((step: TypeStep, index: number) => <Step
						key={index}
						index={index}
						showStepNumber={state.steps.length > 1}
						showInput={index === 0}
						input={index === 0 ? state.input : state.steps[index - 1].result}
						find={step.find}
						replace={step.replace}
						result={step.result}
						showReplaceAll={state.steps.length > 1 && index + 1 === state.steps.length}
						showRemoveStep={state.steps.length > 1}
						options={mergeOptions(step.options)}
						handleChangeOption={handleChangeOption}
						handleReplaceStep={handleReplaceStep}
						handleReplaceAll={handleReplaceAll}
						handleRemoveStep={handleRemoveStep}
						handleAddStep={handleAddStep}
						handleChangeInput={handleChangeInput}
						handleChangeFind={handleChangeFind}
						handleChangeReplace={handleChangeReplace}
					/>)}
				</StyledMain>
				<StyledFooter>
					<a href="https://github.com/lexblagus/serial-replacer">source</a>
				</StyledFooter>
			</StyledWrapper>
		</>
	)
}

export default Wrapper
