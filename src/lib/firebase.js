// @flow

import firebase from 'firebase';
import firebaseConfig from '../../config/firebase';

const { ...config } = firebaseConfig;

firebase.initializeApp(config);

const getAuthenticated = (): boolean => {
	const auth = localStorage.getItem('auth');

	return auth !== null;
};

const getAuth = (): auth | null => {
	const auth = localStorage.getItem('auth');

	return JSON.parse(auth);
};

const login = async (): auth => {
	let auth = getAuth();

	if (auth) return auth;
	else {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().useDeviceLanguage();

		auth: auth = await firebase.auth().signInWithPopup(provider);

		localStorage.setItem('auth', JSON.stringify(auth));
	}

	return auth;
};

export default { firebase, login, getAuthenticated, getAuth };
