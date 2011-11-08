/**
 * Initial stuff
 */
(function() {
  //create the logo view
  jenkins.ui.createLogoView = function() {
    var introView = Titanium.UI.createWindow({
		backgroundColor: "#151681",
		navBarHidden:true
	});
	var introLogo= Titanium.UI.createImageView({
		image: "images/logo-jenkins-moustache.png",
		width:126,
		height:71
	})
	introView.add(introLogo);
    return introView;
  };
  
  /**
   * Create notification like loading box
   */
  jenkins.ui.createNotification = function( text, delay ) {
  	var notification = Titanium.UI.createActivityIndicator({
		bottom:10, 
		height:20,
		width:10,
		message: text
	});
	Ti.UI.currentWindow.add( notification );
	setTimeout(function() {
		Ti.UI.currentWindow.remove( notification );
	},  delay ? delay : 2000);
  };
  
  jenkins.ui.createMainWindow = function() {
  	/**
	 * servers list window
	 */
	var serversWindow = Ti.UI.createWindow({
		backgroundColor: "#fff",
		title: "Servers",
		navBarHidden:true,
		tabBarHidden:true,
		exitOnClose:true,
		top: 0
	});
	/*
	var titleBar = Ti.UI.createView({
		top:0,
		height: jenkins.ui.css.topBarHeight,
		backgroundColor: "#0788ff"
	});
	var pageTitle = Ti.UI.createLabel({
		text: "Jenkins Servers",
		font: {fontSize:18, fontWeight: "bold", fontFamily: "Arial"},
		left:25,
		color: "#fff"
	});
	titleBar.add(pageTitle);
	serversWindow.add(titleBar);*/
	return serversWindow;
  };
  
	//Extend an object with the properties from another 
	//(thanks Dojo - http://docs.dojocampus.org/dojo/mixin)
	var empty = {};
	function mixin(/*Object*/ target, /*Object*/ source){
		var name, s, i;
		for(name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
		return target; // Object
	};
	jenkins.mixin = function(/*Object*/ obj, /*Object...*/ props){
		if(!obj){ obj = {}; }
		for(var i=1, l=arguments.length; i<l; i++){
			mixin(obj, arguments[i]);
		}
		return obj; // Object
	};
})();