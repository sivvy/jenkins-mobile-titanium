var win = Titanium.UI.currentWindow;
// win.setLeftNavButton('servers.js');
// Ti.include('config.js');
// Ti.API.log('', '***********contextsharing::'+Ti.UI.currentTab.a);
Ti.include('actionbar.js');

var xhr, doc, tableview;
var actInd = Titanium.UI.createActivityIndicator({
	bottom:10, 
	height:20,
	width:10,
	message: 'Loading...',
});
var conf = Ti.UI.currentTab.globalConf,
	currentServer = Ti.UI.currentWindow.title,
	currentUrl = conf[currentServer]["url"];
Ti.API.log('', 'My Conf :: '+conf+' Title:'+currentServer+' Url:'+currentUrl);

onloadCallback = function() {
	actInd.show();
	try {
		Titanium.API.log('', '***** Response Xml: ' + this.responseXML);
		Titanium.API.log('', '***** Response Xml: ' + this.responseText);
		var xmlMessage = this.responseXML;
		Titanium.API.log('', '***** Parsed Xml Message: ' + xmlMessage);
		var titleTags = xmlMessage.documentElement.getElementsByTagName("title");
		var entryTags = xmlMessage.documentElement.getElementsByTagName("entry");
		Titanium.API.log('', '***** Title tag List:'+titleTags.length+
		'\n***** Entry tag List:'+entryTags.length);
		var builds = [], customData = [];
		for (var i=0; i < entryTags.length; i++) {
			var buildName,
				nodetitle = entryTags.item(i).getElementsByTagName("title").item(0).text,
		      	nodeIdTag = entryTags.item(i).getElementsByTagName("id").item(0).text,
		      	nodePublish = entryTags.item(i).getElementsByTagName("published").item(0).text,
		      	buildNameEnd = nodetitle.indexOf(' #'),
		      	buildNumberEnd = nodetitle.indexOf('(');
		  	if (buildNameEnd < 0) continue;
		  	buildName = nodetitle.slice(0, buildNameEnd);
		  	if(builds.inArray(buildName) == false) {
		  		Ti.API.log('', 'buildName: '+buildName);
		  		Ti.API.log('', 'title:'+nodetitle+' idtag:'+nodeIdTag+' pub:'+nodePublish);
				builds.push(buildName);
				var status = nodetitle.substr(buildNumberEnd),
					statusIcon;
				if (status.indexOf('(stable)') >= 0 || status.indexOf('normal') >= 0) {
					statusIcon = 'add.png';
				} else if (status.indexOf('?') >= 0) {
					statusIcon = 'loading.png';
				} else{
					statusIcon = 'warning.png';
				};
		        /* date */
		        var date = nodePublish.slice(0, nodePublish.indexOf('T')),
		        	preTime = nodePublish.replace(date + 'T', ''),
		        	timelari = preTime.slice(0, preTime.indexOf('Z')),
		        	detailsArray = fixdate(timelari, date);
		        	
		        customData.push({status:statusIcon,
		        		name:buildName,
		        		number:nodetitle.slice(buildNameEnd, buildNumberEnd),
		        		buildDate:detailsArray[1],
		        		buildTime:detailsArray[0]});
		        				
		  	}
		};
		/* Properties for the table */ 
		tableview = Titanium.UI.createTableView({
	       data:drawTableRows(customData),
	       top:160,
	    });
	    win.add(tableview);
		Ti.API.log('', 'array: '+builds.length);
	} catch (e) {
		Titanium.API.debug(e);
	}
	actInd.hide();
}

httpRequest = function () {
	xhr = Ti.Network.createHTTPClient();
	xhr.open('GET', currentUrl);
	xhr.send();
	xhr.onload = onloadCallback;
};
httpRequest();

Array.prototype.inArray = function (value)
{
 // Returns true if the passed value is found in the
 // array. Returns false if it is not.
 var i;
 for (i=0; i < this.length; i++)
 {
 if (this[i] == value)
 {
 return true;
 }
 }
 return false;
};

drawTableRows = function(data){
	var tableData = [];
	
	for (var i  = 0; i < data.length; i++){
		var currentRow = Ti.UI.createTableViewRow();
		
		var statusImage = Ti.UI.createImageView({
			url:data[i].status,
			width:40,
			height:40,
			left:5,
			top:10
		});
		
		var nameLabel = Ti.UI.createLabel({
			text:data[i].name,
			font:{fontSize:14,fontFamily:'Arial',fontWeight:'bold'},
			height:20,
			left:50,
			top:0
		});
		
		var numberLabel = Ti.UI.createLabel({
			text:data[i].number,
			font:{fontSize:14,fontFamily:'Arial'},
			height:20,
			left:50,
			top:20
		});
		
		var dateLabel = Ti.UI.createLabel({
			text:data[i].buildDate,
			font:{fontSize:14,fontFamily:'Arial'},
			height:15,
			left:50,
			top:40
		});
		
		var timeImage = Ti.UI.createImageView({
			url:'delete.png',
			width:10,
			height:10,
			left:0
		});
		
		var timeLabel = Ti.UI.createLabel({
			text:data[i].buildTime,
			font:{fontSize:14,fontFamily:'Arial'},
			height:15,
			left:15
		});
		
		var timeView = Ti.UI.createView({
			height:15,
			left:50,
			top:55
		});
		timeView.add(timeImage);
		timeView.add(timeLabel);
		
		currentRow.add(statusImage);
		currentRow.add(nameLabel);
		currentRow.add(numberLabel);
		currentRow.add(dateLabel);
		currentRow.add(timeView);
		
		tableData.push(currentRow);
	}
	
	return tableData;
};
homebutton.addEventListener('click', function(){
	win.close();
});

refreshbutton.addEventListener('click', function(){
	reloadWindow();
});

quitbutton.addEventListener('click', function(){
	Ti.UI.currentWindow.close();
	win.prev.close();
});

win.addEventListener('android:back', function(){
	win.close();
})

fixdate = function (fullTime, fullDate) {
	var time = fullTime.split(':'),
		date = fullDate.split('-'),
		hour = parseInt(time[0], 10),
		day = parseInt(date[2], 10),
		localHour = hour + 8;
		
	if (localHour >=  24) {
		localHour -= 24;
		day ++;
	}
	time[0] = localHour;
	date[2] = day;
	return [time.join(':'), date.join('-')];
};

reloadWindow = function () {
	win.remove(tableview);
	setTimeout(function(){
		httpRequest();
	}, 500);
};

setInterval(function(){
	reloadWindow();
}, 1200000);
