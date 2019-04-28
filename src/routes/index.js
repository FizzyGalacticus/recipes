// @flow

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoute from './AdminRoute';

/* Pages */
import Home from '../pages/Home';
import MyRecipes from '../pages/MyRecipes';
import Recipe from '../pages/Recipe';

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
		path: '/home',
		exact: true,
		icon: null,
		component: Home,
		showInNav: true,
	},
	{
		name: 'My Recipe',
		path: '/me/recipes/:recipeId',
		exact: true,
		icon: null,
		component: Recipe,
		showInNav: false,
	},
	{
		name: 'My Recipes',
		path: '/me/recipes',
		exact: true,
		icon: null,
		component: MyRecipes,
		showInNav: true,
	},
];

export const adminRoutes: Array<Route> = [
	{
		name: 'Create Recipe',
		path: '/admin/create-recipe',
		exact: true,
		icon: null,
		component: CreateRecipe,
		showInNav: true,
	},
];

export default props => (
	<Switch>
		{routes.map(({ path, component: Component, ...route }) => (
			<Route key={path} path={path} component={Component} {...route} />
		))}

		{adminRoutes.map(({ path, component: Component, exact, ...route }) => (
			<AdminRoute key={path} path={path} component={Component} {...route} />
		))}

		<Redirect from="/" to="/home" exact />
	</Switch>
);
