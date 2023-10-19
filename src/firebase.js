import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCEFilYJ4a-wktMO_I-xg8qxW0C2YoPh0A",
    authDomain: "pushnotification-bbb51.firebaseapp.com",
    projectId: "pushnotification-bbb51",
    storageBucket: "pushnotification-bbb51.appspot.com",
    messagingSenderId: "333955506379",
    appId: "1:333955506379:web:f176acb983f1ccc690bb4e",
    measurementId: "G-YW99HG5K6P"
  };

  export const app = initializeApp(firebaseConfig);
  export const messaging = getMessaging(app);