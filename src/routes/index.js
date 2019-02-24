// @flow

import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminRoute from './AdminRoute';

/* Pages */
import Home from '../pages/Home';
import MyRecipes from '../pages/MyRecipes';

/* Admin Pages */
import CreateRecipe from '../pages/admin/CreateRecipe';

type RecipesRoute = {
	name: string,
	path: string,
	exact: boolean,
	icon: string,
	component: any,
};

export const routes: Array<RecipesRoute> = [
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

export const adminRoutes: Array<Route> = [
	{
		name: 'Create Recipe',
		path: '/admin/create-recipe',
		exact: true,
		icon: null,
		component: CreateRecipe,
	},
];

export default props => (
	<Fragment>
		<Switch>
			{routes.map(({ component: render, ...route }) => (
				<Route key={route.path} component={render} {...route} />
			))}

			{adminRoutes.map(({ component: render, ...route }) => (
				<AdminRoute key={route.path} component={render} {...route} />
			))}
		</Switch>
	</Fragment>
);
