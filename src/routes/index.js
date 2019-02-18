// @flow

import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

/* Pages */
import Home from '../pages/Home';
import MyRecipes from '../pages/MyRecipes';

export const routes = [
	{
		name: 'Home',
		path: '/',
		exact: true,
		icon: null,
		component: Home,
	},
	{
		name: 'My Recipes',
		path: '/my-recipes',
		exact: true,
		icon: null,
		component: MyRecipes,
	},
];

export default props => (
	<Fragment>
		{routes.map(({ component: render, ...route }) => (
			<Route key={route.path} component={render} {...route} />
		))}
	</Fragment>
);
