// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { login } from '../lib/redux/actions/auth';

import Routes from '../routes';

import MenuBar from './view/MenuBar';
import NavDrawer from './view/NavDrawer';
import Snackbar from './view/Snackbar';

class PageContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editingRecipe: {},
		};
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
						<Routes />
					</Grid>
					<Snackbar />
				</Grid>
			</Fragment>
		);
	}
}

export default connect()(PageContainer);
