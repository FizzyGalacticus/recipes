// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { auth } from '../lib/firebase';

import recipeActions from '../lib/redux/actions/recipe';

type Props = {
	recipes: Array<Recipe>,
};

type State = {
	recipes: Array<Recipe>,
};

class MyRecipes extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			recipes: {},
		};
	}

	async componentDidMount() {
		const authUser = auth.getAuth();

		if (authUser)
			this.props.dispatch(recipeActions.getRecipes(['author', '==', authUser.user.uid]));
	}

	render() {
		return (
			<Grid container justify="center" alignItems="center">
				<Grid item sm={12}>
					<h1>My Recipes</h1>
					<List>
						{Object.entries(this.props.recipes).map(([id, recipe]) => {
							return (
								<ListItem
									key={id}
									onClick={e =>
										this.props.dispatch(recipeActions.setEditingRecipe({ ...recipe, id }))
									}
									button
								>
									{recipe.name}
								</ListItem>
							);
						})}
					</List>
				</Grid>
			</Grid>
		);
	}
}

MyRecipes.defaultProps = {
	recipes: [],
};

export default connect(state => {
	const {
		recipeReducer: { allRecipes },
	} = state;

	return { recipes: allRecipes };
})(MyRecipes);
