// @flow

import {
	createCreateDocumentAction,
	createGetCollectionAction,
	createUpdateDocumentAction,
	createSetEditingDocumentAction,
} from '../helpers';

const {
	CREATE_MEASUREMENTS_STARTED,
	CREATE_MEASUREMENTS_SUCCESS,
	CREATE_MEASUREMENTS_FAILURE,
	createDocument: createMeasurement,
} = createCreateDocumentAction('measurements', {
	successNotification: 'Measurement created successfully!',
	errorNotification: err => `Could not retrieve measurements: ${err}`,
});

const {
	GET_MEASUREMENTS_STARTED,
	GET_MEASUREMENTS_SUCCESS,
	GET_MEASUREMENTS_FAILURE,
	getCollection: getMeasurements,
} = createGetCollectionAction('measurements', { errorNotification: err => `Could not retrieve measurements: ${err}` });

const {
	UPDATE_MEASUREMENTS_STARTED,
	UPDATE_MEASUREMENTS_SUCCESS,
	UPDATE_MEASUREMENTS_FAILURE,
	updateDocument: updateMeasurement,
} = createUpdateDocumentAction('measurements', {
	successNotification: 'Successfully updated measurement!',
	errorNotification: err => `Could not update measurement: ${err}`,
});

const { SET_EDITING_MEASUREMENTS, setEditingDocument: setEditingMeasurement } = createSetEditingDocumentAction(
	'measurements'
);

export default {
	CREATE_MEASUREMENTS_STARTED,
	CREATE_MEASUREMENTS_SUCCESS,
	CREATE_MEASUREMENTS_FAILURE,
	createMeasurement,
	GET_MEASUREMENTS_STARTED,
	GET_MEASUREMENTS_SUCCESS,
	GET_MEASUREMENTS_FAILURE,
	getMeasurements,
	UPDATE_MEASUREMENTS_STARTED,
	UPDATE_MEASUREMENTS_SUCCESS,
	UPDATE_MEASUREMENTS_FAILURE,
	updateMeasurement,
	SET_EDITING_MEASUREMENTS,
	setEditingMeasurement,
};
