 $(document).ready(function() {

   // Mobile Navigation Menu Toggle
   $('.nav-trigger').on('click', function(event) {
     event.preventDefault();

     var txt = $(this).hasClass('_is-open') ? 'Menu' : 'Close';
     var cache = $(this).children();
     $('.nav-header').toggleClass('_is-open');
     $(this).toggleClass('_is-open').text(txt).append(cache);
   });
 });
