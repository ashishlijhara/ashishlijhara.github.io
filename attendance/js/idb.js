class IDB{ //!TODO: Reduce to single database - Data can be directly cached into local store without maintaing and extra db for another.
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
        objectStore.createIndex('Badge_No', 'Badge_No', {unique:false});
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
    var trans = idbInstance.localStore.transaction(["sevadars"]);
    var sevadarIndex = trans.objectStore("sevadars").index('Badge_No');
    var keyRng = IDBKeyRange.only(code);
    const request = sevadarIndex.openCursor(keyRng);
    request.onerror=(event)=>{
        console.log("Error: "+event.target.errorCode);
    }
    request.onsuccess=(event)=>{
        //console.log(event.target.result.value);
        //!TODO: Time manipulation. if time does not match server.
        event.target.result.value.S_1 = "P";
        //alert(code);
    }
}

IDB.prototype.initLocalStore = function(){
    var me = this;
    GetFirebaseDateTime.then(data=>{
        var request = indexedDB.open(data.split(', ')[0],1);
        request.onsuccess = event=>{
          console.log("localstore ready");
            me.localStore = event.target.result;
        };

        request.onerror=event=>{
            alert("Unable to initialize the local store");
        };
        request.onupgradeneeded=event=>{
            var db = event.target.result;
            var objectStore = db.createObjectStore("sevadars", {keyPath:"Sl"});
            objectStore.createIndex('Badge_No', 'Badge_No', {unique:false});
            //objectStore.createIndex('S_1','S_1',{unique:false});
            //objectStore.createIndex('S_2','S_2',{unique:false});
            //objectStore.createIndex('S_3','S_3',{unique:false});
            //objectStore.createIndex('S_4','S_4',{unique:false});
            objectStore.transaction.oncomplete=event=>{
                var trans = me.db.transaction(['sevadars']);
                var objectStore = trans.objectStore('sevadars');
                objectStore.openCursor().onsuccess=event=>{
                    var cursor = event.target.result;
                    var localObjectStore = db.transaction(["sevadars"], "readwrite").objectStore("sevadars");
                    if(cursor){
                        cursor.value.S_1 = "A";
                        cursor.value.S_2 = "A";
                        cursor.value.S_3 = "A";
                        cursor.value.S_4 = "A";
                        localObjectStore.add(cursor.value);
                        cursor.continue();
                    }
                };
            };
        };
    });
       
}