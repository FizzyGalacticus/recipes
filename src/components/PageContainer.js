// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Routes from '../routes';

import MenuBar from './view/MenuBar';
import NavDrawer from './view/NavDrawer';
import Snackbar from './view/Snackbar';

type Props = {
	isAdmin: boolean,
	dispatch: Dispatch,
};

const PageContainer = ({ isAdmin }: Props) => {
	return (
		<Fragment>
			<NavDrawer />
			<Grid container style={{ height: '100%' }}>
				<Grid item xs={12}>
					<MenuBar />
				</Grid>
				<Grid item style={{ height: '100%', width: '100%' }}>
					<CssBaseline />
					<Routes isAdmin={isAdmin} />
				</Grid>
				<Snackbar />
			</Grid>
		</Fragment>
	);
};

export default withRouter(
	connect(store => {
		const {
			authReducer: { user },
		} = store;

		return { isAdmin: user && user.scope.includes('admin') };
	})(PageContainer)
);
