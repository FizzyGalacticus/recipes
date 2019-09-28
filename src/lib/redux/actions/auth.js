import { createActionTypes, createActions } from '../helpers';

const registerUserAction = createActions('register_user', {
	successNotification: 'Registration successful!',
	errorNotification: err => err.message,
});
export const REQUEST_REGISTER_USER_STARTED = registerUserAction.actionStarted;
export const REQUEST_REGISTER_USER_SUCCESS = registerUserAction.actionSuccess;
export const REQUEST_REGISTER_USER_FAILURE = registerUserAction.actionFailure;
export const registerUser = (email, password, { onSuccess, onFailure } = {}) =>
	registerUserAction.handler('user/register', 'POST', { email, password }, undefined, { onSuccess, onFailure });

const loginUserAction = createActions('login_user', {
	successNotification: 'Login successful!',
	errorNotification: err => err.message,
});
export const REQUEST_LOGIN_USER_STARTED = loginUserAction.actionStarted;
export const REQUEST_LOGIN_USER_SUCCESS = loginUserAction.actionSuccess;
export const REQUEST_LOGIN_USER_FAILURE = loginUserAction.actionFailure;
export const loginUser = (email, password, { onSuccess, onFailure } = {}) =>
	loginUserAction.handler('user/login', 'POST', undefined, undefined, {
		headers: {
			authorization: `Basic ${btoa(`${email}:${password}`)}`,
		},
		onSuccess,
		onFailure,
	});

const logoutUserActions = createActionTypes('', 'logout_user');
export const LOGOUT_USER_SUCCESS = logoutUserActions.actionSuccess;
export const logoutUser = () => ({ type: LOGOUT_USER_SUCCESS });

export default {
	REQUEST_REGISTER_USER_STARTED,
	REQUEST_REGISTER_USER_SUCCESS,
	REQUEST_REGISTER_USER_FAILURE,
	registerUser,
	REQUEST_LOGIN_USER_STARTED,
	REQUEST_LOGIN_USER_SUCCESS,
	REQUEST_LOGIN_USER_FAILURE,
	loginUser,
	LOGOUT_USER_SUCCESS,
	logoutUser,
};
