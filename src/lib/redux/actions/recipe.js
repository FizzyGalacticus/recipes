// @flow

import {
	createCreateDocumentAction,
	createGetCollectionAction,
	createUpdateDocumentAction,
	createSetEditingDocumentAction,
	emptyDispatch,
} from '../helpers';

import { getAuth } from './auth';

const {
	CREATE_RECIPES_STARTED,
	CREATE_RECIPES_SUCCESS,
	CREATE_RECIPES_FAILURE,
	createDocument: createRecipe,
} = createCreateDocumentAction('recipes', {
	successNotification: 'Recipe created successfully!',
	errorNotification: err => `Could not retrieve recipes: ${err}`,
});

const {
	GET_RECIPES_STARTED,
	GET_RECIPES_SUCCESS,
	GET_RECIPES_FAILURE,
	getCollection: getRecipes,
} = createGetCollectionAction('recipes', { errorNotification: err => `Could not retrieve recipes: ${err}` });

const {
	GET_MY_RECIPES_STARTED,
	GET_MY_RECIPES_SUCCESS,
	GET_MY_RECIPES_FAILURE,
	getCollection: getMyRecipes,
} = createGetCollectionAction('recipes', {
	errorNotification: err => `Could not retrieve recipes: ${err}`,
	actionType: 'my_recipes',
});

const {
	UPDATE_RECIPES_STARTED,
	UPDATE_RECIPES_SUCCESS,
	UPDATE_RECIPES_FAILURE,
	updateDocument: updateRecipe,
} = createUpdateDocumentAction('recipes', {
	successNotification: 'Successfully updated recipe!',
	errorNotification: err => `Could not update recipe: ${err}`,
});

const { SET_EDITING_RECIPES, setEditingDocument: setEditingRecipe } = createSetEditingDocumentAction('recipes');

export default {
	CREATE_RECIPES_STARTED,
	CREATE_RECIPES_SUCCESS,
	CREATE_RECIPES_FAILURE,
	createRecipe,
	GET_RECIPES_STARTED,
	GET_RECIPES_SUCCESS,
	GET_RECIPES_FAILURE,
	getRecipes,
	GET_MY_RECIPES_STARTED,
	GET_MY_RECIPES_SUCCESS,
	GET_MY_RECIPES_FAILURE,
	getMyRecipes: () => (getAuth() ? getMyRecipes(['author', '==', getAuth().user.uid]) : emptyDispatch()),
	UPDATE_RECIPES_STARTED,
	UPDATE_RECIPES_SUCCESS,
	UPDATE_RECIPES_FAILURE,
	updateRecipe,
	SET_EDITING_RECIPES,
	setEditingRecipe,
};
