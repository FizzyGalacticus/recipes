import React from 'react';

import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './lib/redux/store';

import PageContainer from './components/PageContainer';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Provider store={store}>
					<PageContainer />
				</Provider>
			</Router>
		);
	}
}

export default App;
