var win = Titanium.UI.currentWindow;
Ti.include('config.js');
Ti.include('actionbar.js'); /* icons on top navbar*/

Ti.UI.currentTab.globalConf = Configuration;
var config = Ti.UI.currentTab.globalConf;
var actInd = Titanium.UI.createActivityIndicator({
	bottom:10, 
	height:20,
	width:10,
	message: 'Loading...',
});
var currentServer, currentUrl, tableview, ctr, rowContainer,
	tableData = [];
	
onloadCallback = function() {
	try {
		var xmlMessage = this.responseXML;
		var entryTags = xmlMessage.documentElement.getElementsByTagName("entry");
		/**
		 * start off with icon for invalid server
		 */
		var statusIcon = 'none.png';
		if (xmlMessage && entryTags.length > 0) {
		/**
		 * if xml is valid set stable icon by default
		 */
		statusIcon = 'add.png'; //green by default
		for (var i=0; i < entryTags.length; i++) {
			var nodetitle = entryTags.item(i).getElementsByTagName("title").item(0).text,
				buildNameEnd = nodetitle.indexOf(' #'),
				buildNumberEnd = nodetitle.indexOf('(');
			if (buildNameEnd < 0) continue;
			var status = nodetitle.substr(buildNumberEnd);
			if (status.indexOf('(stable)') < 0 && status.indexOf('normal') < 0 && status.indexOf('?') < 0){
				/**
				 * failure icon
				 */
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
		/**
		 * drawing rows here
		 */
		
		tableview.appendRow({leftImage:statusIcon, title:serverName});
			// rowContainer = Titanium.UI.createTableViewRow({
				// height:90
			// });
			// var boxView = Titanium.UI.createView({
				// width: 150,
				// height: 80,
				// borderColor:'#999',
				// borderWidth:2,
				// backgroundColor: '#fff'
			// });
			// var image = Titanium.UI.createImageView({
				// url:statusIcon,
				// width: 30,
				// height: 30,
				// top: 10
			// });
			// boxView.add(image);
			// var label = Titanium.UI.createLabel({
				// text:serverName,
				// top: 50,
				// font:{fontSize:20, fontFamily:'Arial', fontWeight: 'bold'}
			// });
			// boxView.add(label);
			// rowContainer.add(boxView);
// 		
			// tableview.appendRow(rowContainer);
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
		top:100,
		// separatorColor: 'transparent'
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
				backgroundColor: '#e1e1e1',
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


