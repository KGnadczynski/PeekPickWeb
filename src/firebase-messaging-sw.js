importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.


var config = {
    apiKey: 'AIzaSyCH9EVAqYfnCjkEHAnIDd31zf_rcxB67fE',
    authDomain: 'peekpick-91e2c.firebaseapp.com',
    databaseURL: 'peekpick-91e2c.firebaseapp.com',
    projectId: 'peekpick-91e2c',
    storageBucket: 'peekpick-91e2c.appspot.com',
    messagingSenderId: '1055630097023'
};

firebase.initializeApp(config);


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/assets/icon/firebase-logo.png'
  }
    return self.registration.showNotification(notificationTitle,notificationOptions);
});
