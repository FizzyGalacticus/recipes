// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import Autosuggest from '../Autosuggest';

import ingredientActions from '../../../lib/redux/actions/ingredient';
import measurementActions from '../../../lib/redux/actions/measurement';

import { showNotification } from '../../../lib/notification';

type Props = {
	ingredients: { [FirebaseId]: RecipeIngredient },
	measurements: { [FirebaseId]: IngredientMeasurement },
	onSelect: ({ ingredient: RecipeIngredient, measurement: IngredientMeasurement, amount: int }) => any,
};

type State = {
	selectedIngredient: RecipeIngredient,
	selectedMeasurement: IngredientMeasurement,
};

class IngredientPicker extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			selectedIngredient: {},
			selectedMeasurement: {},
			amount: 0,
		};

		this.handleIngredientChange = this.handleIngredientChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
		this.getIngredientValue = this.getIngredientValue.bind(this);
		this.getMeasurementValue = this.getMeasurementValue.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(ingredientActions.getIngredients());
		this.props.dispatch(measurementActions.getMeasurements());
	}

	componentDidUpdate(prevProps, prevState) {
		let selectedIngredient, selectedMeasurement;
		let updated = false;

		if (prevProps.ingredients.length !== this.props.ingredients.length && prevState.selectedIngredient.name) {
			selectedIngredient = this.props.ingredients.find(
				ingredient => ingredient.name.toLowerCase() === prevState.selectedIngredient.name.toLowerCase()
			);

			if (!prevState.selectedIngredient.id && selectedIngredient.id) {
				updated = true;
			}
		}

		if (prevProps.measurements.length !== this.props.measurements.length && prevState.selectedMeasurement.name) {
			selectedMeasurement = this.props.measurements.find(
				measurement => measurement.name.toLowerCase() === prevState.selectedMeasurement.name.toLowerCase()
			);

			if (!prevState.selectedMeasurement.id && selectedMeasurement.id) {
				updated = true;
			}
		}

		if (updated) {
			const { amount } = this.state;

			this.setState({ selectedIngredient, selectedMeasurement }, () => {
				this.props.onSelect({ ingredient: selectedIngredient, measurement: selectedMeasurement, amount });
			});
		}
	}

	handleIngredientChange(newValue) {
		let selectedIngredient = this.props.ingredients.find(
			ingredient => ingredient.name.toLowerCase() === newValue.toLowerCase()
		);

		if (!selectedIngredient) selectedIngredient = { name: newValue };

		this.setState({ selectedIngredient });
	}

	handleAmountChange({ target: { value: amount = 0 } = {} } = {}) {
		this.setState({ amount: Number(amount) });
	}

	handleMeasurementChange(newValue) {
		let selectedMeasurement = this.props.measurements.find(
			measurement => measurement.name.toLowerCase() === newValue.toLowerCase()
		);

		if (!selectedMeasurement) selectedMeasurement = { name: newValue };

		this.setState({ selectedMeasurement });
	}

	getIngredientValue(ingredient) {
		return ingredient.name;
	}

	getMeasurementValue(measurement) {
		return measurement.name;
	}

	addIngredient() {
		const {
			state: { selectedIngredient, selectedMeasurement },
		} = this;

		if (!selectedIngredient.name || selectedIngredient.name.length === 0) {
			showNotification({ message: 'Cannot select empty ingredient', variant: 'error' });

			return;
		}

		if (!selectedMeasurement.name || selectedMeasurement.name.length === 0) {
			showNotification({ message: 'Cannot select empty measurement', variant: 'error' });

			return;
		}

		if (!selectedMeasurement.id) {
			this.props.dispatch(measurementActions.createMeasurement({ ...selectedMeasurement }));
			showNotification({ message: 'Must click add again after creation of measurement.' });
			return;
		}

		if (!selectedIngredient.id) {
			this.props.dispatch(ingredientActions.createIngredient({ ...selectedIngredient, isRecipe: false }));
		} else {
			const { amount } = this.state;

			this.props.onSelect({ ingredient: selectedIngredient, measurement: selectedMeasurement, amount });
		}
	}

	render() {
		return (
			<Grid container spacing={16} justify="center">
				<Grid item xs={5}>
					<Autosuggest
						label="Ingredient"
						placeholder="Select an ingredient"
						suggestions={this.props.ingredients}
						onChange={this.handleIngredientChange}
						getSuggestionValue={this.getIngredientValue}
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label="Amount"
						placeholder="Ingredient amount"
						defaultValue={this.state.amount}
						onChange={this.handleAmountChange}
						style={{ height: 250, flexGrow: 1 }}
					/>
				</Grid>
				<Grid item xs={3}>
					<Autosuggest
						label="Measurement"
						placeholder="Select a measurement"
						suggestions={this.props.measurements}
						onChange={this.handleMeasurementChange}
						getSuggestionValue={this.getMeasurementValue}
					/>
				</Grid>
				<Grid item xs={2}>
					<Fab color="primary" aria-label="Add Ingredient" onClick={this.addIngredient} size="small">
						<AddIcon />
					</Fab>
				</Grid>
			</Grid>
		);
	}
}

IngredientPicker.defaultProps = {
	ingredients: [],
	measurements: [],
	onSelect: () => {},
};

export default connect(state => {
	let {
		ingredientReducer: { allIngredients },
		measurementReducer: { allMeasurements },
	} = state;

	const ingredients = Object.entries(allIngredients).map(([id, ingredient]) => ({ id, ...ingredient }));
	const measurements = Object.entries(allMeasurements).map(([id, measurement]) => ({ id, ...measurement }));

	return { ingredients, measurements };
})(IngredientPicker);
