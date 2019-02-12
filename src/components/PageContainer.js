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
	}

	render() {
		return (
			<Fragment>
				<CssBaseline />
				<MenuBar />
				<RecipeCreator recipe={this.state.editingRecipe} />
				<MyRecipes />
				<Snackbar />
			</Fragment>
		);
	}
}

export default PageContainer;
