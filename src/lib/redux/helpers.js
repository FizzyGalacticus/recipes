// @flow

import apiConfig from '../../../config/api';
import { showNotification } from '../notification';

const baseUrl = apiConfig.host;

const getNotificationMessage = (msg, notif) => (typeof msg === 'function' ? msg(notif) : msg);

export const createActionTypes = (prefix: string, name: string) => {
	const actionStarted = `${prefix.toUpperCase()}_${name.toUpperCase()}_STARTED`;
	const actionSuccess = `${prefix.toUpperCase()}_${name.toUpperCase()}_SUCCESS`;
	const actionFailure = `${prefix.toUpperCase()}_${name.toUpperCase()}_FAILURE`;

	return {
		actionStarted,
		actionSuccess,
		actionFailure,
	};
};

export const createActions = (name: String, { successNotification, errorNotification, adminActions = false } = {}) => {
	const actionTypes = createActionTypes('request', name);

	return {
		...actionTypes,
		handler: (
			endpoint,
			method = 'GET',
			payload,
			params,
			{ onSuccess = () => {}, onError = () => {}, headers = {} } = {}
		) => async (dispatch /* , getState */) => {
			dispatch({ type: actionTypes.actionStarted });

			const options = {
				method,
				params,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					...headers,
				},
			};

			console.log(options);

			if (payload) {
				options.body = JSON.stringify(payload);
			}

			try {
				const response = await fetch(`${baseUrl}/${adminActions ? 'admin' : 'web'}/${endpoint}`, options);
				const json = await response.json();

				const { status } = response;

				if (status < 200 || status > 299) {
					if (errorNotification) {
						const message = getNotificationMessage(errorNotification, json);
						showNotification({ message, variant: 'error' });
					} else {
						showNotification({ message: json.message, variant: 'error' });
					}

					dispatch({ type: actionTypes.actionFailure, err: json });

					onError(json);
				} else {
					if (successNotification) {
						const message = getNotificationMessage(successNotification, json);
						showNotification({ message, variant: 'success' });
					}

					dispatch({ type: actionTypes.actionSuccess, json });

					onSuccess(json);
				}
			} catch (err) {
				if (errorNotification) {
					const message = getNotificationMessage(errorNotification, err);
					showNotification({ message, variant: 'error' });
				}

				dispatch({ type: actionTypes.actionFailure, err });

				onError(err);
			}
		},
	};
};

export default { createActionTypes, createActions };
