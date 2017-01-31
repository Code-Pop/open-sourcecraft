 $(document).ready(function() {

   // Mobile Navigation Menu Toggle
   $('.nav-trigger').on('click', function(event) {
     event.preventDefault();
     var base = $(this),
        // Keep html elements within trigger
        cache = base.children(),
        // Swap text
        txt = base.hasClass('_is-open') ? 'Menu' : 'Close';

     base.toggleClass('_is-open').text(txt).append(cache);

     if (base.hasClass('_is-open')) {
       $('.nav-header').slideDown();
     } else {
       $('.nav-header').slideUp();
     }

   });
 });
