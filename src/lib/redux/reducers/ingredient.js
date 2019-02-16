// @flow

import ingredientActions from '../actions/ingredient';
import { getDocsFromResponse } from '../../firebase/firestore';

const {
	CREATE_INGREDIENTS_STARTED,
	CREATE_INGREDIENTS_SUCCESS,
	CREATE_INGREDIENTS_FAILURE,
	GET_INGREDIENTS_STARTED,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILURE,
	UPDATE_INGREDIENTS_STARTED,
	UPDATE_INGREDIENTS_SUCCESS,
	UPDATE_INGREDIENTS_FAILURE,
	SET_EDITING_INGREDIENTS,
} = ingredientActions;

type initialState = {
	allIngredients: { [string]: RecipeIngredient },
	viewIngredients: { [string]: RecipeIngredient },
	editingIngredient: RecipeIngredient,
	loadingIngredients: boolean,
	err: any,
};

const initialState: initialState = {
	allIngredients: {},
	viewIngredients: {},
	editingIngredient: {},
	loadingIngredients: false,
	err: null,
};

export default (state = initialState, action: Action) => {
	switch (action.type) {
		case CREATE_INGREDIENTS_STARTED:
		case GET_INGREDIENTS_STARTED:
		case UPDATE_INGREDIENTS_STARTED:
			state = {
				...state,
				loadingIngredients: true,
			};
			break;
		case CREATE_INGREDIENTS_SUCCESS:
			const { response: newIngredient } = action;

			const editingIngredient = { ...newIngredient };

			state = {
				...state,
				loadingIngredients: false,
				allIngredients: { [newIngredient.id]: newIngredient, ...state.allIngredients },
				editingIngredient,
			};
			break;
		case GET_INGREDIENTS_SUCCESS:
			state = {
				...state,
				loadingIngredients: false,
				allIngredients: getDocsFromResponse(action.response),
			};
			break;
		case UPDATE_INGREDIENTS_SUCCESS:
			const { response: updatedIngredient } = action;

			state = {
				...state,
				loadingIngredients: false,
				editingIngredient: action.response,
				allIngredients: {
					...state.allIngredients,
					[updatedIngredient.id]: updatedIngredient,
				},
			};
			break;
		case CREATE_INGREDIENTS_FAILURE:
		case GET_INGREDIENTS_FAILURE:
		case UPDATE_INGREDIENTS_FAILURE:
			state = {
				...state,
				loadingIngredients: false,
				err: action.err,
			};
			break;
		case SET_EDITING_INGREDIENTS:
			state = {
				...state,
				editingIngredient: action.payload,
			};
			break;
	}

	return state;
};
