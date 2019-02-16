// @flow

import {
	createCreateDocumentAction,
	createGetCollectionAction,
	createUpdateDocumentAction,
	createSetEditingDocumentAction,
} from '../helpers';

const {
	CREATE_INGREDIENTS_STARTED,
	CREATE_INGREDIENTS_SUCCESS,
	CREATE_INGREDIENTS_FAILURE,
	createDocument: createIngredient,
} = createCreateDocumentAction('ingredients', {
	successNotification: 'Ingredient created successfully!',
	errorNotification: err => `Could not retrieve ingredients: ${err}`,
});

const {
	GET_INGREDIENTS_STARTED,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILURE,
	getCollection: getIngredients,
} = createGetCollectionAction('ingredients', { errorNotification: err => `Could not retrieve ingredients: ${err}` });

const {
	UPDATE_INGREDIENTS_STARTED,
	UPDATE_INGREDIENTS_SUCCESS,
	UPDATE_INGREDIENTS_FAILURE,
	updateDocument: updateIngredient,
} = createUpdateDocumentAction('ingredients', {
	successNotification: 'Successfully updated ingredient!',
	errorNotification: err => `Could not update ingredient: ${err}`,
});

const { SET_EDITING_INGREDIENTS, setEditingDocument: setEditingIngredient } = createSetEditingDocumentAction(
	'ingredients'
);

export default {
	CREATE_INGREDIENTS_STARTED,
	CREATE_INGREDIENTS_SUCCESS,
	CREATE_INGREDIENTS_FAILURE,
	createIngredient,
	GET_INGREDIENTS_STARTED,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILURE,
	getIngredients,
	UPDATE_INGREDIENTS_STARTED,
	UPDATE_INGREDIENTS_SUCCESS,
	UPDATE_INGREDIENTS_FAILURE,
	updateIngredient,
	SET_EDITING_INGREDIENTS,
	setEditingIngredient,
};
