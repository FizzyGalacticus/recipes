// @flow

import { TOGGLE_NAV_MENU } from '../actions/menu';

type InitialState = {
	open: boolean,
};

const initialState: InitialState = {
	open: false,
};

export default (state = initialState, action: Action) => {
	switch (action.type) {
		case TOGGLE_NAV_MENU:
			state = {
				open: !state.open,
			};
			break;
	}

	return state;
};
