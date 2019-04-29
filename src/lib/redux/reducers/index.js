import { combineReducers } from 'redux';

import menuReducer from './menu';
import authReducer from './auth';
import recipeReducer from './recipe';
import ingredientReducer from './ingredient';
import measurementReducer from './measurement';

export default combineReducers({
	menuReducer,
	authReducer,
	recipeReducer,
	ingredientReducer,
	measurementReducer,
});
