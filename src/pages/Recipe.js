// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import recipeActions from '../lib/redux/actions/recipe';

type Props = {
	recipe: Recipe,
};

class RecipePage extends Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		const { recipe } = this.props;

		return (
			<Grid container>
				{recipe.picture && recipe.picture.length ? (
					<img src={recipe.picture} alt={`${recipe.name} picture`} />
				) : null}
				<Grid item xs={12}>
					<h3>Name: </h3>
					{recipe.name}
				</Grid>
				<Grid item xs={12}>
					<h5>Ingredients:</h5>
					<ul>
						{recipe.ingredients
							? Object.entries(recipe.ingredients).map(([ingredientId, { measurementId, amount }]) => {
									return (
										<li key={measurementId}>
											{ingredientId} ({amount} {measurementId})
										</li>
									);
							  })
							: null}
					</ul>
				</Grid>
			</Grid>
		);
	}
}

RecipePage.defaultProps = {
	recipe: {},
};

const mapStateToProps = (
	store,
	{
		match: {
			params: { recipeId },
		},
	}
) => {
	const {
		recipeReducer: { allRecipes },
	} = store;

	return { recipe: allRecipes[recipeId] };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	setTimeout(() => {
		if (!ownProps.recipe) {
			console.log('Retrieving...');
			dispatch(recipeActions.getRecipe(ownProps.match.params.recipeId));
		}
	}, 1200);

	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipePage);
