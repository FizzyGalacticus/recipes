import { firestore } from '../firebase';
import { showNotification } from '../notification';

const createActions = (prefix, name) => {
	const actionStarted = `${prefix.toUpperCase()}_${name.toUpperCase()}_STARTED`;
	const actionSuccess = `${prefix.toUpperCase()}_${name.toUpperCase()}_SUCCESS`;
	const actionFailure = `${prefix.toUpperCase()}_${name.toUpperCase()}_FAILURE`;

	return {
		actionStarted,
		actionSuccess,
		actionFailure,
	};
};

export const createCreateDocumentAction = (collectionName, { successNotification, errorNotification } = {}) => {
	const { actionStarted, actionSuccess, actionFailure } = createActions('create', collectionName);

	const createDocument = payload => {
		return dispatch => {
			dispatch({ type: actionStarted });

			firestore
				.create(collectionName, payload)
				.then(({ id }) => {
					const response = { ...payload, id };

					dispatch({
						type: actionSuccess,
						response,
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
		createDocument,
	};
};

export const createGetCollectionAction = (collectionName, { successNotification, errorNotification } = {}) => {
	const { actionStarted, actionSuccess, actionFailure } = createActions('get', collectionName);

	const getCollection = whereClause => {
		return dispatch => {
			dispatch({ type: actionStarted });

			firestore
				.readCollection(collectionName, whereClause)
				.then(response => {
					dispatch({
						type: actionSuccess,
						response,
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
		getCollection,
	};
};

export const createUpdateDocumentAction = (collectionName, { successNotification, errorNotification } = {}) => {
	const { actionStarted, actionSuccess, actionFailure } = createActions('update', collectionName);

	const updateDocument = (key, payload) => {
		return dispatch => {
			dispatch({ type: actionStarted });

			firestore
				.updateDocument(collectionName, key, payload)
				.then(() => {
					const response = { ...payload, id: key };

					dispatch({
						type: actionSuccess,
						response,
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
		updateDocument,
	};
};

export const createSetEditingDocumentAction = collectionName => {
	const type = `SET_EDITING_${collectionName.toUpperCase()}`;

	return {
		[type]: type,
		setEditingDocument: payload => dispatch => dispatch({ type, payload }),
	};
};
