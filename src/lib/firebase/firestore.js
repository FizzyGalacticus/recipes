// @flow

import firebase from 'firebase/app';
import 'firebase/firestore';

let db;

const createDb = () => {
	db = firebase.firestore();
};

const createDbIfNotInitialized = fn => {
	return (...params) => {
		if (!db) createDb();

		return fn(...params);
	};
};

export const create = createDbIfNotInitialized((key, data) => {
	return db.collection(key).add(data);
});

export const readCollection = createDbIfNotInitialized((key: string, whereClause: Array<string>) => {
	if (whereClause !== undefined) {
		return db
			.collection(key)
			.where(...whereClause)
			.get();
	}

	return db.collection(key).get();
});

export const readDocument = createDbIfNotInitialized((key, docKey) => {
	return db
		.collection(key)
		.doc(docKey)
		.get();
});

export const updateDocument = createDbIfNotInitialized((key, docKey, value) => {
	return db
		.collection(key)
		.doc(docKey)
		.set(value);
});

export const getDocsFromResponse = response =>
	response.docs.reduce((acc, doc) => {
		acc[doc.id] = doc.data();
		return acc;
	}, {});

export default { create, readCollection, readDocument, updateDocument, getDocsFromResponse };
