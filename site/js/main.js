$(document).ready(function() {

  $("#js-centered-navigation-menu").velocity("transition.slideDownBigIn", { duration: 1000 });

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
});




