const videos = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.webNavigation.onDOMContentLoaded.addListener(details => {
    if (details.frameId !== 0) return;

    // Check if the URL is not a chrome:// URL
    if (!details.url.startsWith('chrome://')) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ['content.js'],
      }).catch(error => {
        console.error('Error executing content script:', error);
      });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === 'videoProgress') {
    const { url, progress } = request;
    videos[url] = progress;
    chrome.storage.local.set({ videos });
  }
});
