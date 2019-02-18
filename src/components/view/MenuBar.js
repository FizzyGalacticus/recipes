import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import { toggleNav } from '../../lib/redux/actions/menu';
import authActions from '../../lib/redux/actions/auth';

export default connect(store => {
	const {
		menuReducer: { open: menuOpen },
		authReducer: { isAuthorized, auth },
	} = store;

	return { menuOpen, isAuthorized, auth };
})(({ dispatch, menuOpen, isAuthorized, auth }) => (
	<AppBar position="static" style={{ zIndex: 250 }}>
		<Toolbar>
			{menuOpen ? null : (
				<IconButton color="inherit" aria-label="Menu" onClick={() => dispatch(toggleNav())}>
					<MenuIcon />
				</IconButton>
			)}
			<Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
				Recipes
			</Typography>
			{isAuthorized ? (
				<Button color="inherit" onClick={() => dispatch(authActions.logout())}>
					Logout
				</Button>
			) : (
				<Button color="inherit" onClick={() => dispatch(authActions.login())}>
					Login
				</Button>
			)}
		</Toolbar>
	</AppBar>
));
