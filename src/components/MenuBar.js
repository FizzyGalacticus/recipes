import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import authActions from '../lib/redux/actions/auth';

class ButtonAppBar extends React.Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login() {
		this.props.dispatch(authActions.login());
	}

	logout() {
		this.props.dispatch(authActions.logout());
	}

	render() {
		return (
			<AppBar position="static">
				<Grid container>
					<Grid item xs={11} />
					<Grid item xs={1}>
						{this.props.isAuthorized ? (
							<Button color="inherit" onClick={this.logout}>
								Logout
							</Button>
						) : (
							<Button color="inherit" onClick={this.login}>
								Login
							</Button>
						)}
					</Grid>
				</Grid>
			</AppBar>
		);
	}
}

export default connect(store => {
	const {
		authReducer: { isAuthorized, auth },
	} = store;

	return { isAuthorized, auth };
})(ButtonAppBar);
