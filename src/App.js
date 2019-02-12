import React from 'react';

import { Provider } from 'react-redux';

import store from './lib/redux/store';

import PageContainer from './components/PageContainer';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<PageContainer />
			</Provider>
		);
	}
}

export default App;
