class IDB{ //!TODO: Reduce to single database - Data can be directly cached into local store without maintaing and extra db for another.
    constructor(){
        this.db = null;
        this.dbAvailable = false;
        this.timestamp = this.getTimeStamp();
        this.localStore = null;
        this.dbName="";
    }
}

IDB.prototype.getTimeStamp = function(){
    return new Date(Date.now());
};

IDB.prototype.getShift = (hours1, hours2)=>{
    var date1, date2;
    var tempDate = idbInstance.getTimeStamp();
    date1 = new Date(idbInstance.timestamp);
    date2 = new Date(idbInstance.timestamp);
    var serverCorrectedDate = new Date(tempDate+(tempDate-idbInstance.timestamp));
    if (hours1==20 && serverCorrectedDate.getHours()!==0){
        date2.setDate(date2.getDate()+1);
    }
    date1.setHours(hours1);
    date2.setHours(hours2);
    date1.setMinutes(0);
    date2.setMinutes(0);
    date1.setSeconds(0);
    date2.setSeconds(0);
    return (serverCorrectedDate>=date1 && serverCorrectedDate<date2)?"P":"A";
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

IDB.prototype.initIDB=(data, version)=>{
    var request = indexedDB.open('userstorage', version);
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
            //var trans = db.transaction(["sevadars"], "readwrite")
            //var os = trans.objectStore("sevadars");
            db.deleteObjectStore("sevadars");
        }
        catch(e){

        }
        
        var objectStore = db.createObjectStore("sevadars", {keyPath:"Sl"});
        objectStore.createIndex('Badge_No', 'Badge_No', {unique:false});
        objectStore.transaction.oncomplete = (event)=>{
            data.val().forEach((sevadar) => {
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
    var me = this;
    request.onerror=(event)=>{
        console.log("Error: "+event.target.errorCode);
    }
    request.onsuccess=(event)=>{
        event.target.result.value.Shift_1 = idbInstance.getShift(2,8);
        event.target.result.value.Shift_2 = idbInstance.getShift(8,14);
        event.target.result.value.Shift_3 = idbInstance.getShift(14,20);
        event.target.result.value.Shift_4 = idbInstance.getShift(20,2);
        var updateRequest = idbInstance.localStore.transaction(["sevadars"], "readwrite").objectStore("sevadars").put(event.target.result.value);
        updateRequest.onsuccess = event=>{
            console.log("record updated");
        }
    }
}

IDB.prototype.initLocalStore = function(){
    var me = this;
    GetFirebaseDateTime.then(data=>{
        me.timestamp = me.getTimeStamp();
        me.dbName = data.split(', ')[0];
        var request = indexedDB.open(me.dbName,1);
        request.onsuccess = event=>{
          console.log("localstore ready");
            me.localStore = event.target.result;
            me.checkForCode("DL0860GA0121");
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
                        cursor.value.Shift_1 = "A";
                        cursor.value.Shift_2 = "A";
                        cursor.value.Shift_3 = "A";
                        cursor.value.Shift_4 = "A";
                        localObjectStore.add(cursor.value);
                        cursor.continue();
                    }
                    else{
                        me.checkForCode("DL0860GA0121");
                   }
                };
            };
        };
    });
}


IDB.prototype.processUpload = ()=>{
    var uploadData=[];
    var trans = idbInstance.localStore.transaction(['sevadars']);
    var objectStore = trans.objectStore('sevadars');
    objectStore.openCursor().onsuccess=event=>{
        var cursor = event.target.result;
        if(cursor){
            if(cursor.value.Shift_1==="P"||cursor.value.Shift_2==="P"||cursor.value.Shift_3==="P"||cursor.value.Shift_4==="P")
                uploadData.push(cursor.value);
            cursor.continue();
        }
        else{
            writeToFirebase(idbInstance.dbName, uploadData);
        }
    };
    //console.log(uploadData);
}