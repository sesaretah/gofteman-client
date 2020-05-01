importScripts("https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyAbQ1NDkKB_E_SbfgHY3w-esVWhjwj9DeE",
  authDomain: "tavan-e768d.firebaseapp.com",
  databaseURL: "https://tavan-e768d.firebaseio.com",
  projectId: "tavan-e768d",
  storageBucket: "tavan-e768d.appspot.com",
  messagingSenderId: "498708095861",
  appId: "1:498708095861:web:00428b1330b24e1eece93c",
  measurementId: "G-55DLXZ4VZY"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});