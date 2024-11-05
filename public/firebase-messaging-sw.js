// /* eslint-disable no-undef */
// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//     apiKey: "AIzaSyCPI_Kc5Hw26bXYp1fKLBNUyPfPe4ivjTM",
//     authDomain: "rdrtech-project.firebaseapp.com",
//     projectId: "rdrtech-project",
//     storageBucket: "rdrtech-project.appspot.com",
//     messagingSenderId: "244634140968", 
//     appId: "1:244634140968:web:634adcb8a8f93757f4d01d",
//     measurementId: "G-JZYLLM6HL4"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     console.log(
//       '[firebase-messaging-sw.js] Received background message ',
//       payload
//     );
//     // Customize notification here
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: payload.notification.image
//     };
  
//     // eslint-disable-next-line no-restricted-globals
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });