import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

export default connect(state => {
	const {
		authReducer: { user },
	} = state;

	return { isAdmin: user ? !!user.isAdmin : false };
})(({ isAdmin = false, component: Component, ...rest }) => (
	<Route {...rest} render={props => (isAdmin ? <Component {...props} /> : <Redirect to="/" />)} />
));
