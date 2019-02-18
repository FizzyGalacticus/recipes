import React, { Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import MenuBar from './view/MenuBar';
import Snackbar from './view/Snackbar';
import RecipeCreator from './create/Recipe/RecipeCreator';
import MyRecipes from './pages/MyRecipes';

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
					<Grid item>
						<CssBaseline />
						<RecipeCreator recipe={this.state.editingRecipe} />
						<MyRecipes />
						<Snackbar />
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default PageContainer;
