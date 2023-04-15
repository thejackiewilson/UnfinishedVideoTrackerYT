function trackYouTubeVideoProgress(player) {
    const videoElement = player.getVideoElement();
  
    setInterval(() => {
      if (videoElement.duration) {
        const progress = videoElement.currentTime / videoElement.duration;
        const videoUrl = `https://www.youtube.com/watch?v=${player.getVideoData().video_id}`;
        chrome.runtime.sendMessage({
          type: 'videoProgress',
          url: videoUrl,
          progress
        });
      }
    }, 1000);
  }
  
  function waitForYouTubePlayer(callback) {
    const interval = setInterval(() => {
      const player = document.querySelector('#movie_player');
  
      if (player && typeof player.getVideoElement === 'function') {
        clearInterval(interval);
        callback(player);
      }
    }, 500);
  }
  
  waitForYouTubePlayer(trackYouTubeVideoProgress);
  