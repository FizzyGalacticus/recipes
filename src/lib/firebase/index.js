// @flow

import firebase from 'firebase/app';

import firebaseConfig from '../../../config/firebase';

const { ...config } = firebaseConfig;

firebase.initializeApp(config);

export { default as auth } from './auth';
export default firebase;
