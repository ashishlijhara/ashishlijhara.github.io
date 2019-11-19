initFABActions=()=>{
    document.getElementById('upload').addEventListener('click', event=>{
        if(window.navigator.onLine){
            idbInstance.processUpload();
            return;
        }
        alert("You are Offline. Please connect to Wi-Fi or turn on Mobile Data.");
    });
}