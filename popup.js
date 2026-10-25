document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');

  // Query active tab and check state
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'get_status' }, (response) => {
        if (chrome.runtime.lastError) {
          toggle.disabled = true;
          return;
        }
        if (response && response.enabled) {
          toggle.checked = true;
        }
      });
    }
  });

  // Handle Toggle Switch
  toggle.addEventListener('change', () => {
    const isChecked = toggle.checked;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggle_dark_mode',
          enabled: isChecked
        });
      }
    });
  });
});