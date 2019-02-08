import firebase from 'firebase';
import firebaseConfig from '../../config/firebase';

const { auth, ...config } = firebaseConfig;

firebase.initializeApp(config);

const login = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().useDeviceLanguage();

	return firebase.auth().signInWithPopup(provider);
};

export default { firebase, login };
