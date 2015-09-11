
$(document).ready(function() {

  measureTime();

  var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
  $('#js-centered-navigation-menu').removeClass("show");
  
  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });

  $(".card")
    .velocity("transition.slideUpIn", { stagger: 250 })
    .delay(750)
    .velocity({ opacity: 1 }, 750);


  $("button").mousedown(function(){
  $(this)
  .velocity({ scale: "1.5"}, 150, "easeInOut")
  .velocity("reverse");
  });

  function measureTime() {
  console.log("Measuring time now");
  if ( !('performance' in window) ||
       !('getEntriesByType' in window.performance) ||
       !(window.performance.getEntriesByType('resource') instanceof Array)
     ) {
     console.log("No performance in window");
  } else {
     window.addEventListener('load', function() {
        var resources = window.performance.getEntriesByType('resource');
        console.log("Has performance in window");
        for(var obj in resources) {
           var list = '';
           for(var properties in resources[obj]) {
              list += properties + ':' + resources[obj][properties] + '      ';
           }
           console.log(list);
        }
     });
    }
  }



});