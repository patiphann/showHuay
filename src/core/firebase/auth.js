import firebase from 'firebase';
import history from '../history';

export default {
  currentUser: null,

  async signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  authChangeRef: null,

  async onAuthStateChanged() {
    this.authChangeRef = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.replace('/login');
      }

      this.currentUser = user;
      return user;
    });

    return this.authChangeRef;
  },
};
