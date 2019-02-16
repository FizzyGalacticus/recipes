// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
		this.props.dispatch(recipeActions.getMyRecipes());
	}

	render() {
		return (
			<Grid
				container
				spacing={8}
				justify="center"
				alignItems="center"
				style={{ width: '95%', margin: 'auto auto' }}
			>
				<Grid item xs={12}>
					<h1>My Recipes</h1>
				</Grid>
				<Grid item xs={12}>
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
		recipeReducer: { myRecipes },
	} = state;

	return { recipes: myRecipes };
})(MyRecipes);
