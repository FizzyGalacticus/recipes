// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Autosuggest from '../Autosuggest';

import ingredientActions from '../../../lib/redux/actions/ingredient';

type Props = {
	ingredients: { [FirebaseId]: RecipeIngredient },
	onSelect: (ingredient: RecipeIngredient) => any,
};

type State = {
	selectedItem: RecipeIngredient,
};

class IngredientPicker extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: [{ id: 'foo', name: 'Food' }, { id: 'bar', name: 'More food' }],
			selectedItem: {},
		};

		this.handleChange = this.handleChange.bind(this);
		this.getIngredientValue = this.getIngredientValue.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(ingredientActions.getIngredients());
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.ingredients.length !== this.props.ingredients.length && prevState.selectedItem.name) {
			const selectedItem = this.props.ingredients.find(
				ingredient => ingredient.name.toLowerCase() === prevState.selectedItem.name.toLowerCase()
			);

			if (!prevState.selectedItem.id && selectedItem.id) {
				this.setState({ selectedItem }, () => {
					this.props.onSelect(selectedItem);
				});
			}
		}
	}

	handleChange(newValue) {
		let selectedItem = this.props.ingredients.find(
			ingredient => ingredient.name.toLowerCase() === newValue.toLowerCase()
		);

		if (!selectedItem) selectedItem = { name: newValue };

		this.setState({ selectedItem });
	}

	getIngredientValue(ingredient) {
		return ingredient.name;
	}

	addIngredient() {
		const {
			state: { selectedItem },
		} = this;

		if (!selectedItem.name || selectedItem.name.length === 0) return;

		if (!selectedItem.id)
			this.props.dispatch(ingredientActions.createIngredient({ ...selectedItem, isRecipe: false }));
		else this.props.onSelect(selectedItem);
	}

	render() {
		return (
			<Grid container spacing={16} justify="center">
				<Grid item xs={8} md={11}>
					<Autosuggest
						label="Ingredients"
						placeholder="Select an ingredient"
						suggestions={this.props.ingredients}
						onChange={this.handleChange}
						getSuggestionValue={this.getIngredientValue}
					/>
				</Grid>
				<Grid item xs={2} md={1}>
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
	onSelect: ingredient => {},
};

export default connect(state => {
	let {
		ingredientReducer: { allIngredients: ingredients },
	} = state;

	ingredients = Object.entries(ingredients).map(([id, ingredient]) => ({ id, ...ingredient }));

	return { ingredients };
})(IngredientPicker);
