// @flow

import authActions from '../actions/auth';

const {
	FIREBASE_LOGIN_STARTED,
	FIREBASE_LOGIN_SUCCESS,
	FIREBASE_LOGIN_FAILURE,
	FIREBASE_LOGOUT_STARTED,
	FIREBASE_LOGOUT_SUCCESS,
	FIREBASE_LOGOUT_FAILURE,
	getAuth,
} = authActions;

const auth = getAuth();

type initialState = {
	auth: FirebaseAuth,
	isAuthorized: boolean,
	loggingIn: boolean,
	loggingOut: boolean,
	err: any,
};

const initialState = {
	auth,
	isAuthorized: auth !== null,
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
				isAuthorized: true,
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
	}

	return state;
};
