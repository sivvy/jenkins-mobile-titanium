// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

/**
 * intro : splash screen
 */
var intro = Titanium.UI.createWindow({
	backgroundColor:'#151681',
	navBarHidden:true
});
var introLogo= Titanium.UI.createImageView({
	url: 'logo-jenkins.png',
	width:71,
	height:71
})
intro.add(introLogo);
intro.open();
setTimeout(function(){
	intro.close();
	var tabGroup = Titanium.UI.createTabGroup();
	/**
	 * servers window
	 */
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
	});
	tabGroup.addTab(tab);
	tabGroup.open();
}, 2000);

