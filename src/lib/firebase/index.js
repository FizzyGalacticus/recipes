// @flow

import firebase from 'firebase/app';

import firebaseConfig from '../../../config/firebase';

firebase.initializeApp(firebaseConfig);

export { default as auth } from './auth';
export { default as firestore } from './firestore';
export default firebase;
