var conf = Ti.UI.currentTab.globalConf,
	currentServer, currentUrl,
	tableData = [];

onloadCallback = function() {
	try {
		var xmlMessage = this.responseXML;
		var entryTags = xmlMessage.documentElement.getElementsByTagName("entry");
		var statusIcon = 'add.png'; //green by default
		for (var i=0; i < entryTags.length; i++) {
			var nodetitle = entryTags.item(i).getElementsByTagName("title").item(0).text,
				buildNameEnd = nodetitle.indexOf(' #'),
				buildNumberEnd = nodetitle.indexOf('(');
			if (buildNameEnd < 0) continue;
			var status = nodetitle.substr(buildNumberEnd);
			if (status.indexOf('(stable)') < 0 && status.indexOf('normal') < 0 && status.indexOf('?') < 0){
				statusIcon = 'warning.png';
			}
		};
		var serverName = '';
		for (var idx = 0; idx < tableData.length; idx++){
			if (this.location === tableData[idx]['url']){
				serverName = tableData[idx]['title'];
			}
		}
		tableview.appendRow({leftImage:statusIcon, title:serverName});
	} catch (e) {
		Titanium.API.debug(e);
	}
};

httpRequest = function () {
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET', currentUrl);
	xhr.send();
	xhr.onload = onloadCallback;
};
// httpRequest();

var tableview = Titanium.UI.createTableView({
	top:50
});

for (var a in conf){
	if (conf[a]['visible'] == true){
		currentServer = a;
		currentUrl = conf[currentServer]["url"];
		tableData.push({title:currentServer, url:currentUrl});
		httpRequest();
	}
}

