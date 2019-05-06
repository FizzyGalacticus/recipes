// @flow

import recipeActions from '../actions/recipe';
import { getDocFromResponse, getDocsFromResponse } from '../../firebase/firestore';

const {
	CREATE_RECIPES_STARTED,
	CREATE_RECIPES_SUCCESS,
	CREATE_RECIPES_FAILURE,
	GET_RECIPE_STARTED,
	GET_RECIPE_SUCCESS,
	GET_RECIPE_FAILURE,
	GET_RECIPES_STARTED,
	GET_RECIPES_SUCCESS,
	GET_RECIPES_FAILURE,
	GET_MY_RECIPES_STARTED,
	GET_MY_RECIPES_SUCCESS,
	GET_MY_RECIPES_FAILURE,
	UPDATE_RECIPES_STARTED,
	UPDATE_RECIPES_SUCCESS,
	UPDATE_RECIPES_FAILURE,
	SET_EDITING_RECIPES,
} = recipeActions;

type initialState = {
	allRecipes: { [string]: Recipe },
	myRecipes: { [string]: Recipe },
	editingRecipe: Recipe,
	loadingRecipes: boolean,
	err: any,
};

const initialState: initialState = {
	allRecipes: {},
	myRecipes: {},
	editingRecipe: {},
	loadingRecipes: false,
	err: null,
};

export default (state = initialState, action: Action) => {
	switch (action.type) {
		case CREATE_RECIPES_STARTED:
		case GET_RECIPE_STARTED:
		case GET_RECIPES_STARTED:
		case GET_MY_RECIPES_STARTED:
		case UPDATE_RECIPES_STARTED: {
			state = {
				...state,
				loadingRecipes: true,
			};
			break;
		}
		case CREATE_RECIPES_SUCCESS: {
			const { response: newRecipe, auth } = action;

			const editingRecipe = { ...newRecipe };

			let { myRecipes } = state;

			if (auth && auth.user.uid === newRecipe.author) {
				myRecipes = { [newRecipe.id]: newRecipe, ...myRecipes };
			}

			state = {
				...state,
				loadingRecipes: false,
				allRecipes: { [newRecipe.id]: newRecipe, ...state.allRecipes },
				myRecipes,
				editingRecipe,
			};
			break;
		}
		case GET_RECIPE_SUCCESS:
			const recipe = getDocFromResponse(action.response);

			state = {
				...state,
				loadingRecipes: false,
				allRecipes: { ...state.allRecipes, [recipe.id]: recipe },
			};
			break;
		case GET_RECIPES_SUCCESS: {
			state = {
				...state,
				loadingRecipes: false,
				allRecipes: getDocsFromResponse(action.response),
			};
			break;
		}
		case GET_MY_RECIPES_SUCCESS: {
			const myRecipes = getDocsFromResponse(action.response);

			state = {
				...state,
				loadingRecipes: false,
				allRecipes: { ...state.allRecipes, ...myRecipes },
				myRecipes: myRecipes,
			};
			break;
		}
		case UPDATE_RECIPES_SUCCESS: {
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
		}
		case CREATE_RECIPES_FAILURE:
		case GET_RECIPE_FAILURE:
		case GET_RECIPES_FAILURE:
		case GET_MY_RECIPES_FAILURE:
		case UPDATE_RECIPES_FAILURE: {
			state = {
				...state,
				loadingRecipes: false,
				err: action.err,
			};
			break;
		}
		case SET_EDITING_RECIPES: {
			state = {
				...state,
				editingRecipe: action.payload,
			};
			break;
		}
	}

	return state;
};
