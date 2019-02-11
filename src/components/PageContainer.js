import React, { Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuBar from './MenuBar';
import Snackbar from './Snackbar';
import RecipeCreator from './RecipeCreator';
import MyRecipes from './MyRecipes';

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<CssBaseline />
				<MenuBar />
				<RecipeCreator />
				<MyRecipes />
				<Snackbar />
			</Fragment>
		);
	}
}

export default PageContainer;
