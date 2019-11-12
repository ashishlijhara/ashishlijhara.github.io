class IDB{
    constructor(){
        this.db = null;
        this.dbAvailable = false;
    }
}

IDB.prototype.writeFirebaseDatatoIDB = function(data){
    var arr = data.child('Attendance').val();
    console.log(arr[1]);
}

IDB.prototype.isIDBAvailable = ()=>{
    return (this.dbAvailable = (window.indexedDB!=null));
}

IDB.prototype.initIDB=(data, version)=>{
    var request = indexedDB.open('userstorage', version);
    request.onsuccess = (event)=>{
        console.log("DB open");
        idbInstance.db = event.target.result;
        //idbInstance.checkForCode("DL0860GA0121");
    };

    request.onerror = (event)=>{
        console.log("Unable to open DB: "+event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
        var db = event.target.result;
        var objectStore = db.createObjectStore("sevadars", {keyPath:"Sl"});
        data.child('Attendance').val().forEach((sevadar) => {
            var request = objectStore.add(sevadar);
            request.onsuccess = function(event) {
              // event.target.result === customer.ssn;
              console.log("added");
            };
            request.onerror= (event)=>{
                console.log("Error: "+event.target.errorCode);
            };
        });
    };
}

IDB.prototype.checkForCode=(code)=>{
    var trans = idbInstance.db.transaction(["sevadars"]);
    var request = trans.objectStore("sevadars").get(code);
    request.onerror=(event)=>{
        console.log("Error: "+event.target.errorCode);
    }
    request.onsuccess=(event)=>{
        alert(code);
    }
}