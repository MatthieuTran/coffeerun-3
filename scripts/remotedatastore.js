(function (window) {
  "use strict";
  window.FireBaseConfig = {
    apiKey: "AIzaSyCsk3mUckLXaCSAglAgAdIs4myITP3F3Kw",
    authDomain: "coffee-ruin.firebaseapp.com",
    databaseURL: "https://coffee-ruin.firebaseio.com",
    projectId: "coffee-ruin",
    storageBucket: "coffee-ruin.appspot.com",
    messagingSenderId: "970604344796",
    appId: "1:970604344796:web:c441bd708efae19fd1cb19",
    measurementId: "G-4V197J0S27",
  };
  var App = window.App || {};
  var $ = window.jQuery;

  class RemoteDataStore {
    constructor() {
      console.log("running the FireBaseDataStore function");
      firebase.initializeApp(window.FireBaseConfig);
      this.db = firebase.firestore();
      this.getAll().then((d) => {
        console.log(`d: ${JSON.stringify(d)}`);
      });
    }
    async add(key, val) {
      return this.db.collection(`coffeeorders`).add(val);
    }
    async get(email, cb) {
      const docRef = this.db.collection(`coffeeorders`);
      const snapshot = await docRef.where("emailAddress", "==", email).get();
      return await snapshot.docs.map((e) => e.data());
    }
    async getAll(cb) {
      const docRef = this.db.collection(`coffeeorders`);
      const snapshot = await docRef.get();
      return await snapshot.docs.map((e) => e.data());
    }
    async remove(email) {
      const docRef = await this.db.collection(`coffeeorders`);
      const batch = this.db.batch();
      const snapshot = await docRef.where("emailAddress", "==", email).get();
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
  }
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
