import firebase from 'firebase/app'
import'firebase/firestore'

const config = {
  apiKey: "AIzaSyAD1AyxVonTeGNH2-l3wPY2FEm_UHE4K9Q",
  authDomain: "auctionapp-2288.firebaseapp.com",
  projectId: "auctionapp-2288",
  storageBucket: "auctionapp-2288.appspot.com",
  messagingSenderId: "98278082321",
  appId: "1:98278082321:web:e432cf3480932fffc5aeb0"
  };

  firebase.initializeApp(config)

  export default firebase
