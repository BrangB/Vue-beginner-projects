import firebase from 'firebase/compat/app'
import "firebase/compat/database";

const config = {
    apiKey: "AIzaSyBMMdkwRrXEHadTgQq_usC_fGzMv0Jsyg4",
    authDomain: "firevue-f89fa.firebaseapp.com",
    projectId: "firevue-f89fa",
    storageBucket: "firevue-f89fa.appspot.com",
    messagingSenderId: "535099041395",
    appId: "1:535099041395:web:9cf69397c8bb9d5c482c06"
}

firebase.initializeApp(config);
const db = firebase.database();

export default db;