// @flow

import measurementActions from '../actions/measurement';
import { getDocsFromResponse } from '../../firebase/firestore';

const {
	CREATE_MEASUREMENTS_STARTED,
	CREATE_MEASUREMENTS_SUCCESS,
	CREATE_MEASUREMENTS_FAILURE,
	GET_MEASUREMENTS_STARTED,
	GET_MEASUREMENTS_SUCCESS,
	GET_MEASUREMENTS_FAILURE,
	UPDATE_MEASUREMENTS_STARTED,
	UPDATE_MEASUREMENTS_SUCCESS,
	UPDATE_MEASUREMENTS_FAILURE,
	SET_EDITING_MEASUREMENTS,
} = measurementActions;

type InitialState = {
	allMeasurements: { [string]: IngredientMeasurement },
	editingMeasurement: IngredientMeasurement,
	loadingMeasurements: boolean,
	err: any,
};

const initialState: InitialState = {
	allMeasurements: {},
	editingMeasurement: {},
	loadingMeasurements: false,
	err: null,
};

export default (state = initialState, action: Action) => {
	switch (action.type) {
		case CREATE_MEASUREMENTS_STARTED:
		case GET_MEASUREMENTS_STARTED:
		case UPDATE_MEASUREMENTS_STARTED:
			state = {
				...state,
				loadingMeasurements: true,
			};
			break;
		case CREATE_MEASUREMENTS_SUCCESS:
			const { response: newMeasurement } = action;

			const editingMeasurement = { ...newMeasurement };

			state = {
				...state,
				loadingMeasurements: false,
				allMeasurements: { [newMeasurement.id]: newMeasurement, ...state.allMeasurements },
				editingMeasurement,
			};
			break;
		case GET_MEASUREMENTS_SUCCESS:
			state = {
				...state,
				loadingMeasurements: false,
				allMeasurements: getDocsFromResponse(action.response),
			};
			break;
		case UPDATE_MEASUREMENTS_SUCCESS:
			const { response: updatedMeasurement } = action;

			state = {
				...state,
				loadingMeasurements: false,
				editingMeasurement: action.response,
				allMeasurements: {
					...state.allMeasurements,
					[updatedMeasurement.id]: updatedMeasurement,
				},
			};
			break;
		case CREATE_MEASUREMENTS_FAILURE:
		case GET_MEASUREMENTS_FAILURE:
		case UPDATE_MEASUREMENTS_FAILURE:
			state = {
				...state,
				loadingMeasurements: false,
				err: action.err,
			};
			break;
		case SET_EDITING_MEASUREMENTS:
			state = {
				...state,
				editingMeasurement: action.payload,
			};
			break;
	}

	return state;
};
