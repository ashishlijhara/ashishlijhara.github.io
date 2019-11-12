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

IDB.prototype.initIDB=(data)=>{
    var request = indexedDB.open('userstorage', data.child('version').val());
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
        
        try{
            var trans = db.transaction(["sevadars"])
            var os = trans.objectStore("sevadars");
            os.deleteObjectStore("sevadars");
        }
        catch(e){
            
        }
        
        var objectStore = db.createObjectStore("sevadars", {keyPath:"Sl"});
        data.child('Attendance').val().forEach((sevadar) => {
            var request = objectStore.add(sevadar);
            request.onsuccess = function(event) {
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