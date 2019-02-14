import { firestore, auth } from '../firebase';
import { showNotification } from '../notification';

export const createActions = (prefix, name) => {
	const actionStarted = `${prefix.toUpperCase()}_${name.toUpperCase()}_STARTED`;
	const actionSuccess = `${prefix.toUpperCase()}_${name.toUpperCase()}_SUCCESS`;
	const actionFailure = `${prefix.toUpperCase()}_${name.toUpperCase()}_FAILURE`;

	return {
		actionStarted,
		actionSuccess,
		actionFailure,
	};
};

const createFirestoreHelper = (
	fn = Promise.resolve,
	mode = 'get',
	{ name = 'helper', responseModifier = response => response } = {}
) => {
	return (collectionName, { successNotification, errorNotification, actionType } = {}) => {
		const { actionStarted, actionSuccess, actionFailure } = createActions(
			mode,
			actionType ? actionType : collectionName
		);

		const helper = (...params) => {
			return (dispatch: Dispatch) => {
				dispatch({ type: actionStarted, auth: auth.getAuth() });

				fn(collectionName, ...params)
					.then(response => {
						dispatch({
							type: actionSuccess,
							response: responseModifier(response, ...params),
							auth: auth.getAuth(),
						});

						if (successNotification) {
							let message;

							if (typeof successNotification === 'function') {
								message = successNotification(response);
							} else {
								message = successNotification;
							}

							showNotification({ message, variant: 'success' });
						}
					})
					.catch(err => {
						dispatch({
							type: actionFailure,
							auth: auth.getAuth(),
							err,
						});

						if (errorNotification) {
							let message;

							if (typeof errorNotification === 'function') {
								message = errorNotification(err);
							} else {
								message = errorNotification;
							}

							showNotification({ message, variant: 'error' });
						}
					});
			};
		};

		return {
			[actionStarted]: actionStarted,
			[actionSuccess]: actionSuccess,
			[actionFailure]: actionFailure,
			[name]: helper,
		};
	};
};

export const createCreateDocumentAction = createFirestoreHelper(firestore.create, 'create', {
	name: 'createDocument',
	responseModifier: ({ id }, payload) => ({ ...payload, id }),
});

export const createGetCollectionAction = createFirestoreHelper(firestore.readCollection, 'get', {
	name: 'getCollection',
});

export const createUpdateDocumentAction = createFirestoreHelper(firestore.updateDocument, 'update', {
	name: 'updateDocument',
	responseModifier: (response, key, payload) => ({ ...payload, id: key }),
});

export const createSetEditingDocumentAction = collectionName => {
	const type = `SET_EDITING_${collectionName.toUpperCase()}`;

	return {
		[type]: type,
		setEditingDocument: (payload: any) => (dispatch: Dispatch) => dispatch({ type, payload }),
	};
};

export const emptyDispatch = () => (dispatch: Dispatch) => {};
