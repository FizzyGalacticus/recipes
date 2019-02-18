// @flow

import { TOGGLE_NAV_MENU } from '../actions/menu';

type initialState = {
	open: boolean,
};

const initialState: initialState = {
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
