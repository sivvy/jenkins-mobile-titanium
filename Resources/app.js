// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');
// Ti.include('config.js');

var intro = Titanium.UI.createWindow({
	backgroundColor:'#151681',
	navBarHidden:true
});
var introLabel = Titanium.UI.createLabel({
	text: 'Jenkins',
	font:{fontSize:30,fontFamily:'Courier',fontWeight:'bold'},
	color:'#999',
	textAlign:'center'
})
intro.add(introLabel);
intro.open();
setTimeout(function(){
	intro.close();
	var tabGroup = Titanium.UI.createTabGroup();
	var servers = Titanium.UI.createWindow({
		url:'servers.js',
		backgroundColor:'#fff',
		title:'Servers',
		navBarHidden:true,
		tabBarHidden:true
	});
	var tab = Titanium.UI.createTab({
		title:"Jenkins Servers",
		window:servers,
		// globalConf:Configuration
	});
	tabGroup.addTab(tab);
	tabGroup.open();
	// var log = Titanium.UI.createWindow({
		// url:'login.js',
		// backgroundColor:'#fff',
		// title: 'Login'
	// });
	// log.open();
}, 2000);

