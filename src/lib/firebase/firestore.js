// @flow

import firebase from 'firebase/app';
import 'firebase/firestore';

let db: firebase.firestore.Firestore;

const createDb = () => {
	db = firebase.firestore();
};

const createDbIfNotInitialized = fn => {
	return (...params) => {
		if (!db) {
			createDb();
		}

		return fn(...params);
	};
};

export const set = createDbIfNotInitialized((key, id, data) => {
	const sanitizedData: object = Object.entries(data).reduce((acc, [key, value]) => {
		if (value !== undefined) {
			acc[key] = value;
		}

		return acc;
	}, {});

	return db
		.collection(key)
		.doc(id)
		.set(sanitizedData);
});

export const readDocument = createDbIfNotInitialized((key, docKey) => {
	return db
		.collection(key)
		.doc(docKey)
		.get();
});

export default { set, readDocument };
