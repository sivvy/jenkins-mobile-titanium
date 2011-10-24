var win = Titanium.UI.currentWindow;
// win.setLeftNavButton('servers.js');
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

onloadCallback = function() {
	actInd.show();
	try {
		var xmlMessage = this.responseXML;
		var titleTags = xmlMessage.documentElement.getElementsByTagName("title");
		var entryTags = xmlMessage.documentElement.getElementsByTagName("entry");
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
				builds.push(buildName);
				var status = nodetitle.substr(buildNumberEnd),
					statusIcon;
				/* determine icon here */
				if (status.indexOf('(stable)') >= 0 || status.indexOf('normal') >= 0) {
					statusIcon = 'icon-stable.png'; /*stable */
				} else if (status.indexOf('?') >= 0) {
					statusIcon = 'icon-building.png';/* building */
				} else{
					statusIcon = 'icon-fail.png';/* failure */
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
	/**
	 * drawing tables here
	 */
	var tableData = [];
	
	for (var i  = 0; i < data.length; i++){
		var currentRow = Ti.UI.createTableViewRow();
		
		/**
		 * status icon 
		 */
		var statusImage = Ti.UI.createImageView({
			url:data[i].status,
			width:57,
			height:46,
			left:5,
			top:10
		});
		
		/**
		 * build name
		 */
		var nameLabel = Ti.UI.createLabel({
			text:data[i].name,
			color:'#0c67d1',
			font:{fontSize:14,fontFamily:'Arial',fontWeight:'bold'},
			height:20,
			left:80,
			top:5
		});
		
		/**
		 * build number
		 */
		var numberLabel = Ti.UI.createLabel({
			text:data[i].number,
			color:'#0c67d1',
			font:{fontSize:14,fontFamily:'Arial'},
			height:20,
			left:80,
			top:20
		});
		/**
		 * build date
		 */
		var dateLabel = Ti.UI.createLabel({
			text:data[i].buildDate,
			color:'#424242',
			font:{fontSize:14,fontFamily:'Arial'},
			height:15,
			left:80,
			top:35
		});
		
		/**
		 * build time
		 */
		var timeImage = Ti.UI.createImageView({
			url:'icon-time.png', /* crappy time icon */
			width:10,
			height:10,
			left:0,
			top:8
		});
		
		var timeLabel = Ti.UI.createLabel({
			text:data[i].buildTime,
			color:'#888686',
			font:{fontSize:11,fontFamily:'Arial'},
			height:15,
			left:13
		});
		
		var timeView = Ti.UI.createView({
			height:25,
			left:80,
			top:45
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
