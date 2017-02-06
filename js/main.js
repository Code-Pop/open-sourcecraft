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

   // Media Embed swap

   var url_query = getUrlVars()["media"];

  function videoEmbed(url) {
    var video_frame  = "<div class=\"frame-wrapper\">";
        video_frame += "<iframe src=" + url + " frameborder=\"0\" allowfullscreen></iframe>",
        video_frame += "</div>";

    return video_frame;
  }


   if ( window.location.href.indexOf(url_query) > -1 ) {
     swapMedia(videoEmbed(url_query));
   }

   function getUrlVars() {
     var vars = [], hash;
     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
     for(var i = 0; i < hashes.length; i++)
     {
         hash = hashes[i].split('=');
         vars.push(hash[0]);
         vars[hash[0]] = hash[1];
     }
     return vars;
   }


   function swapMedia(video_frame) {
     $('#mediaContainer > .episode-display').hide();
     $('#mediaContainer').prepend(video_frame);
   }


 });

(function($) {

  $.fn.extend({
    modal: function(options) {
      var defaults = {
        overlayClass: 'overlay'
      }

      options = $.extend(defaults, options);

      var overlay = "<div id=\"modal_overlay\" class=\"" + options.overlayClass + "\"></div>";
      $('body').append(overlay);

      return this.each(function() {

        var o = options;


        $(this).click(function(e) {
          e.preventDefault();
          var modal_id = $(this).attr('href'),
            overlay_id = '#modal_overlay';


          $(modal_id).removeClass('_is-closed');
          $(overlay_id).fadeIn(200);

          // Close modal
          $('#modal_overlay').click(function() {
            close_modal(modal_id);
          });
        });
      });

      function close_modal(modal_id) {
        $('#modal_overlay').fadeOut(200);
        $(modal_id).addClass('_is-closed');
      }
    }
  });
})(jQuery);

$('[data-toggle=modal]').modal();
