/**
 * Setting view
 */
(function() {
	var config = jenkins.config;
	jenkins.ui.createSettingView = function( prevWindow ) {
		//backup config for later reset
		var backupConfig = jenkins.mixin({}, jenkins.config);
		
		Ti.API.log("Robin-createSettingView", backupConfig);
		var win = Ti.UI.createWindow({
			backgroundColor: "#fff",
			title: "Setting",
			navBarHidden:true,
			tabBarHidden:true,
			top: 0
		});
		/**
		 * actionbar - container for done, add, remove buttons
		 */
		var buttonbar = Ti.UI.createView({
			height: 60,
			backgroundColor: "#000",
			top: 0
		});
		
		/**
		 * Done button. Close current window. Redirect to previous window on stack
		 * Left hand corner
		 */
		var donebutton = Ti.UI.createButton({
			height: 45,
			width: 90,
			//image: "images/btn-done.png",
			title: "DONE",
			top: 10,
			left: 10,
			color: "#666464",
			font: {fontSize: 15},
			name: "Done"
		});
		buttonbar.add(donebutton);
		
		/**
		 * Add button. Add new server
		 * Right hand corner
		 */
		var addbutton = Ti.UI.createButton({
			height: 45,
			width: 90,
			//image: "images/icon-add.png",
			title: "NEW",
			top: 10,
			right: 10,
			color: "#666464",
			font: {fontSize: 15},
			name: "New" 
		});
		buttonbar.add(addbutton);
		
		/**
		 * Remove button. Delete servers from list
		 * Right hand corner
		 */
		
		win.add(buttonbar);
		
		var data = [];
		
		/**
		 * Prepare table data for list of servers
		 */	
		for (var i in config) {
			Ti.API.log("", "i:: "+i);
			tableRow = createTableRow( i );
			//var rowProperties = {title:i, rightImage: "images/icon-delete.png"};
			if ( config[i]["visible"] == false ){
				tableRow.backgroundColor = "#fff";
				tableRow.color = "#757575";
			} 
			data.push(tableRow);
		}
		
		/**
		 * Container below actionbar. Contain buttons to check/remove all servers
		 */
		var textLabel = Titanium.UI.createLabel({
			text: "Servers",
			top: 10,
			height: 25,
			left: 30,
			right: 100,
			color: "#666464",
			font: {fontSize:20, fontWeight: "bold"}
		});
		
		var explanationLabel = Titanium.UI.createLabel({
			text: "Please choose which server you want to view",
			height: 55,
			top: 20,
			left: 30,
			right: 100,
			color: "#666464",
			font: {fontSize:14, fontWeight: "bold"}
		});
		
		var containerLabel = Titanium.UI.createView({
			backgroundColor: "#fff",
			top: 60,
			height: 100
		});
		containerLabel.add(textLabel);
		containerLabel.add(explanationLabel);
		win.add(containerLabel);
		
		var tableview = Titanium.UI.createTableView({
			data: data,
			top: 160,
			left: 10,
			right: 10
		});
		win.add( tableview );
		
		addbutton.addEventListener("click", function() {
			jenkins.ui.createAddServerView( win, tableview );
		});
		
		swipeflag = false;
		selectFunction = function( ev ) {
			if ( swipeflag ) {
				swipeflag = false;
				return;
			} 
				
			Ti.API.log("Robin-table-singletap", ev);
			if ( ev.source.id == "removeButton" ) {
				delete config[ev.source.text];
				tableview.deleteRow( ev.index );
			}
			else {
				if (ev.rowData.backgroundColor ==  "#0c67d1") {
					config[ev.rowData.text]["visible"] = false;
					ev.rowData.backgroundColor = "#fff";
					//ev.rowData.color = "#757575";
				} else {
					config[ev.rowData.text]["visible"] = true;
					//ev.rowData.color = "#a1cdfb";
					ev.rowData.backgroundColor =  "#0c67d1"
				}
			}
		};
		if ( jenkins.ui.isAndroid() ) {
			tableview.addEventListener( "click", selectFunction );
		} else {
			tableview.addEventListener( "singletap", selectFunction );
		}
		
		
		
		/**
		 *  reference: https://gist.github.com/841075
		 * Adds "swipe" event support to Android, and adds swipe up and down to iOS.
		 * @param view The view that should be made swipeable.
		 * @param allowVertical Whether or not vertical swipes (up and down) are allowed; default is false.
		 * @param tolerance How much further you need to go in a particular direction before swipe is fired; default is 2.
		 */
		function makeSwipeable(view, allowVertical, tolerance) {
		    tolerance = tolerance || 2;
		    var start;
		    view.addEventListener("touchstart", function(evt) {
		        start = evt;
		    });
		    view.addEventListener("touchend", function (end) {
		        var dx = end.x - start.x, dy = end.y - start.y;
		        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		        // only trigger if dragged further than 50 pixels
		        if (dist < 50) {
		            return;
		        }
		        var isVertical = Math.abs(dx / dy) < 1 / tolerance;
		        var isHorizontal = Math.abs(dy / dx) < 1 / tolerance;
		        // only trigger if dragged in a particular direction
		        if (!isVertical && !isHorizontal) {
		            return;
		        }
		        // disallow vertical swipe, depending on the setting
		        if (!allowVertical && isVertical) {
		            return;
		        }
		        // now fire the event off so regular "swipe" handlers can use this!
		        end.direction = isHorizontal ? ((dx < 0) ? "left" : "right") : ((dy < 0) ? "up" : "down");
		        end.type = "swipe";
		        view.fireEvent("swipe", end);
		    });
		}
		
		timer = null;
		if ( jenkins.ui.isAndroid() ) {
			tableview.addEventListener("touchstart", function( ev ) {
				timer = setTimeout(function() {
					Ti.API.log("Robin-table-swipe", ev.source.text);
					jenkins.ui.createAddServerView( win, tableview, ev.source.text );
					swipeflag = true;
				}, 1000);
				
			});
			tableview.addEventListener("touchend", function( ev ) {
				clearTimeout( timer );
			});
		} else {
			tableview.addEventListener("doubletap", function( ev ) {
					Ti.API.log("Robin-table-swipe", ev.source);
					jenkins.ui.createAddServerView( win, tableview, ev.source.text );
			});
		}
		donebutton.addEventListener("click", function() {
			//set the config to properties as array
			var configArray = [];
			for (var i in config) {
				Ti.API.log("ROBIN", "Save to localstorage:: "+i);
				configArray.push(config[i]);
			}
			Ti.App.Properties.setList("serverConfig", configArray);
			jenkins.config = config;
			
			win.close();
			prevWindow.fireEvent( "serverList.reload" );
		});
		win.addEventListener( "android:back", function() {
			//revert back changes
			config = backupConfig;
			jenkins.config = backupConfig;
			
			win.close();
			prevWindow.fireEvent( "serverList.reload" );
		});
		win.open();
	};
	
	jenkins.ui.createAddServerView = function( win, tableview, value ) {
		var configServername = "", 
			configServerurl = "";
		if ( config[value] ) {
			configServername = config[value].title;
			configServerurl = config[value].url;
		}
		/**
		 * popup to add server
		 */
		var newServerView = Ti.UI.createView( jenkins.ui.css.settingNewPopup );
		
		var addtitleText = Ti.UI.createLabel(
			jenkins.mixin( {}, jenkins.ui.css.setttingNewPopupTitle, {
													text: "New Server"
									})
		);
		
		var addtitleview = Ti.UI.createView({
			top: 0,
			height: 50
		});
		
		addtitleview.add(addtitleText);
		newServerView.add(addtitleview);
		/**
		 * textfield for new server name
		 */
		var servername = Titanium.UI.createTextField(
			jenkins.mixin( {}, jenkins.ui.css.setttingNewPopupInput, {
													top: 50,
													hintText: "Server Name",
													value: configServername
									})
		);
		newServerView.add(servername);
		
		/**
		 * text field for new server url
		 */
		var url = Titanium.UI.createTextField(
			jenkins.mixin( {}, jenkins.ui.css.setttingNewPopupInput, {
													top: 110,
													hintText: "Server URL",
													value: configServerurl
									})
		);
		newServerView.add(url);
		
		/**
		 * button for confirm server details
		 */
		var confirmadd = Titanium.UI.createButton(
				jenkins.mixin( {}, jenkins.ui.css.setttingNewPopupButton, {
													top: 170,
													left: 10,
													title: "SAVE"
									})
		);
		newServerView.add( confirmadd );
		
		/**
		 * button to cancel adding server action
		 */
		var canceladd = Titanium.UI.createButton(
			jenkins.mixin( {}, jenkins.ui.css.setttingNewPopupButton, {
													top: 170,
													right: 10,
													title: "CANCEL"
									})
		);
		newServerView.add( canceladd );
		
		win.add( newServerView );
		newServerView.show();
		
		confirmadd.addEventListener("click", function() {
			servername.blur();
			if ( servername.value && url.value && check_it( url.value ) ) {
				if ( !config[servername.value] ) {
					config[servername.value] = {};
					tableview.appendRow( createTableRow( servername.value ) );
				} else {
					Ti.API.log("Robin-update", tableview.children);				
				}
				config[servername.value]["url"] = url.value;
				config[servername.value]["visible"] = true;
				config[servername.value]["title"] = servername.value;
				win.remove( newServerView );
			} else {
				alert("No details. What to add?");
			};
		});
		
		canceladd.addEventListener("click", function() {
			servername.blur();
			win.remove( newServerView );
		});
		return win;
	};
	
	
	function createTableRow( text ) {
		var tableRow = Ti.UI.createTableViewRow({
			//title: text,
			text: text,
			backgroundColor: "#0c67d1",
			color: "#a1cdfb",
			height: 50
			//rightImage: "images/icon-delete.png"
		});
		var labelView = Ti.UI.createView({
			id: "tableView",
			title: text,
			text: text,
			left: 10
		});
		var textLabel = Ti.UI.createLabel({
			//title: text,
			text: text,
			color: "#a1cdfb",
			left: 10,
			shadowColor: "#000"
		});
		labelView.add(textLabel);
		var removeButton = Ti.UI.createButton({
			id: "removeButton",
			text: text,
			//backgroundColor: "#0c67d1",
			backgroundImage: "images/icon-delete.png",
			height: 30,
			width: 33,
			right: 10
		});
		tableRow.add( labelView );
		tableRow.add( removeButton );
		return tableRow;
	};
	
	function check_it( theurl ) {
		 //FROM http://www.java2s.com/Code/JavaScript/Form-Control/URLValidate.htm
	     var tomatch= /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/
	     if ( tomatch.test( theurl ) ) {
	         return true;
	     }
	     else {
	         return false; 
	     }
	};
})();