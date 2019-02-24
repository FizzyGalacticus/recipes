import { createActions } from '../helpers';
import { auth } from '../../firebase';

const getUserActions = createActions('request', 'user');
export const REQUEST_USER_STARTED = getUserActions.actionStarted;
export const REQUEST_USER_SUCCESS = getUserActions.actionSuccess;
export const REQUEST_USER_FAILURE = getUserActions.actionFailure;
export const getUser = () => (dispatch: Dispatch) => {
	const { actionStarted, actionSuccess, actionFailure } = getUserActions;

	dispatch({ type: actionStarted });

	auth.getUser()
		.then(user => dispatch({ type: actionSuccess, response: user }))
		.catch(err => dispatch({ type: actionFailure, err }));
};

const loginActions = createActions('firebase', 'login');
export const FIREBASE_LOGIN_STARTED = loginActions.actionStarted;
export const FIREBASE_LOGIN_SUCCESS = loginActions.actionSuccess;
export const FIREBASE_LOGIN_FAILURE = loginActions.actionFailure;
export const login = (storageOnly: boolean = false) => (dispatch: Dispatch) => {
	const { actionStarted, actionSuccess, actionFailure } = loginActions;

	dispatch({ type: actionStarted });

	auth.login(storageOnly)
		.then(response => {
			dispatch({ type: actionSuccess, response });
			dispatch(getUser());
		})
		.catch(err => dispatch({ type: actionFailure, err }));
};

const logoutActions = createActions('firebase', 'logout');
export const FIREBASE_LOGOUT_STARTED = logoutActions.actionStarted;
export const FIREBASE_LOGOUT_SUCCESS = logoutActions.actionSuccess;
export const FIREBASE_LOGOUT_FAILURE = logoutActions.actionFailure;
export const logout = () => (dispatch: Dispatch) => {
	const { actionStarted, actionSuccess, actionFailure } = logoutActions;

	dispatch({ type: actionStarted });

	auth.logout()
		.then(response => dispatch({ type: actionSuccess, response }))
		.catch(err => dispatch({ type: actionFailure, err }));
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
