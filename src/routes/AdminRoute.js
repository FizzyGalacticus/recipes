import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ isAdmin = false, component: Component, ...rest }) => (
	<Route {...rest} children={props => (isAdmin ? <Component {...props} /> : <Redirect to="/" />)} />
);

export default connect(state => {
	const {
		authReducer: { user },
	} = state;

	return { isAdmin: user && user.scope.includes('admin') };
})(AdminRoute);
