import firebase from 'firebase';

export default {
  async initialize() {
    const config = {
      apiKey: 'AIzaSyBMZ3vyqorK0kT_4xzAR2HoEfRCGkCIBq4',
      authDomain: 'showhuay-5f1bc.firebaseapp.com',
      databaseURL: 'https://showhuay-5f1bc.firebaseio.com',
      storageBucket: 'showhuay-5f1bc.appspot.com',
      messagingSenderId: '175936341076',
    };
    return await firebase.initializeApp(config);
  },

  async connectedFirebase(cb) {
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', (snap) => {
      cb(snap.val());
    });
  },
};
