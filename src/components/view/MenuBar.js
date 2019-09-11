import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import { toggleNav } from '../../lib/redux/actions/menu';
import authActions from '../../lib/redux/actions/auth';

const MenuBar = ({ dispatch, menuOpen, isAuthorized }) => {
	const toggleNavCb = useCallback(() => dispatch(toggleNav()), [dispatch, toggleNav]);
	const loginCb = useCallback(() => dispatch(authActions.login()), [dispatch, authActions]);
	const logoutCb = useCallback(() => dispatch(authActions.logout()), [dispatch, authActions]);

	return (
		<AppBar position="static" style={{ zIndex: 250 }}>
			<Toolbar>
				{menuOpen ? null : (
					<IconButton color="inherit" aria-label="Menu" onClick={toggleNavCb}>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
					Recipes
				</Typography>
				{isAuthorized ? (
					<Button color="inherit" onClick={logoutCb}>
						Logout
					</Button>
				) : (
					<Button color="inherit" onClick={loginCb}>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default connect(store => {
	const {
		menuReducer: { open: menuOpen },
		authReducer: { isAuthorized, auth },
	} = store;

	return { menuOpen, isAuthorized, auth };
})(MenuBar);
