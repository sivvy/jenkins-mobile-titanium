/**
 * Server list view
 */
(function() {
var currentServer, currentUrl, tableview, ctr, rowContainer,
	tableData = [];
	jenkins.ui.createServerView = function( win ) {
		onloadCallback = function() {
			try {
				var xmlMessage = this.responseXML;
				var entryTags = xmlMessage.documentElement.getElementsByTagName("entry");
				/**
				 * start off with icon for invalid server
				 */
				var statusIcon = "images/icon-server-error.png";
				if (xmlMessage && entryTags.length > 0) {
				/**
				 * if xml is valid set stable icon by default
				 */
				statusIcon = "images/icon-server-stable.png"; //green by default
				for (var i=0; i < entryTags.length; i++) {
					var nodetitle = entryTags.item(i).getElementsByTagName("title").item(0).text,
						buildNameEnd = nodetitle.indexOf(" #"),
						buildNumberEnd = nodetitle.indexOf("(");
					if (buildNameEnd < 0) continue;
					var status = nodetitle.substr(buildNumberEnd);
					if (status.indexOf("(stable)") < 0 && status.indexOf("normal") < 0 && status.indexOf("?") < 0){
						/**
						 * failure icon
						 */
						statusIcon = "images/icon-server-fail.png";
					}
				};
				}
				var serverName = "";
				for (var idx = 0; idx < tableData.length; idx++){
					if (this.location === tableData[idx]["url"]){
						serverName = tableData[idx]["title"];
					}
				}
				/**
				 * drawing rows here
				 */
				tableview.appendRow( {leftImage: statusIcon, title: serverName, height: 70} );
				jenkins.ui.loadingBox.hide();
			} catch (e) {
				Ti.API.log("Robin-exception",e);
				tableview.appendRow( {leftImage: "images/icon-server-error.png", title: "Not RSS", height: 70} );
				Titanium.API.debug(e);
			}
		};
		onerrorCallback = function( e ) {
			Titanium.API.log("Robin:onerrorCallback", e);
			tableview.appendRow( {leftImage: "images/icon-server-error.png", title: "Error 500", height: 70} );
		};	
		httpRequest = function (currentUrl) {
			var xhr = Ti.Network.createHTTPClient();
			xhr.open("GET", currentUrl);
			xhr.onerror = onerrorCallback;
			xhr.onload = onloadCallback;
			xhr.send();
		};
		
		mytablerocks = function() {
			tableview = Titanium.UI.createTableView( {
				id: "servers",
				top: 160
				// separatorColor: "transparent"
			} );

			for ( currentServer in jenkins.config ) {
				if ( jenkins.config[currentServer]["visible"] == true ) {
					currentUrl = jenkins.config[currentServer]["url"];
					tableData.push( {title: currentServer, url: currentUrl} );
					httpRequest( currentUrl );
				}
			}
			
			tableview.addEventListener("click", function(e) {
				
				if (e.rowData.title && e.rowData.leftImage !== "images/none.png") {
					Ti.API.log("ROBIN-clickServer", jenkins.config[e.rowData.title]["url"]);
					jenkins.ui.loadingBox.show();
					tableview.hide();
					jenkins.currentViewId = e.rowData.title;
					jenkins.ui.renderDetailView( win, e.rowData.title, jenkins.config[e.rowData.title]["url"]);
				} else {
					alert("Url seems to be invalid. Change your settings");
				}
			});
			return tableview;
		};
		
		//render table
		return mytablerocks();
	};
})();