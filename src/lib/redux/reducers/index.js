import { combineReducers } from 'redux';

import authReducer from './auth';
import recipeReducer from './recipe';
import ingredientReducer from './ingredient';

export default combineReducers({
	authReducer,
	recipeReducer,
	ingredientReducer,
});
