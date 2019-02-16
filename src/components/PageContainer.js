import React, { Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import MenuBar from './MenuBar';
import Snackbar from './Snackbar';
import IngredientPicker from './IngredientPicker';
import RecipeCreator from './RecipeCreator';
import MyRecipes from './MyRecipes';

class PageContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editingRecipe: {},
		};
	}

	render() {
		return (
			<Fragment>
				<MenuBar />
				<Grid container justify="center" alignItems="center">
					<Grid item xs={8}>
						<CssBaseline />
						<RecipeCreator recipe={this.state.editingRecipe} />
						<MyRecipes />
						<IngredientPicker />
						<Snackbar />
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default PageContainer;
