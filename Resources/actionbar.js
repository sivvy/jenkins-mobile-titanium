win = Ti.UI.currentWindow;

/**
 * nav bar
 */
var buttonbar = Ti.UI.createView({
	height : 100,
	backgroundColor: '#0c67d1',
	top:0,
	borderRadius: 2,
	borderWidth: 1,
	borderColor: '#999',
	// bottom: 0,
	// backgroundColor: '#ff0800',
});

/**
 * home
 */
var homebutton = Ti.UI.createButton({
	height:40,
	width:40,
	image:'icon-home.png',
	left:50,
});

var homebuttonTitle = Ti.UI.createLabel({
	text: 'Home',
	left: 51,
	color:'#fff',
	font:{fontSize:14,fontWeight:'bold'},
	height: 20,
	bottom: 10
});

/**
 * refresh
 */
var refreshbutton = Ti.UI.createButton({
	height:40,
	width:40,
	image:'icon-refresh.png',
	left:165,
});

var refreshbuttonTitle = Ti.UI.createLabel({
	text: 'Refresh',
	left: 160,
	color:'#fff',
	font:{fontSize:14,fontWeight:'bold'},
	height: 20,
	bottom: 10
});

/**
 * settings
 */
var settingsbutton = Ti.UI.createButton({
	height:27,
	width:27,
	image:'icon-settings.png',
});

var settingsbuttonTitle = Ti.UI.createLabel({
	text: 'Settings',
	color:'#fff',
	font:{fontSize:14,fontWeight:'bold'},
	height: 20,
	bottom: 10,
	left:270
});

/**
 * quit
 */
var quitbutton = Ti.UI.createButton({
	height:40, 
	width:40,
	image:'icon-quit.png',
	right:50,
});

var quitbuttonTitle = Ti.UI.createLabel({
	text: 'Quit',
	right: 55,
	color:'#fff',
	font:{fontSize:14,fontWeight:'bold'},
	height: 20,
	bottom: 10
});

/**
 * fake titlebar on server Details page
 */
var titleBar = Ti.UI.createView({
	top:0,
	height:60,
	backgroundColor:'#0788ff'
});

/**
 * Depicting server name for build list
 */
var pageTitle = Ti.UI.createLabel({
	text:win.title,
	font:{fontSize:18, fontWeight:'bold', fontFamily:'Arial'},
	left:25,
	color:'#fff'
});
titleBar.add(pageTitle);

/**
 * need fake title bar on details page
 * because want to add settings button on right corner
 */
if (win.title !== 'Servers') {
	win.add(titleBar);
}
if (win.title !== 'Servers') {
	buttonbar.top = 60;
	settingsbutton.right = 20;
	refreshbutton.left = 227;
	refreshbuttonTitle.left = 227;
} else {
	settingsbutton.left = 280;
}
buttonbar.add(homebutton);
buttonbar.add(homebuttonTitle);
buttonbar.add(refreshbutton);
buttonbar.add(refreshbuttonTitle);
if (win.title == 'Servers') {
	buttonbar.add(settingsbutton);
	buttonbar.add(settingsbuttonTitle);
} else {
	titleBar.add(settingsbutton);
}
buttonbar.add(quitbutton);
buttonbar.add(quitbuttonTitle);
win.add(buttonbar);

settingsbutton.addEventListener('click', function(){
	var settingsWindow = Ti.UI.createWindow({
		url:'settings.js',
		backgroundColor: '#e1e1e1',
		title:'Settings'
	});
	Ti.UI.currentTab.open(settingsWindow,{animated:true});
});

