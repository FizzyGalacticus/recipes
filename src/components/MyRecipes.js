// @flow

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { auth, firestore } from '../lib/firebase';

type Props = {
	recipeSelected: (Recipe.id, Recipe) => void,
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

		if (authUser) {
			const { docs } = await firestore.readCollection('recipes', ['author', '==', authUser.user.uid]);

			const recipes = docs.reduce((acc, doc) => {
				acc[doc.id] = doc.data();

				return acc;
			}, {});

			this.setState({ recipes });
		}
	}

	render() {
		return (
			<Grid container justify="center" alignItems="center">
				<Grid item sm={12}>
					<h1>My Recipes</h1>
					<List>
						{Object.entries(this.state.recipes).map(([key, recipe]) => {
							return (
								<ListItem key={key} onClick={(e) => this.props.recipeSelected(key, recipe)} button>
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
	recipeSelected: () => {},
};

export default MyRecipes;
