$(document).ready(function () {
  $(".dropdown").on("click", function () {
      $(".dropdown-menu").slideToggle(200);
  });

  $('body').click(function(evt) {
    if($(evt.target).parents('.dropdown-menu').length==0 && ($(".name-dropdown").hasClass("open"))) {
      if ($( window ).width() > 767) {
        $('.dropdown-menu').slideUp(200);
      } else {
        $('.dropdown-menu').hide();
      }
    }
  });
});
