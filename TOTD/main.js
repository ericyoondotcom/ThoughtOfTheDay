    window.onload = onLoad;
    
function onLoad(){
    chrome.storage.sync.get({
    Night: false,
    ChangeEveryTab: false
  }, function(items) {
    $.getJSON("https://raw.githubusercontent.com/yummypasta/ThoughtOfTheDay/master/thoughts.json", function(json){
    //console.log(json);
    var now = new Date();
    var day = Math.floor(now/8.64e7);
    console.log("Today is unix day " + day);
    var totd = json.thoughts[day % json.thoughts.length];
    console.log("json length is " + json.thoughts.length);
    console.log("so the thought is " + day % json.thoughts.length);
    console.log(totd);
    if(items.ChangeEveryTab){
      totd = json.thoughts[Math.floor(Math.random() * json.thoughts.length)];
      console.log("BUT WAIT! We're overriding because ChangeEveryTab is true!!! The plot thickens!");
    }
    $("#thought").text(totd.text);
    //console.log(totd.source);
    $("#source").text((totd.source === undefined) ? "" : "Source: " + totd.source);

  });
  });

}