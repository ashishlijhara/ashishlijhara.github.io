var firebaseConfig = {
    apiKey: "AIzaSyCsd23B7XG4CXp8BmX3jt5KPfy1IgMXCIE",
    authDomain: "turnoutdb.firebaseapp.com",
    databaseURL: "https://turnoutdb.firebaseio.com",
    storageBucket: "turnoutdb.appspot.com"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database().ref().child('1o9ZHQySaALY72ZbIrGTbWUnAKNvNvnElIBBp4JNSl6o');
  database.once('value').then(function (snap) {
    //console.log('snap.val()', snap.val());
    if(idbInstance.isIDBAvailable()){
        idbInstance.initIDB(snap,1); //!Todo: Add automated version update. Or switch to firestore.
        //idbInstance.writeFirebaseDatatoIDB(snap);//!Todo: Add automated version update.//!Todo: Add automated version update. Or switch to firestore.
        
      }
    firebase.database().goOffline();
 });