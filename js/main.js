 $(document).ready(function() {

   // Mobile Navigation Menu Toggle
   $('.nav-trigger').on('click', function(event) {
     event.preventDefault();

     // Keep html elements within trigger
     var cache = $(this).children();

     // Toggle text for trigger
     var txt = $(this).hasClass('_is-open') ? 'Menu' : 'Close';
     $(this).toggleClass('_is-open').text(txt).append(cache);

     // Self explanatory
     $('.nav-header').toggleClass('_is-open');
   });
 });
