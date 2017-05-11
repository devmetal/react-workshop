import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCw5U8DXN7F90nUYC1WUH1IVNMXGpu1Xmo",
  authDomain: "sentiment-ebab6.firebaseapp.com",
  databaseURL: "https://sentiment-ebab6.firebaseio.com",
  projectId: "sentiment-ebab6",
  storageBucket: "sentiment-ebab6.appspot.com",
  messagingSenderId: "724234393595"
};

firebase.initializeApp(config);

export default firebase.database().ref('/analysis');
