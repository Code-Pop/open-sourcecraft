;(function($, window, document, undefined){

  $.extend({
    embeder: function(options) {
      var defaults = {
        videoWrapper: ".js-video-wrapper",
        audioWrapper: '.js-audio-wrapper',
        frameWrapper: 'frame-wrapper',
        videoURL: '',
        audioURL: ''
      };

      options = $.extend(defaults, options);

      function getUrlQuery() {
        var q = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            q.push(hash[0]);
            q[hash[0]] = hash[1];
        }
        return q;
      }

      // Capture url media type
      var media = getUrlQuery()['media'];



      function switcher(media_type) {
        var media_switch = document.createElement('div');
            media_switch.className = 'media-switch ' + media_type;
            media_switch.innerHTML = "<a href=\"?media=" + media_type + "\">Switch to " + media_type + "</a>";

        return media_switch;
      }

      if (media == 'video') {
        // ==============================
        // Video Player
        // ==============================

        // Create responsive iFrame wrapper
        var frame_wrapper = document.createElement('div');
            frame_wrapper.className = options.frameWrapper;
        // Create iFrame
        var iframe = document.createElement('iframe');
            iframe.src = options.videoURL + '?rel=0&autoplay=1';
            iframe.frameBorder = 0;
            iframe.setAttribute('allowfullscreen', 'allowfullscreen');

        // Create entire frame material
        var frame = $(frame_wrapper).append(iframe);

        $(options.videoWrapper + '> .episode-display').hide();
        $(options.videoWrapper).prepend(frame);


        $('#mediaContainer').append(switcher('audio'));

      } else if (media == 'audio') {

        // ==============================
        // Audio Player
        // ==============================

        var audio = document.createElement('audio');
            audio.src = options.audioURL;
            audio.id = 'audio';
            audio.setAttribute('type', 'audio/mpeg');

        var player = document.createElement('div');
            player.className = 'audio-player _is-playing';

        var play = document.createElement('a');
            play.className = 'button -primary audio-play';
            play.setAttribute('aria-label', 'Play');
            play.innerHTML += "<svg class=\"icon play\"><use xlink:href=\"#ico-play-o\"></use></svg>";
            play.innerHTML += "<svg class=\"icon pause\"><use xlink:href=\"#ico-pause-o\"></use></svg>";

        var progress = document.createElement('progress');
            progress.className = 'progress-bar';
            progress.setAttribute('value', '0');

        var duration = document.createElement('span');
            duration.className = 'duration _sr-only';
            duration.innerHTML = '00:00';

        var currentTime = document.createElement('span');
            currentTime.className = 'currenttime';
            currentTime.innerHTML = '00:00';

        $(player).prepend(play, progress, duration, currentTime);

        // Seconds to Timestamp
        var toHHMMSS = function( totalsecs ) {
          var sec_num = parseInt(totalsecs, 10); // don't forget the second param
          var hours   = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
          var seconds = sec_num - (hours * 3600) - (minutes * 60);

          if (hours   < 10) {hours   = "0"+hours; }
          if (minutes < 10) {minutes = "0"+minutes;}
          if (seconds < 10) {seconds = "0"+seconds;}

          hours = hours > 0 ? hours + ':' : '';
          minutes = minutes + ':';

          var time = hours+minutes+seconds;
          return time;
        }

        audio.addEventListener('loadedmetadata', function(){
          progress.setAttribute('max', Math.floor(audio.duration));
          duration.textContent  = toHHMMSS(audio.duration);
        });


        audio.addEventListener('timeupdate', function(){
          progress.setAttribute('value', audio.currentTime);
          currentTime.textContent  = toHHMMSS(audio.currentTime);
        });

        play.addEventListener('click', function() {
          if(audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
          player.classList.toggle('_is-playing');
        });

        progress.addEventListener('click', function(e){
          audio.currentTime = Math.floor(audio.duration) * (e.offsetX / e.target.offsetWidth);
        }, false);

        $(options.audioWrapper).empty();
        $(options.audioWrapper).prepend(audio, player);

        // Play audio onload
        audio.play();

        $('#mediaContainer').append(switcher('video'));
      }
    }
  });

})(jQuery, window, document);
