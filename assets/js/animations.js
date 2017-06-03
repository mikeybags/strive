$(document).ready(function () {
  // $(".dropdown-toggle").on("click", function () {
  //   if (!$(".name-dropdown").hasClass("open") {
  //     $(".dropdown-menu").slideToggle(100);
  //   })
  // });
  //
  // $('body').click(function(evt) {
  //   if($(evt.target).parents('.dropdown-menu').length==0 && ($(".name-dropdown").hasClass("open"))) {
  //     if ($( window ).width() > 767) {
  //       $('.dropdown-menu').slideUp(100);
  //     } else {
  //       $('.dropdown-menu').hide();
  //     }
  //   }
  // });
  
  $(document).on("click", ".friend-list-item", function() {
    if ($(this).parents('#stats-list').length){
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
      } else {
        $(this).addClass("selected");
      }
    } else {
      $(this).addClass("selected");
      $(this).siblings().removeClass("selected");
    }
  });

});
