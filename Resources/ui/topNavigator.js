(function() {
	
	jenkins.ui.createTitleBar = function( titleText ) {
		Ti.API.log("TA", jenkins.ui.css.titleBar);
		/**
		 * fake titlebar on server Details page
		 */
		var titleBar = Ti.UI.createView( jenkins.ui.css.titleBar );
		
		/**
		 * Depicting server name for build list
		 */
		var pageTitle = Ti.UI.createLabel( {
			text: titleText,
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
		var buttonbar = Ti.UI.createView( jenkins.ui.css.actionButtonBar );
		var buttons = [{text: "Home", icon: "images/icon-home-active.png", adjust: 0},
			{text: "Refresh", icon: "images/icon-refresh-active.png", adjust: -1}, 
			{text: "Settings", icon: "images/icon-settings-active.png", adjust: -1},  
			{text: "Quit", icon: "images/icon-quit-active.png", adjust: 1}];
			
		for( var i = 0; i < buttons.length; i++ ) {
			buttonbar.add( Ti.UI.createButton( jenkins.mixin( {}, jenkins.ui.css.actionButton, {
													text: buttons[i].text,
													backgroundImage: buttons[i].icon,
													backgroundSelectedImage: buttons[i].icon.replace('active', 'inactive'),
													left: ((100/buttons.length * i) + 5) + "%"
												})
											 )
			);
		}

		Ti.API.log("ROBIN", buttonbar.width);
		
		return buttonbar;
	};
	
})();