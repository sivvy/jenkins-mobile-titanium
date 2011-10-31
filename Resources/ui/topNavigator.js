(function() {
	jenkins.ui.createTitleBar = function( win ) {
		/**
		 * fake titlebar on server Details page
		 */
		var titleBar = Ti.UI.createView( {
			top:0,
			height:60,
			backgroundColor: "#0788ff"
		} );
		
		/**
		 * Depicting server name for build list
		 */
		var pageTitle = Ti.UI.createLabel( {
			text: win.title,
			font: {fontSize:18, fontWeight: "bold", fontFamily: "Arial"},
			left: 25,
			color: "#fff"
		} );
		titleBar.add( pageTitle );
		return titleBar;
	};
	
	jenkins.ui.createNavigatorView = function( win ) {
		/**
		 * nav bar
		 */
		var buttonbar = Ti.UI.createView( {
			backgroundColor: "#0c67d1",
			borderRadius: 2,
			borderWidth: 1,
			borderColor: "#999",
			height : 100,
			top: 60
			// bottom: 0,
			// backgroundColor: "#ff0800",
		} );
		var buttons = [{text: "Home", icon: "images/icon-home-active.png", adjust: 0},
			{text: "Refresh", icon: "images/icon-refresh-active.png", adjust: -1}, 
			{text: "Settings", icon: "images/icon-settings-active.png", adjust: -1},  
			{text: "Quit", icon: "images/icon-quit-active.png", adjust: 1}];
			
		for( var i = 0; i < buttons.length; i++ ) {
			buttonbar.add( Ti.UI.createButton( {
												text: buttons[i].text,
												image: buttons[i].icon,
												borderRadius: 2,
			borderWidth: 1,
			borderColor: "#999",
												height: 80,
												width: 80,
												top: 3,
												left: ((100/buttons.length * i) + 5) + "%"
											})
			);
			buttonbar.add( Ti.UI.createLabel( {
												text: buttons[i].text,
												color: "#fff",
												font: {fontSize:14, fontWeight: "bold"},
												height: 20,
												bottom: 3,
												left: ((100/buttons.length * i) + 9 + buttons[i].adjust) + "%"
											})
			);
		}

		Ti.API.log("ROBIN", buttonbar.width);
		
		return buttonbar;
	};
	
})();