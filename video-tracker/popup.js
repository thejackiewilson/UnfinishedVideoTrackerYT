function createProgressBar(progress) {
    const container = document.createElement('div');
    container.className = 'progress-bar';
  
    const bar = document.createElement('div');
    bar.style.width = `${progress * 100}%`;
    bar.style.height = '100%';
    bar.style.backgroundColor = 'green';
  
    container.appendChild(bar);
    return container;
  }
  
  function createVideoEntry(url, progress) {
    const entry = document.createElement('div');
    entry.className = 'video-entry';

    const thumbnail = document.createElement('img');
    thumbnail.src = url; // Assuming the thumbnail URL is the same as the video URL.
    thumbnail.width = 120;
    thumbnail.height = 90;
  
    const progressBar = createProgressBar(progress);
  
    entry.appendChild(thumbnail);
    entry.appendChild(progressBar);
  
    return entry;
  }
  
  function displayUnfinishedVideos(videos) {
    const unfinishedVideosContainer = document.getElementById('unfinishedVideos');
  
    for (const [url, progress] of Object.entries(videos)) {
      if (progress < 1) { // Check if the video is unfinished.
        const videoEntry = createVideoEntry(url, progress);
        unfinishedVideosContainer.appendChild(videoEntry);
      }
    }
  }
  
  chrome.storage.local.get('videos', data => {
    if (data.videos) {
      displayUnfinishedVideos(data.videos);
    }
  });
  
  