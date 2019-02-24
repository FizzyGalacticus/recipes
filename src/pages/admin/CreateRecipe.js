import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';

import RecipeCreator from '../../components/create/Recipe/RecipeCreator';

import recipeAction from '../../lib/redux/actions/recipe';

class CreateRecipe extends Component {
	constructor(props) {
		super(props);

		this.reset = this.reset.bind(this);

		this.reset();
	}

	reset() {
		this.props.dispatch(recipeAction.setEditingRecipe({ id: '' }));
	}

	render() {
		return (
			<Grid container direction="column" justify="center" alignItems="center">
				<Grid item xs={12} md={4}>
					<Button onClick={this.reset} variant="contained" color="secondary">
						Reset
					</Button>
				</Grid>
				<Grid item xs={12} md={4}>
					<Divider />
				</Grid>
				<Grid item xs={12} md={4}>
					<RecipeCreator recipe={this.props.recipe} />
				</Grid>
			</Grid>
		);
	}
}

export default connect(store => {
	const {
		authReducer: { user },
		recipeReducer: { editingRecipe },
	} = store;

	return { recipe: editingRecipe, user };
})(CreateRecipe);
