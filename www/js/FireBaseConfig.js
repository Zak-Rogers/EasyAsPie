// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAfoVARaBzoGj8OhqW_5NzcSk_G1TqaHe4",
    authDomain: "easy-as-pie-d3384.firebaseapp.com",
    databaseURL: "https://easy-as-pie-d3384.firebaseio.com",
    projectId: "easy-as-pie-d3384",
    storageBucket: "easy-as-pie-d3384.appspot.com",
    messagingSenderId: "70947969740",
    appId: "1:70947969740:web:a2f5462116f836d64d4069",
    measurementId: "G-D9QHLJ9GXD"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.auth();
  firebase.database();