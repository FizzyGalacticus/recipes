// @flow

import firebase from 'firebase/app';
import 'firebase/auth';

export const getAuth = (): FirebaseAuth | null => {
	const auth = localStorage.getItem('auth');

	return JSON.parse(auth);
};

export const login = async (): FirebaseAuth => {
	let auth = getAuth();

	if (auth !== null) {
		return auth;
	} else {
		try {
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().useDeviceLanguage();

			auth = await firebase.auth().signInWithPopup(provider);

			localStorage.setItem('auth', JSON.stringify(auth));
		} catch (err) {
			// Do Nothing
		}
	}

	return auth;
};

export const logout = async () => {
	const auth = getAuth();

	if (auth) {
		try {
			await firebase.auth().signOut();
			localStorage.removeItem('auth');
		} catch (err) {
			return false;
		}
	}

	return true;
};

export default { login, logout, getAuth };
