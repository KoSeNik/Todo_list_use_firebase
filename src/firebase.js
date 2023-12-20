import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyD5wIxOes01WCqpQZ8hEfSYEU5fcFdyhP0',
	authDomain: 'todolistsk.firebaseapp.com',
	projectId: 'todolistsk',
	storageBucket: 'todolistsk.appspot.com',
	messagingSenderId: '322070026040',
	appId: '1:322070026040:web:47257e459faadede62d3cd',
	databaseURL: 'https://todolistsk-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
