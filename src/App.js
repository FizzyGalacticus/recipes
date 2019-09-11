import React from 'react';

import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './lib/redux/store';

import PageContainer from './components/PageContainer';

export default () => (
	<Router>
		<Provider store={store}>
			<PageContainer />
		</Provider>
	</Router>
);
