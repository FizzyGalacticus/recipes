import { combineReducers } from 'redux';

import menuReducer from './menu';
import authReducer from './auth';

export default combineReducers({
	menuReducer,
	authReducer,
});
