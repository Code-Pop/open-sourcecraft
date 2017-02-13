;(function($) {

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
          $('#modal_overlay, [data-toggle=close]').click(function() {
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


var ready = function() {
  // Mobile Navigation Menu Toggle
  $('.nav-trigger').click(function(event) {
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

  $('.episode-article a').each(function() {
    var a = new RegExp('/' + window.location + '/');
    if(!a.test(this.href) && !$(this).hasClass('button')) {
      $(this).attr('target', '_blank');

    }
  })

  // Modal fire
  $('[data-toggle=modal]').modal();
}

$(document).ready(ready);
// $(document).on('page:load', ready);
