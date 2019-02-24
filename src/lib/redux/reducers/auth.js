// @flow

import authActions from '../actions/auth';

const {
	FIREBASE_LOGIN_STARTED,
	FIREBASE_LOGIN_SUCCESS,
	FIREBASE_LOGIN_FAILURE,
	FIREBASE_LOGOUT_STARTED,
	FIREBASE_LOGOUT_SUCCESS,
	FIREBASE_LOGOUT_FAILURE,
	REQUEST_USER_SUCCESS,
	REQUEST_USER_FAILURE,
} = authActions;

type initialState = {
	auth: FirebaseAuth,
	user: Object,
	isAuthorized: boolean,
	loggingIn: boolean,
	loggingOut: boolean,
	err: any,
};

const initialState = {
	auth: null,
	user: null,
	isAuthorized: false,
	loggingIn: false,
	loggingOut: false,
	err: null,
};

export default (state: initialState = initialState, action: Action) => {
	switch (action.type) {
		case FIREBASE_LOGIN_STARTED:
			state = {
				...state,
				loggingIn: true,
			};
			break;
		case FIREBASE_LOGIN_SUCCESS:
			state = {
				...state,
				loggingIn: false,
				isAuthorized: action.response !== null,
				auth: action.response,
			};
			break;
		case FIREBASE_LOGIN_FAILURE:
			state = {
				...state,
				loggingIn: false,
				err: action.err,
			};
			break;
		case FIREBASE_LOGOUT_STARTED:
			state = {
				...state,
				loggingOut: true,
			};
			break;
		case FIREBASE_LOGOUT_SUCCESS:
			state = {
				...state,
				loggingOut: false,
				auth: null,
				isAuthorized: false,
			};
			break;
		case FIREBASE_LOGOUT_FAILURE:
			state = {
				...state,
				loggingOut: false,
				err: action.err,
			};
			break;
		case REQUEST_USER_SUCCESS:
			state = {
				...state,
				user: action.response,
			};
			break;
		case REQUEST_USER_FAILURE:
			state = {
				...state,
				err: action.err,
			};
			break;
	}

	return state;
};
