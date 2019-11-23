var firebaseConfig = {
    apiKey: "AIzaSyCsd23B7XG4CXp8BmX3jt5KPfy1IgMXCIE",
    authDomain: "turnoutdb.firebaseapp.com",
    projectId:"turnoutdb",
    databaseURL: "https://turnoutdb.firebaseio.com",
    storageBucket: "turnoutdb.appspot.com"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database().ref().child('1o9ZHQySaALY72ZbIrGTbWUnAKNvNvnElIBBp4JNSl6o');
  database.child('Attendance').once('value').then(function (snap) {
    //console.log('snap.val()', snap.val());
    if(idbInstance.isIDBAvailable()){
      database.child('version').once('value').then(function (verSnap){
          idbInstance.initIDB(snap, verSnap.val());
        });      
      }
 });

function writeToFirebase(tablename, data){
  var date = tablename.replace("/", "-").replace("/", "-");
  data.forEach(element => {
    var keyRef = database.child(date);
    keyRef.child(element.Sl).set(element);
  });
  document.getElementById('uploadIndicator').style.display = 'none';
  alert("Upload Complete!");
 }