import { createActions } from '../helpers';
import { auth } from '../../firebase';

const loginActions = createActions('firebase', 'login');
const FIREBASE_LOGIN_STARTED = loginActions.actionStarted;
const FIREBASE_LOGIN_SUCCESS = loginActions.actionSuccess;
const FIREBASE_LOGIN_FAILURE = loginActions.actionFailure;
const login = () => dispatch => {
	const { actionStarted, actionSuccess, actionFailure } = loginActions;

	dispatch({ type: actionStarted });

	auth.login()
		.then(response => dispatch({ type: actionSuccess, response }))
		.catch(err => dispatch({ type: actionFailure, err }));
};

const logoutActions = createActions('firebase', 'logout');
const FIREBASE_LOGOUT_STARTED = logoutActions.actionStarted;
const FIREBASE_LOGOUT_SUCCESS = logoutActions.actionSuccess;
const FIREBASE_LOGOUT_FAILURE = logoutActions.actionFailure;
const logout = () => dispatch => {
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
	getAuth,
};
