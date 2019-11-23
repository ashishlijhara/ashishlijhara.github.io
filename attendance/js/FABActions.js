initFABActions=()=>{
    var uploadButtons = document.getElementsByClassName('upload_data');
    Array.prototype.forEach.call(uploadButtons,element=>{
        element.addEventListener('click', event=>{
            if(window.navigator.onLine){
                alert("Uploading. Please Wait.");
                document.getElementById('uploadIndicator').style.display = 'block';
                idbInstance.processUpload();
                return;
            }
            alert("You are Offline. Please connect to Wi-Fi or turn on Mobile Data.");
        });
    })
}