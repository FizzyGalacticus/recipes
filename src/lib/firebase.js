// @flow

import firebase from 'firebase';
import firebaseConfig from '../../config/firebase';

const { ...config } = firebaseConfig;

firebase.initializeApp(config);

const getAuth = (): FirebaseAuth | null => {
	const auth = localStorage.getItem('auth');

	return JSON.parse(auth);
};

const login = async (): FirebaseAuth => {
	const auth = getAuth();

	if (auth) return auth;
	else {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().useDeviceLanguage();

		auth: FirebaseAuth = await firebase.auth().signInWithPopup(provider);

		localStorage.setItem('auth', JSON.stringify(auth));
	}

	return auth;
};

export default { firebase, login, getAuth };
