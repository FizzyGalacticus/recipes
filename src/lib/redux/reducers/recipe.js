// @flow

import recipeActions from '../actions/recipe';

const {
	CREATE_RECIPES_STARTED,
	CREATE_RECIPES_SUCCESS,
	CREATE_RECIPES_FAILURE,
	GET_RECIPES_STARTED,
	GET_RECIPES_SUCCESS,
	GET_RECIPES_FAILURE,
	UPDATE_RECIPES_STARTED,
	UPDATE_RECIPES_SUCCESS,
	UPDATE_RECIPES_FAILURE,
	SET_EDITING_RECIPES,
} = recipeActions;

const initialState = {
	allRecipes: {},
	myRecipes: [],
	viewRecipes: [],
	editingRecipe: {},
	loadingRecipes: false,
	err: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_RECIPES_STARTED:
		case GET_RECIPES_STARTED:
		case UPDATE_RECIPES_STARTED:
			state = {
				...state,
				loadingRecipes: true,
			};
			break;
		case CREATE_RECIPES_SUCCESS:
			const { response: newRecipe } = action;

			const editingRecipe = { ...newRecipe };

			state = {
				...state,
				loadingRecipes: false,
				allRecipes: { [newRecipe.id]: newRecipe, ...state.allRecipes },
				editingRecipe,
			};
			break;
		case GET_RECIPES_SUCCESS:
			state = {
				...state,
				loadingRecipes: false,
				allRecipes: action.response.docs.reduce((acc, doc) => {
					acc[doc.id] = doc.data();
					return acc;
				}, {}),
			};
			break;
		case UPDATE_RECIPES_SUCCESS:
			const { response: updatedRecipe } = action;

			state = {
				...state,
				loadingRecipes: false,
				editingRecipe: action.response,
				allRecipes: {
					...state.allRecipes,
					[updatedRecipe.id]: updatedRecipe,
				},
			};
			break;
		case CREATE_RECIPES_FAILURE:
		case GET_RECIPES_FAILURE:
		case UPDATE_RECIPES_FAILURE:
			state = {
				...state,
				loadingRecipes: false,
				err: action.err,
			};
			break;
		case SET_EDITING_RECIPES:
			state = {
				...state,
				editingRecipe: action.payload,
			};
	}

	return state;
};
