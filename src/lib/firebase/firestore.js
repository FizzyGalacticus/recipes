// @flow

import firebase from 'firebase/app';
import 'firebase/firestore';

let db;

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

const create = createDbIfNotInitialized((key, data) => {
	return db.collection(key).add(data);
});

const readCollection = createDbIfNotInitialized((key, whereClause) => {
	if (whereClause !== undefined) {
		return db
			.collection(key)
			.where(...whereClause)
			.get();
	}

	return db.collection(key).get();
});

const readDocument = createDbIfNotInitialized((key, docKey) => {
	return db
		.collection(key)
		.doc(docKey)
		.get();
});

export default { create, readCollection, readDocument };
