importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyCEFilYJ4a-wktMO_I-xg8qxW0C2YoPh0A",
    authDomain: "pushnotification-bbb51.firebaseapp.com",
    projectId: "pushnotification-bbb51",
    storageBucket: "pushnotification-bbb51.appspot.com",
    messagingSenderId: "333955506379",
    appId: "1:333955506379:web:f176acb983f1ccc690bb4e",
    measurementId: "G-YW99HG5K6P"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});