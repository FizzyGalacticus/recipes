// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { login } from '../lib/redux/actions/auth';

import Routes from '../routes';

import MenuBar from './view/MenuBar';
import NavDrawer from './view/NavDrawer';
import Snackbar from './view/Snackbar';

type Props = {
	isAdmin: boolean,
	dispatch: Dispatch,
};

class PageContainer extends Component<Props> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(login(true));
	}

	render() {
		return (
			<Fragment>
				<NavDrawer />
				<Grid container>
					<Grid item xs={12}>
						<MenuBar />
					</Grid>
					<Grid item>
						<CssBaseline />
						<Routes isAdmin={this.props.isAdmin} />
					</Grid>
					<Snackbar />
				</Grid>
			</Fragment>
		);
	}
}

export default withRouter(
	connect(store => {
		const {
			authReducer: { user },
		} = store;

		return { isAdmin: user ? !!user.isAdmin : false };
	})(PageContainer)
);
