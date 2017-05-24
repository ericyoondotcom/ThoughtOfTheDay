// Saves options to chrome.storage.sync.
function save_options() {
  var nightMode = document.getElementById('nightmode').checked;
  var tabCycle = document.getElementById('tabcycle').checked;
  chrome.storage.sync.set({
    Night: nightMode,
    ChangeEveryTab: tabCycle
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Changes successfully saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    Night: false,
    ChangeEveryTab: false
  }, function(items) {
    document.getElementById('nightmode').checked = items.Night;
    document.getElementById('tabcycle').checked = items.ChangeEveryTab;
  });
}
window.onload = function(){
    restore_options();
    document.getElementById('save').addEventListener('click',
        save_options);

};
