import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { auth, firestore } from '../lib/firebase';

class MyRecipes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipes: [],
		};
	}

	async componentDidMount() {
		const authUser = auth.getAuth();

		if (authUser) {
			const { docs } = await firestore.readCollection('recipes', ['author', '==', authUser.user.uid]);

			this.setState({ recipes: docs.map(doc => doc.data()) });
		}
	}

	render() {
		return (
			<Grid container justify="center" alignItems="center">
				<Grid item sm={12}>
					<h1>My Recipes</h1>
					<List>
						{this.state.recipes.map((recipe, idx) => {
							return <ListItem key={idx}>{recipe.name}</ListItem>;
						})}
					</List>
				</Grid>
			</Grid>
		);
	}
}

export default MyRecipes;
