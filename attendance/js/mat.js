document.addEventListener('DOMContentLoaded', function() {
    initMaterial();
    initFABActions();
  });

  
initMaterial = ()=>{
  var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {direction:'top', hoverEnabled:false});

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge:'left', draggable:true});

}