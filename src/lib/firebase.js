import firebase from 'firebase';
import firebaseConfig from '../../config/firebase';

const { ...config } = firebaseConfig;

firebase.initializeApp(config);

const login = async () => {
	const auth = localStorage.getItem('auth');

	let result;

	try {
		result = JSON.parse(auth);
	}
	catch(err) {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().useDeviceLanguage();

		result = await firebase.auth().signInWithPopup(provider);

		localStorage.setItem('auth', JSON.stringify(result));
	}

	return result;
};

const getAuthenticated = () => {
	const auth = localStorage.getItem('auth');

	return auth !== undefined;
};

export default { firebase, login, getAuthenticated };
