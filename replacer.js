const defaultOptions = {
	regexp: false,
	global: true,
	multiline: true,
	caseSensitive: false,
};

const Step = (props) => (<React.Fragment>
	<div className={'step'}>
		{props.showStepNumber && <React.Fragment>
				<div className={'label'}></div>
				<div><h2>Step {props.index + 1}</h2></div>
		</React.Fragment>}
		{props.showInput && <React.Fragment>
				<div className={'label'}>input</div>
				<div><textarea
					wrap="off"
					value={props.input || ''}
					onChange={event => {
						props.handleChangeInput(event.target.value);
					}}
				></textarea></div>
		</React.Fragment>}
			<div className={'label'}>find</div>
			<div><textarea
				wrap="off"
				value={props.find || ''}
				onChange={event => {
					props.handleChangeFind(props.index, event.target.value);
				}}
			></textarea></div>
			<div className={'label'}>replace</div>
			<div><textarea
				wrap="off"
				value={props.replace || ''}
				onChange={event => {
					props.handleChangeReplace(props.index, event.target.value);
				}}
			></textarea></div>
			<div className={'label'}>options</div>
			<div className={'options'}>
				<input
					type="checkbox"
					id={`checkbox-regexp-${props.index}`}
					defaultChecked={props.options.regexp}
					onClick={event => {
						props.handleChangeOption('regexp', props.index, event.target.checked);
					}}
				/>
				<label htmlFor={`checkbox-regexp-${props.index}`}>regular expression</label>

				<input
					type="checkbox"
					id={`checkbox-global-${props.index}`}
					defaultChecked={props.options.global}
					onClick={event => {
						props.handleChangeOption('global', props.index, event.target.checked);
					}}
				/>
				<label htmlFor={`checkbox-global-${props.index}`}>find all occurrences (global)</label>

				<input
					type="checkbox"
					id={`checkbox-multiline-${props.index}`}
					defaultChecked={props.options.multiline}
					onClick={event => {
						props.handleChangeOption('multiline', props.index, event.target.checked);
					}}
				/>
				<label htmlFor={`checkbox-multiline-${props.index}`}>multiline search</label>

				<input
					type="checkbox"
					id={`checkbox-caseSensitive-${props.index}`}
					defaultChecked={props.options.caseSensitive}
					onClick={event => {
						props.handleChangeOption('caseSensitive', props.index, event.target.checked);
					}}
				/>
				<label htmlFor={`checkbox-caseSensitive-${props.index}`}>case sensitive</label>
			</div>
			<div></div>
			<div className={'actions'}>
				<button onClick={event => {
					props.handleReplaceStep(props.index);
				}}>replace step</button>
			</div>
			<div className={'label'}>result</div>
			<div className={'result'}>{props.result}</div>
			<div></div>
			<div className={'actions'}>
				{props.showRemoveStep && <button onClick={event => {
					props.handleRemoveStep(props.index);
				}}>remove step</button>}
				
				<button onClick={event => {
					props.handleAddStep(props.index);
				}}>add step above</button>
				<button onClick={event => {
					props.handleAddStep(props.index + 1);
				}}>add step bellow</button>
				{props.showReplaceAll && <button onClick={event => {
					props.handleReplaceAll();
				}}>replace all</button>}
				{/* <button onClick={() => {}}>save</button> */}
			</div>
	</div>
</React.Fragment>)

const Wrapper = createReactClass({
	getInitialState() {
		return {
			input: '',
			steps: [
				{}, // first default single step
				/*
				// model
				{
					find: '',
					replace: '',
					result: '',
					options: {
						regexp: true,
						global: true,
						multiline: true,
						caseSensitive: false,
					}
				}
				*/
			]
		};
	},

	handleChangeOption(option, index, enabled) {
		
		this.setState({
			...this.state,
			steps: [
				...this.state.steps.slice(0, index),
				{
					...this.state.steps[index],
					options: {
						...this.state.steps[index].options,
						[option]: enabled,
					},
				},
				...this.state.steps.slice(index + 1)
			]
		})
	},

	handleChangeInput(content) {
		this.setState({
			...this.state,
			input: content
		});
	},

	handleChangeFind(index, content) {
		this.setState({
			...this.state,
			steps: [
				...this.state.steps.slice(0, index),
				{
					...this.state.steps[index],
					find: content,
				},
				...this.state.steps.slice(index + 1)
			]
		});
	},

	handleChangeReplace(index, content) {
		this.setState({
			...this.state,
			steps: [
				...this.state.steps.slice(0, index),
				{
					...this.state.steps[index],
					replace: content,
				},
				...this.state.steps.slice(index + 1)
			]
		});
	},

	replaceStep(state, index) {

		const input = index === 0 ? state.input : state.steps[index - 1].result;
		const find = state.steps[index].find;
		const regexp =
			state.steps[index].options
				? state.steps[index].options.regexp !== undefined
					? state.steps[index].options.regexp
					: defaultOptions.regexp
				: defaultOptions.regexp;
		const global =
			state.steps[index].options
				? state.steps[index].options.global !== undefined
					? state.steps[index].options.global
					: defaultOptions.global
				: defaultOptions.global;
		const multiline =
			state.steps[index].options
				? state.steps[index].options.multiline !== undefined
					? state.steps[index].options.multiline
					: defaultOptions.multiline
				: defaultOptions.multiline;
		const caseSensitive =
			state.steps[index].options
				? state.steps[index].options.caseSensitive !== undefined
					? state.steps[index].options.caseSensitive
					: defaultOptions.caseSensitive
				: defaultOptions.caseSensitive;
		const replace = state.steps[index].replace;

		const re = new RegExp(
			regexp ? find : find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
			`${global ? 'g': ''}${caseSensitive ? '': 'i'}${multiline ? 'm': ''}`
		);

		const result = input.replace(re, replace);

		const prefix = state.steps.slice(0, index);
		
		const infix = {
			...state.steps[index],
			result: result,
		}
		
		const suffix = state.steps.slice(index + 1)

		const newState = {
			...state,
			steps: [
				...prefix,
				infix,
				...suffix,
			]
		}

		return newState
	},

	handleReplaceStep(index) {
		this.setState(this.replaceStep(this.state, index));
	},

	handleReplaceAll() {
		let currentState = Object.freeze(this.state);
		for(let i = 0; i < this.state.steps.length; i++){
			currentState = this.replaceStep(currentState, i)
		}
		this.setState(currentState);
	},

	handleRemoveStep(index) {
		if( this.state.steps.length > 1 ){
			this.setState({
				...this.state,
				steps: [
					...this.state.steps.slice(0, index),
					...this.state.steps.slice(index + 1)
				]
			});
		}
	},

	handleAddStep(index) {
		
		this.setState({
			...this.state,
			steps: [
				...this.state.steps.slice(0, index),
				{},
				...this.state.steps.slice(index),
			]
		})
	},

	render() {
		return <React.Fragment>
			{(() => {
			})()}
			<div className={'wrapper'}>
				<header>
					<h1>Serial Replacer</h1>
					<p>Consecutive find-and-replace steps</p>
				</header>
				<main>
					{this.state.steps.map((step, index) => <Step
						key={index}
						index={index}
						showStepNumber={this.state.steps.length > 1}
						showInput={index === 0}
						input={index === 0 ? this.state.input : this.state.steps[index - 1].result}
						find={step.find}
						replace={step.replace}
						result={step.result}
						showReplaceAll={this.state.steps.length > 1 && index + 1 === this.state.steps.length}
						showRemoveStep={this.state.steps.length > 1}
						options={{...defaultOptions, ...step.options}}
						handleChangeOption={this.handleChangeOption}
						handleReplaceStep={this.handleReplaceStep}
						handleReplaceAll={this.handleReplaceAll}
						handleRemoveStep={this.handleRemoveStep}
						handleAddStep={this.handleAddStep}
						handleChangeInput={this.handleChangeInput}
						handleChangeFind={this.handleChangeFind}
						handleChangeReplace={this.handleChangeReplace}
					/>)}
				</main>
				<footer>
					by&nbsp;<a href="https://www.x128.com.br">x128</a>
				</footer>
			</div>
		</React.Fragment>
	},
});

const App = () => (<React.Fragment>
	<Wrapper />
</React.Fragment>)

const root = ReactDOM.createRoot(
	document.getElementById('root')
);
root.render(<App />);
