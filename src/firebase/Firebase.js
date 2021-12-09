import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDb3jCy2GTHcjhnMfok2XdFM4aR8zwCQx8",
    authDomain: "furniture-e0673.firebaseapp.com",
    projectId: "furniture-e0673",
    storageBucket: "furniture-e0673.appspot.com",
    messagingSenderId: "965691564337",
    appId: "1:965691564337:web:a0f51867886f52d09f1010"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage, app};