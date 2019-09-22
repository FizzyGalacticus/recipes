// @flow

import authActions from '../actions/auth';
import storage from '../../util/localStorage';

const {
	REQUEST_REGISTER_USER_STARTED,
	REQUEST_REGISTER_USER_SUCCESS,
	REQUEST_REGISTER_USER_FAILURE,
	REQUEST_LOGIN_USER_STARTED,
	REQUEST_LOGIN_USER_SUCCESS,
	REQUEST_LOGIN_USER_FAILURE,
	LOGOUT_USER_SUCCESS,
} = authActions;

type InitialState = {
	auth: FirebaseAuth,
	user: Object,
	isAuthorized: boolean,
	loggingIn: boolean,
	loggingOut: boolean,
	err: any,
};

const initialState = {
	registering: false,
	loggingIn: false,
	loggingOut: false,
	token: null,
	isAuthorized: false,
	err: null,
	auth: null,
	user: null,
};

const initDefaultState = () => {
	const oldState = storage.getItem('auth_state');

	return oldState || initialState;
};

const persistState = state => storage.setItem('auth_state', state);

const clearPersistedState = () => storage.removeItem('auth_state');

export default (state: InitialState = initDefaultState(), action: Action) => {
	switch (action.type) {
		case REQUEST_REGISTER_USER_STARTED: {
			state = {
				...state,
				registering: true,
			};
			break;
		}
		case REQUEST_REGISTER_USER_SUCCESS: {
			state = {
				...state,
				registering: false,
				token: action.json.token,
				user: action.json.user,
				isAuthorized: true,
			};
			break;
		}
		case REQUEST_REGISTER_USER_FAILURE: {
			state = {
				...state,
				registering: false,
				err: action.err,
			};
			break;
		}
		case REQUEST_LOGIN_USER_STARTED: {
			state = {
				...state,
				loggingIn: true,
			};
			break;
		}
		case REQUEST_LOGIN_USER_SUCCESS: {
			state = {
				...state,
				loggingIn: false,
				token: action.json.token,
				user: action.json.user,
				isAuthorized: true,
			};
			break;
		}
		case REQUEST_LOGIN_USER_FAILURE: {
			state = {
				...state,
				loggingIn: false,
				err: action.err,
			};
			break;
		}
		case LOGOUT_USER_SUCCESS: {
			clearPersistedState();
			state = initialState;
			break;
		}
	}

	persistState(state);

	return state;
};
