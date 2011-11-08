/**
 * Detail list view
 */
(function() {
var tableview;
	jenkins.ui.renderDetailView = function( win, title, currentUrl ) {
		tableview = Titanium.UI.createTableView( jenkins.mixin( {}, jenkins.ui.css.listView, {
													id: title,
													currentUrl: currentUrl
									}));
		onloadCallback = function() {
			try {
				var xmlMessage = this.responseXML;
				var titleTags = xmlMessage.documentElement.getElementsByTagName("title");
				var entryTags = xmlMessage.documentElement.getElementsByTagName("entry");
				var builds = [], customData = [];
				for (var m=0; m < 5; m++) //testing more lists
				for (var i=0; i < entryTags.length; i++) {
					var buildName,
						nodetitle = entryTags.item(i).getElementsByTagName("title").item(0).text,
				      	nodeIdTag = entryTags.item(i).getElementsByTagName("id").item(0).text,
				      	nodePublish = entryTags.item(i).getElementsByTagName("published").item(0).text,
				      	buildNameEnd = nodetitle.indexOf(" #"),
				      	buildNumberEnd = nodetitle.indexOf("(");
				  	if ( buildNameEnd < 0 ) continue;
				  	buildName = nodetitle.slice(0, buildNameEnd);
				  	//list everything
				  	// if ( builds.inArray(buildName) === false ) {
						builds.push(buildName);
						var status = nodetitle.substr(buildNumberEnd),
							statusIcon;
						/* determine icon here */
						if (status.indexOf("(stable)") >= 0 || status.indexOf("normal") >= 0) {
							statusIcon = "images/icon-stable.png"; /*stable */
						} else if (status.indexOf("?") >= 0) {
							statusIcon = "images/icon-building.png";/* building */
						} else{
							statusIcon = "images/icon-fail.png";/* failure */
						};
				        /* date */
				        var date = nodePublish.slice(0, nodePublish.indexOf("T")),
				        	preTime = nodePublish.replace(date + "T", ""),
				        	timelari = preTime.slice(0, preTime.indexOf("Z")),
				        	detailsArray = fixdate(timelari, date);
				        	
				        customData.push({ 
			        	    status: statusIcon,
			        		name: buildName,
			        		number: nodetitle.slice(buildNameEnd, buildNumberEnd),
			        		buildDate: detailsArray[1],
			        		buildTime: detailsArray[0]
			        	});
				        				
				  	// }
				};
				drawTableRows( customData );
				
			    win.add( tableview );
			    win.open();
			    jenkins.ui.loadingBox.hide();
			} catch (e) {
				Titanium.API.debug(e);
				tableview.appendRow( {leftImage: "images/none.png", title: "Timeout", height: 70} );
				jenkins.ui.loadingBox.hide();
			}
		}
		onerrorCallback = function( e ) {
			Titanium.API.log("Robin:onerrorCallback-details", e);
			tableview.appendRow( {leftImage: "images/none.png", title: "Timeout", height: 70} );
			jenkins.ui.loadingBox.hide();
		};
		httpRequest = function ( currentUrl ) {
			xhr = Ti.Network.createHTTPClient();
			xhr.open("GET", currentUrl);
			xhr.onload = onloadCallback;
			xhr.onerror = onerrorCallback;
			xhr.send();
		};
		
		fixdate = function (fullTime, fullDate) {
			var time = fullTime.split(": "),
				date = fullDate.split("-"),
				hour = parseInt(time[0], 10),
				day = parseInt(date[2], 10),
				localHour = hour + 8;
				
			if (localHour >=  24) {
				localHour -= 24;
				day ++;
			}
			time[0] = localHour;
			date[2] = day;
			return [time.join(": "), date.join("-")];
		};

		Array.prototype.inArray = function(value) {
			 // Returns true if the passed value is found in the
			 // array. Returns false if it is not.
			 var i;
			 for ( i = 0; i < this.length; i++ ) {
				 if ( this[i] == value ) {
				 	return true;
				 }
			 }
			 return false;
		};
		
		drawTableRows = function( data ) {
			/**
			 * drawing tables here
			 */
			var tableData = [];
			
			for ( var i = 0; i < data.length; i++ ) {
				var currentRow = Ti.UI.createTableViewRow({
					height: 70
				});
				
				/**
				 * status icon 
				 */
				var statusImage = Ti.UI.createImageView({
					backgroundImage: data[i].status,
					width: 57,
					height: 46,
					left: 5,
					top: 10
				});
				
				/**
				 * build name
				 */
				var nameLabel = Ti.UI.createLabel({
					text: data[i].name,
					color: "#0c67d1",
					font: {fontSize:14, fontFamily: "Arial", fontWeight: "bold"},
					height: 20,
					left: 80,
					top: 5
				});
				
				/**
				 * build number
				 */
				var numberLabel = Ti.UI.createLabel({
					text: data[i].number,
					color: "#0c67d1",
					font: {fontSize:14,fontFamily: "Arial"},
					height: 20,
					left: 80,
					top: 20
				});
				/**
				 * build date
				 */
				var dateLabel = Ti.UI.createLabel({
					text: data[i].buildDate,
					color: "#424242",
					font: {fontSize:14, fontFamily: "Arial"},
					height: 15,
					left: 80,
					top: 35
				});
				
				/**
				 * build time
				 */
				var timeImage = Ti.UI.createImageView({
					backgroundImage: "images/icon-time.png", /* crappy time icon */
					width: 10,
					height: 10,
					left: 0,
					top: 8
				});
				
				var timeLabel = Ti.UI.createLabel({
					text: data[i].buildTime,
					color: "#888686",
					font: {fontSize:11, fontFamily: "Arial"},
					height: 15,
					left: 13
				});
				
				var timeView = Ti.UI.createView({
					height: 25,
					left: 80,
					top: 45
				});
				timeView.add( timeImage );
				timeView.add( timeLabel );
				
				currentRow.add( statusImage );
				currentRow.add( nameLabel );
				currentRow.add( numberLabel );
				currentRow.add( dateLabel );
				currentRow.add( timeView );
				tableview.appendRow( currentRow );
				//tableData.push( currentRow );
			}
			// return tableData;
		};
		httpRequest( currentUrl );
		
		Ti.API.log("ROBIN createDetailView", tableview);
		
		return tableview;
	};
})();