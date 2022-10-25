import firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: "emraniflex.firebaseapp.com",
    projectId: "emraniflex",
    storageBucket: "emraniflex.appspot.com",
    messagingSenderId: "1041733679372",
    appId: "1:1041733679372:web:bc4b428c6987bacc64f129"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage