import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAbQ1NDkKB_E_SbfgHY3w-esVWhjwj9DeE",
    authDomain: "tavan-e768d.firebaseapp.com",
    databaseURL: "https://tavan-e768d.firebaseio.com",
    projectId: "tavan-e768d",
    storageBucket: "tavan-e768d.appspot.com",
    messagingSenderId: "498708095861",
    appId: "1:498708095861:web:00428b1330b24e1eece93c",
    measurementId: "G-55DLXZ4VZY"
 
});
//const messaging = initializedFirebaseApp.messaging();
var messaging = null;
if (firebase.messaging.isSupported()){
  messaging = initializedFirebaseApp.messaging();
  messaging.usePublicVapidKey(
    // Project Settings => Cloud Messaging => Web Push certificates
    "BGtSQdySGVQOeOwFha6rSVdmtfIUo_V33Eq-RTRb5kUNLvvwM7AVGCLtChjnGlD50fudRx8D4Aw-7br71Qfefrc"
  );
  
} else {
 
}
export { messaging }; 