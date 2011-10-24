var win = Titanium.UI.currentWindow;
Ti.include('config.js');
Ti.include('actionbar.js');

Ti.UI.currentTab.globalConf = Configuration;
var config = Ti.UI.currentTab.globalConf;
var actInd = Titanium.UI.createActivityIndicator({
	bottom:10, 
	height:20,
	width:10,
	message: 'Loading...',
});
var currentServer, currentUrl, tableview,
	tableData = [];
	
onloadCallback = function() {
	try {
		var xmlMessage = this.responseXML;
		var entryTags = xmlMessage.documentElement.getElementsByTagName("entry");
		var statusIcon = 'none.png';
		if (xmlMessage && entryTags.length > 0) {
		statusIcon = 'add.png'; //green by default
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
		}
		var serverName = '';
		for (var idx = 0; idx < tableData.length; idx++){
			if (this.location === tableData[idx]['url']){
				serverName = tableData[idx]['title'];
			}
		}
		tableview.appendRow({leftImage:statusIcon, title:serverName, backgroundColor:'pink'});
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

mytablerocks = function(){
	tableview = Titanium.UI.createTableView({
		top:100
	});
	win.add(tableview);
	for (var a in config){
		if (config[a]['visible'] == true){
			currentServer = a;
			currentUrl = config[currentServer]["url"];
			tableData.push({title:currentServer, url:currentUrl});
			httpRequest();
		}
	}
	
	tableview.addEventListener('click', function(e){
	if (e.rowData.title && e.rowData.leftImage !== 'none.png'){
		var detailwin = Titanium.UI.createWindow({
			url:'details.js',
			title:e.rowData.title,
			backgroundColor: '#fff',
			top:100,
			navBarHidden:true,
			prev:win
		});
		Titanium.UI.currentTab.open(detailwin,{animated:true});
	} else {
		alert('Url seems to be invalid. Change your settings');
	}
});
};

//render table
mytablerocks();

refreshbutton.addEventListener('click', function(){
	actInd.show();
	win.remove(tableview);
	mytablerocks();
	actInd.hide();
});

quitbutton.addEventListener('click', function(){
	win.close();
});

// create table view event listener
// tableview.addEventListener('click', function(e){
	// if (e.rowData.title){
		// var detailwin = Titanium.UI.createWindow({
			// url:'details.js',
			// title:e.rowData.title,
			// backgroundColor: '#fff',
			// top:100
		// });
		// Titanium.UI.currentTab.open(detailwin,{animated:true});
	// }
// });


