// @flow

import React from 'react';
import deburr from 'lodash.deburr';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

type Props = {
	suggestions: Array<any>,
	maxCount?: number,
	placeholder?: string,
	onChange: (newValue: string) => any,
	getSuggestionValue?: any => string,
	label?: string,
	inputProps?: Object,
	searchMethod?: 'contains' | 'startsWith',
	caseSensitive?: boolean,
};

type State = {
	single: string,
	suggestions: Array<any>,
};

const styles = theme => ({
	root: {
		height: 250,
		flexGrow: 1,
	},
	container: {
		position: 'relative',
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	divider: {
		height: theme.spacing.unit * 2,
	},
});

class MUIAutosuggest extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			single: '',
			suggestions: [],
		};

		this.renderInputComponent = this.renderInputComponent.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
		this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	renderInputComponent(inputProps) {
		const { classes, inputRef = () => {}, ref, ...other } = inputProps;

		return (
			<TextField
				fullWidth
				InputProps={{
					inputRef: node => {
						ref(node);
						inputRef(node);
					},
					classes: {
						input: classes.input,
					},
				}}
				{...other}
			/>
		);
	}

	renderSuggestion(suggestion, { query, isHighlighted }) {
		const suggestionValue = this.props.getSuggestionValue(suggestion);

		const parts = query
			.split(' ')
			.reduce((acc, word) => {
				const index = suggestionValue.toLowerCase().indexOf(word.toLowerCase());

				if (index > -1) {
					const partOne = suggestionValue.substring(0, index);
					const partTwo = suggestionValue.substring(index, index + word.length);
					const partThree = suggestionValue.substring(index + word.length);

					acc.push(
						{ text: partOne, highlight: false },
						{ text: partTwo, highlight: true },
						{ text: partThree, highlight: false }
					);
				} else {
					acc.push({ text: suggestionValue, highlight: false });
				}

				return acc;
			}, [])
			.filter(part => part.text.length);

		return (
			<MenuItem selected={isHighlighted} component="div">
				<div>
					{parts.map((part, index) =>
						part.highlight ? (
							<span key={String(index)} style={{ fontWeight: 500 }}>
								{part.text}
							</span>
						) : (
							<strong key={String(index)} style={{ fontWeight: 300 }}>
								{part.text}
							</strong>
						)
					)}
				</div>
			</MenuItem>
		);
	}

	getSuggestions(value) {
		const inputValue = deburr(value.trim()).toLowerCase();
		const inputLength = inputValue.length;
		const {
			props: { caseSensitive },
		} = this;

		if (inputLength === 0)
			return [];
		

		const filtered = this.props.suggestions.filter(suggestion => {
			const value = this.props.getSuggestionValue(suggestion);
			let searchVal = '';
			let keep = false;

			switch (this.props.searchMethod) {
				case 'contains':
					searchVal = value;

					keep = caseSensitive
						? searchVal.includes(inputValue)
						: searchVal.toLowerCase().includes(inputValue.toLowerCase());
					break;
				case 'startsWith':
					searchVal = value.slice(0, inputLength);

					keep = caseSensitive
						? searchVal === inputValue
						: searchVal.toLowerCase() === inputValue.toLowerCase();
					break;
			}

			return keep;
		});

		return filtered.slice(0, this.props.maxCount);
	}

	handleSuggestionsFetchRequested({ value }) {
		this.setState({
			suggestions: this.getSuggestions(value),
		});
	}

	handleSuggestionsClearRequested() {
		this.setState({
			suggestions: [],
		});
	}

	handleChange(name) {
		return (event, { newValue }) => {
			this.setState({ [name]: newValue }, () => {
				this.props.onChange(newValue);
			});
		};
	}

	render() {
		const {
			renderInputComponent,
			renderSuggestion,
			handleSuggestionsFetchRequested,
			handleSuggestionsClearRequested,
			props: { classes, getSuggestionValue },
			state: { suggestions },
		} = this;

		const autosuggestProps = {
			renderInputComponent,
			suggestions,
			onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
			onSuggestionsClearRequested: handleSuggestionsClearRequested,
			getSuggestionValue,
			renderSuggestion,
		};

		return (
			<div className={classes.root}>
				<Autosuggest
					{...autosuggestProps}
					inputProps={{
						...this.props.inputProps,
						classes,
						label: this.props.label,
						placeholder: this.props.placeholder,
						value: this.state.single,
						onChange: this.handleChange('single'),
					}}
					theme={{
						container: classes.container,
						suggestionsContainerOpen: classes.suggestionsContainerOpen,
						suggestionsList: classes.suggestionsList,
						suggestion: classes.suggestion,
					}}
					renderSuggestionsContainer={options => (
						<Paper {...options.containerProps} square>
							{options.children}
						</Paper>
					)}
				/>
			</div>
		);
	}
}

MUIAutosuggest.defaultProps = {
	suggestions: [],
	maxCount: 5,
	placeholder: 'Type to search',
	getSuggestionValue: suggestion => suggestion.label,
	inputProps: {},
	searchMethod: 'contains',
	caseSensitive: false,
};

export default withStyles(styles)(MUIAutosuggest);
