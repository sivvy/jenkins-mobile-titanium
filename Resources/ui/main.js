

(function() {
	jenkins.ui = {
		__isLargeScreen: undefined,
	    __isAndroid: undefined
	};
	jenkins.currentViewId = null;
	jenkins.ui.loadingBox = Titanium.UI.createActivityIndicator({
		bottom: 10, 
		height: 20,
		width: 10,
		message: "Loading..."
	});
	
	
	
	jenkins.ui.isLargeScreen = function() {
		if (jenkins.ui.__isLargeScreen === undefined) {
			jenkins.ui.__isLargeScreen = (Ti.Platform.displayCaps.platformWidth >= 600);
		}
		return jenkins.ui.__isLargeScreen;
	};

	jenkins.ui.isAndroid = function() {
		if (jenkins.ui.__isAndroid === undefined) {
			jenkins.ui.__isAndroid = (Ti.Platform.osname == 'android');
		}
		return jenkins.ui.__isAndroid;
	}
	if (jenkins.ui.isAndroid()) {
		Ti.include("/config/android-css.js");
	} else {
		Ti.include("/config/iphone-css.js");
	}
	jenkins.ui.init = function() {
		Titanium.UI.setBackgroundColor( "#fff" );
		
		var serverView = null;
		var logoView = jenkins.ui.createLogoView();
		logoView.open();
		
		//We initialize outside the setTimeout so it prerender everything before 
		//the logo close
		//main window
		serverWindow = jenkins.ui.createMainWindow();
		serverWindow.add( jenkins.ui.createTitleBar( "Jenkins servers" ) );
		// separator
		serverWindow.add( Ti.UI.createView({
		    top: 30,
		    height: 1,
		    zIndex: 99,
		    backgroundColor: "#ccc"
		}) );
		
		//actionbar
		buttonbar = jenkins.ui.createNavigatorView( serverWindow );
		serverWindow.add( buttonbar );
		
		//adding reload event so we can call anywhere
		serverWindow.addEventListener( "serverList.reload", function() {
			if ( serverView ) {
				serverWindow.remove( serverView );
			}
			serverView = jenkins.ui.createServerView( serverWindow );
			serverWindow.add( serverView );
			// serverView.show();
		});
		
		serverWindow.fireEvent( "serverList.reload" );
		
		Ti.API.log("TA Button", jenkins.ui.css.titleBar);
		//To keep track on current view
		jenkins.currentViewId = "servers";
		
		buttonbar.addEventListener( "click", function( ev ) {
			jenkins.ui.loadingBox.show();
			//Based on buttonbar"s children
			switch ( ev.source.text ) {
				case "Refresh":
					Ti.API.log("ROBIN-Refresh", jenkins.currentViewId);	
					if ( jenkins.currentViewId === "servers") {
						serverWindow.remove( serverView );
						serverView = jenkins.ui.createServerView( serverWindow );
						serverWindow.add( serverView );
					} else {
						serverWindow.remove( serverWindow.children[ serverWindow.children.length - 1] );
						jenkins.ui.renderDetailView( serverWindow, jenkins.currentViewId, jenkins.config[jenkins.currentViewId]["url"] );
					}
					break;
				case "Home":	
					Ti.API.log("ROBIN-home", "remove last view and show server list");	
					if ( jenkins.currentViewId !== "servers") {
						var current = serverWindow.children[ serverWindow.children.length - 1];
						serverWindow.remove( current );
						jenkins.currentViewId = "servers";
						serverView.show();
					}
					
					break;
				case "Settings":	
					if ( jenkins.currentViewId !== "servers") {
						var current = serverWindow.children[ serverWindow.children.length - 1];
						serverWindow.remove( current );
						jenkins.currentViewId = "servers";
					}
					Ti.API.log("ROBIN-setting", "Open settting windows");	
					jenkins.ui.createSettingView( serverWindow );
					break;
				case "Quit":	
					Ti.API.log("ROBIN-quit", "Quit");	
				    serverWindow.close();
					break;
			}
			jenkins.ui.loadingBox.hide();
		});
		
		serverWindow.addEventListener("android:back", function() {
			Ti.API.log("ROBIN-android:back", "tata");	
			if ( jenkins.currentViewId !== "servers") {
				var current = serverWindow.children[ serverWindow.children.length - 1];
				jenkins.currentViewId = "servers";
				serverWindow.remove( current );
				serverView.show();
			} else {
				serverWindow.close();
			}
		});
		
		setTimeout(function(){
			logoView.close();
			serverWindow.open();
		}, 2000);
	};
})();

Ti.include( "/ui/index.js" );
Ti.include( "/ui/settingView.js" );
Ti.include( "/ui/topNavigator.js" );
Ti.include( "/ui/serverView.js" );
Ti.include( "/ui/detailView.js" );
