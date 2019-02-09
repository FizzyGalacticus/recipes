import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import firebase from '../lib/firebase';

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class ButtonAppBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: firebase.getAuthenticated(),
		};

		this.login = this.login.bind(this);
	}

	async login() {
		try {
			await firebase.login();
			this.setState({ loggedIn: true });
		} catch (err) {
			// Do nothing
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						{this.state.loggedIn ? (
							<Button color="inherit">Logout</Button>
						) : (
							<Button color="inherit" onClick={this.login}>
								Login
							</Button>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(ButtonAppBar);
