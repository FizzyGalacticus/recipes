import { createActionTypes, createActions } from '../helpers';
import { auth } from '../../firebase';

const loginUserAction = createActions('login');
export const loginUserStarted = loginUserAction.actionStarted;
export const loginUserSuccess = loginUserAction.actionSuccess;
export const loginUserFailure = loginUserAction.actionFailure;
export const loginUser = (email, password) =>
	loginUserAction.handler('login', 'POST', { email, password }, undefined, { onSuccess: console.log });

const getUserActions = createActionTypes('request', 'user');
export const REQUEST_USER_STARTED = getUserActions.actionStarted;
export const REQUEST_USER_SUCCESS = getUserActions.actionSuccess;
export const REQUEST_USER_FAILURE = getUserActions.actionFailure;
export const getUser = () => async (dispatch: Dispatch) => {
	const { actionStarted, actionSuccess, actionFailure } = getUserActions;

	dispatch({ type: actionStarted });

	try {
		const user = await auth.getUser();

		dispatch({ type: actionSuccess, response: user });
	} catch (err) {
		dispatch({ type: actionFailure, err });
	}
};

const loginActions = createActionTypes('firebase', 'login');
export const FIREBASE_LOGIN_STARTED = loginActions.actionStarted;
export const FIREBASE_LOGIN_SUCCESS = loginActions.actionSuccess;
export const FIREBASE_LOGIN_FAILURE = loginActions.actionFailure;
export const login = (storageOnly: boolean = false) => async (dispatch: Dispatch) => {
	const { actionStarted, actionSuccess, actionFailure } = loginActions;

	dispatch({ type: actionStarted });

	try {
		const response = await auth.login(storageOnly);

		dispatch({ type: actionSuccess, response });
		dispatch(getUser());
	} catch (err) {
		dispatch({ type: actionFailure, err });
	}
};

const logoutActions = createActionTypes('firebase', 'logout');
export const FIREBASE_LOGOUT_STARTED = logoutActions.actionStarted;
export const FIREBASE_LOGOUT_SUCCESS = logoutActions.actionSuccess;
export const FIREBASE_LOGOUT_FAILURE = logoutActions.actionFailure;
export const logout = () => async (dispatch: Dispatch) => {
	const { actionStarted, actionSuccess, actionFailure } = logoutActions;

	dispatch({ type: actionStarted });

	try {
		const response = await auth.logout();
		dispatch({ type: actionSuccess, response });
	} catch (err) {
		dispatch({ type: actionFailure, err });
	}
};

export const getAuth = auth.getAuth;

export default {
	FIREBASE_LOGIN_STARTED,
	FIREBASE_LOGIN_SUCCESS,
	FIREBASE_LOGIN_FAILURE,
	login,
	FIREBASE_LOGOUT_STARTED,
	FIREBASE_LOGOUT_SUCCESS,
	FIREBASE_LOGOUT_FAILURE,
	logout,
	REQUEST_USER_STARTED,
	REQUEST_USER_SUCCESS,
	REQUEST_USER_FAILURE,
	getUser,
	getAuth,
};
