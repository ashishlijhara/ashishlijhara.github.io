class IDB{
    constructor(){
        this.db = null;
        this.dbAvailable = false;

        this.localStore = null;
    }
}

IDB.prototype.writeFirebaseDataToIDB = function(data){
    var arr = data;
    var name;
    for (name in arr){

    }
}

IDB.prototype.isIDBAvailable = ()=>{
    return (this.dbAvailable = (window.indexedDB!=null));
}

IDB.prototype.initIDB=(data)=>{
    
    var request = indexedDB.open('userstorage', data.child('version').val());
    request.onsuccess = (event)=>{
        console.log("DB open");
        idbInstance.db = event.target.result;
        //idbInstance.checkForCode("DL0860GA0121");
        idbInstance.initLocalStore();
    };

    request.onerror = (event)=>{
        console.log("Unable to open DB: "+event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
        var db = event.target.result;
        try{
            var trans = db.transaction(["sevadars"])
            var os = trans.objectStore("sevadars");
            os.deleteObjectStore("sevadars");
        }
        catch(e){

        }
        
        var objectStore = db.createObjectStore("sevadars", {keyPath:"Sl"});
        objectStore.createIndex('Badge Number', 'Badge_No', {unique:false});
        objectStore.transaction.oncomplete = (event)=>{
            data.child('Attendance').val().forEach((sevadar) => {
                var objectStore = db.transaction(["sevadars"], "readwrite").objectStore("sevadars");
                var request = objectStore.add(sevadar);
                request.onsuccess = (event)=>{
                    console.log("added");
                    };
                request.onerror= (event)=>{
                    console.log("Error: "+event.target.errorCode);
                    };
                });
            }
        };
    }   

IDB.prototype.checkForCode=(code)=>{
    var trans = idbInstance.db.transaction(["sevadars"]);
    var sevadarIndex = trans.objectStore("sevadars").index('Badge Number');
    var keyRng = IDBKeyRange.only(code);
    const request = sevadarIndex.openCursor(keyRng);
    request.onerror=(event)=>{
        console.log("Error: "+event.target.errorCode);
    }
    request.onsuccess=(event)=>{
        console.log(event.target.result.value);
        alert(code);
    }
}

IDB.prototype.initLocalStore = function(){
    var getDateTime = firebase.functions().httpsCallable('getDateTime');
    getDateTime().then(function(result) {
      var sanitizedMessage = result.data.text;
      console.log(sanitizedMessage);
      //var request = indexedDB.open('', );
    });
    
}