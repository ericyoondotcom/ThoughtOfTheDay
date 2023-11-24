window.onload = () => {
	chrome.storage.sync.get({
		Night: false,
		ChangeEveryTab: false
	}, function (items) {
		setRandomColor(items);
		setText(items);
	});
}

function setText(storageItems) {
	$.getJSON("https://raw.githubusercontent.com/ericyoondotcom/ThoughtOfTheDay/master/thoughts.json", (json) => {
		const now = new Date();
		const day = Math.floor(now / 8.64e7);

		const totd = storageItems.ChangeEveryTab ?
			json.thoughts[Math.floor(Math.random() * json.thoughts.length)] :
			json.thoughts[day % json.thoughts.length];

		$("#thought").text(totd.text);
		$("#source").text(totd.source && `Source: ${totd.source}`);
	});
}

function setRandomColor(storageItems) {
	console.log("ROFL");
	const h1 = Math.floor(Math.random() * 360);
	const h2 = h1 + Math.floor(Math.random() * 180) - 60;
	const dark = storageItems.Night;
	const s = dark ? 1 : 0.20;
	const v = dark ?
		Math.floor(Math.random() * 30) :
		Math.floor(Math.random() * 20) + 80;

	const [r1, g1, b1] = hsv2rgb(h1, s, v / 100);
	const [r2, g2, b2] = hsv2rgb(h2, s, v / 100);

	$("body").css(
		"background",
		`linear-gradient(to bottom left, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`);
	$("body").css("color", dark ? "white" : "black");
	$("body").css("text-shadow", dark ? "0 0 20px #000000AA" : "0 0 20px #FFFFFFAA");
}

function hsv2rgb(h, s, v) {
	let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	return [f(5) * 255, f(3) * 255, f(1) * 255];
}
