import { combineReducers } from 'redux';

import authReducer from './auth';
import recipeReducer from './recipe';

export default combineReducers({
	authReducer,
	recipeReducer,
});