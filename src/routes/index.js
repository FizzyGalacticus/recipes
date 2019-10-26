// @flow

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoute from './AdminRoute';

/* Pages */
import Home from '../pages/Home';
import Login from '../pages/Login';
import CreateRecipe from '../pages/CreateRecipe';

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
		name: 'Login',
		path: '/login',
		exact: true,
		icon: null,
		component: Login,
		showInNav: false,
	},
	{ name: 'Create Recipe', path: '/recipes/new', exact: true, component: CreateRecipe, showInNav: true },
];

export const adminRoutes: Array<Route> = [];

export default () => (
	<Switch>
		{routes.map(({ path, component: Component, ...route }) => (
			<Route key={path} path={path} component={Component} {...route} />
		))}

		{adminRoutes.map(({ path, component: Component, ...route }) => (
			<AdminRoute key={path} path={path} component={Component} {...route} />
		))}

		<Redirect from="/" to="/home" exact />
	</Switch>
);
