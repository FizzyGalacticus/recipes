import React, { Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuBar from './MenuBar';

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<CssBaseline />
				<MenuBar />
			</Fragment>
		);
	}
}

export default PageContainer;
