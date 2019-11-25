document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge:'right', draggable:true});

    var elems1 = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems1, {});

    var poles = document.getElementById('poles');
    poles.addEventListener("change", (event)=>{
        switch(poles.selectedIndex){
            case 0:
                enablePoleType(critical, true);
                enablePoleType(normal, true);
                enablePoleType(alert, true);
                break;
            case 1:
                enablePoleType(critical, true);
                enablePoleType(normal, false);
                enablePoleType(alert, false);
                break;
            case 2:
                enablePoleType(critical, false);
                enablePoleType(normal, false);
                enablePoleType(alert, true);
                break;
            case 3:
                enablePoleType(critical, false);
                enablePoleType(normal, true);
                enablePoleType(alert, false);
                break;
        }
    });
});

enablePoleType=(arr,enable)=>{
    var map_ = enable?map:null;
    arr.forEach(element => {
        element.setMap(map_);
    });
}