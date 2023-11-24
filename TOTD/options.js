function saveOptions() {
	var nightMode = document.getElementById('nightmode').checked;
	var tabCycle = document.getElementById('tabcycle').checked;

	chrome.storage.sync.set({
		Night: nightMode,
		ChangeEveryTab: tabCycle,
	}, () => {
		var status = document.getElementById('status');
		status.textContent = 'Changes successfully saved!';
		setTimeout(() => {
			status.textContent = '';
		}, 1500);
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		Night: false,
		ChangeEveryTab: false
	}, (items) => {
		document.getElementById('nightmode').checked = items.Night;
		document.getElementById('tabcycle').checked = items.ChangeEveryTab;
	});
}

window.onload = function () {
	restoreOptions();
	document.getElementById('save').addEventListener('click', saveOptions);
};
