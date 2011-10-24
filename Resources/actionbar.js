win = Ti.UI.currentWindow;

var buttonbar = Ti.UI.createView({
	height : 100,
	backgroundColor: '#999',
	top:0,
	borderRadius: 2,
	borderWidth: 2,
	borderColor: '#999',
	// bottom: 0,
	// backgroundColor: '#ff0800',
});
var homebutton = Ti.UI.createButton({
	height:40,
	width:40,
	// image:'warning.png',
	title:'Home',
	left:50,
	font:{fontSize:7},
	name:'Home'
});
var refreshbutton = Ti.UI.createButton({
	height:40,
	width:40,
	// image:'warning.png',
	title:'Refresh',
	left:165,
	font:{fontSize:7},
	name:'Refresh'
});
var settingsbutton = Ti.UI.createButton({
	height:40,
	width:40,
	// image:'warning.png',
	title:'Settings',
	font:{fontSize:7},
	name:'Settings'
});
var quitbutton = Ti.UI.createButton({
	height:40, 
	width:40,
	// image:'warning.png',
	title:'Quit',
	right:50,
	font:{fontSize:7},
	name:'Quit'
});

var titleBar = Ti.UI.createView({
	top:0,
	height:60,
	backgroundColor:'pink'
});
var pageTitle = Ti.UI.createLabel({
	text:win.title,
	font:{fontSize:18, fontWeight:'bold', fontFamily:'Arial'},
	left:5,
	color:'#fff'
});
titleBar.add(pageTitle);
if (win.title !== 'Servers') {
	win.add(titleBar);
}

if (win.title !== 'Servers') {
	buttonbar.top = 60;
	settingsbutton.right = 50;
	refreshbutton.left = 227;
} else {
	settingsbutton.left = 280;
}

buttonbar.add(homebutton);
buttonbar.add(refreshbutton);
if (win.title == 'Servers') {
	buttonbar.add(settingsbutton);
} else {
	titleBar.add(settingsbutton);
}
buttonbar.add(quitbutton);
win.add(buttonbar);

settingsbutton.addEventListener('click', function(){
	var settingsWindow = Ti.UI.createWindow({
		url:'settings.js',
		backgroundColor: '#fff',
		title:'Settings'
	});
	Ti.UI.currentTab.open(settingsWindow,{animated:true});
});

