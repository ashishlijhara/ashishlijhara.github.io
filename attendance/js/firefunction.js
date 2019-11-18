let GetResponseFromFirebase = (url)=>{
    return new Promise((resolve, reject)=>{
        var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //document.getElementById("demo").innerHTML = xhttp.responseText;
                    resolve(xhttp.responseText);
                }
            };
            xhttp.open("GET",url);
            xhttp.send();
    });
};

let GetFirebaseDateTime = GetResponseFromFirebase('https://us-central1-turnoutdb.cloudfunctions.net/getTimeDate');

let GetFirebasePresent = GetResponseFromFirebase('https://asia-east2-turnoutdb.cloudfunctions.net/getPresent');