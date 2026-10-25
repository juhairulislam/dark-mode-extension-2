// Function to toggle Dark Mode status on website DOM
function applyDarkModeState(enabled) {
  if (enabled) {
    document.documentElement.classList.add('smart-dark-mode-active');
  } else {
    document.documentElement.classList.remove('smart-dark-mode-active');
  }
}

// Initial state check from localStorage
const currentHost = window.location.hostname;
const isDarkModeOn = localStorage.getItem(`smart_dark_${currentHost}`) === 'true';

if (isDarkModeOn) {
  applyDarkModeState(true);
}

// Listen for messages from popup toggle control
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle_dark_mode') {
    const newState = request.enabled;
    localStorage.setItem(`smart_dark_${currentHost}`, newState);
    applyDarkModeState(newState);
    sendResponse({ status: 'success', state: newState });
  } else if (request.action === 'get_status') {
    const status = localStorage.getItem(`smart_dark_${currentHost}`) === 'true';
    sendResponse({ enabled: status });
  }
});