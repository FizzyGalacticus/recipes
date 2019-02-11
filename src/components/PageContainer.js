import React, { Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuBar from './MenuBar';
import Snackbar from './Snackbar';
import RecipeCreator from './RecipeCreator';
import MyRecipes from './MyRecipes';

class PageContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editingRecipe: {},
		};

		this.editRecipe = this.editRecipe.bind(this);
	}

	editRecipe(id, recipe) {
		this.setState({ editingRecipe: { id, ...recipe } });
	}

	render() {
		return (
			<Fragment>
				<CssBaseline />
				<MenuBar />
				<RecipeCreator recipe={this.state.editingRecipe} />
				<MyRecipes recipeSelected={this.editRecipe} />
				<Snackbar />
			</Fragment>
		);
	}
}

export default PageContainer;
