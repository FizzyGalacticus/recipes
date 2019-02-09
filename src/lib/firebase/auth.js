// @flow

import firebaseAuth from 'firebase/auth';

const getAuth = (): FirebaseAuth | null => {
	const auth = localStorage.getItem('auth');

	return JSON.parse(auth);
};

const login = async (): FirebaseAuth => {
	const auth = getAuth();

	if (auth) return auth;
	else {
		const provider = new firebaseAuth.GoogleAuthProvider();
		firebaseAuth().useDeviceLanguage();

		auth: FirebaseAuth = await firebaseAuth().signInWithPopup(provider);

		localStorage.setItem('auth', JSON.stringify(auth));
	}

	return auth;
};

export default { login, getAuth };
