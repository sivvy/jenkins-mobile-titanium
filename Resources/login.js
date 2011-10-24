var win = Titanium.UI.currentWindow;
Ti.include('config.js');
var username = Titanium.UI.createTextField({
	color:'#336699',
	top:40,
	left:10,
	width:300,
	// center:{x:10, y:10},
	width:300,
	hintText:'Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(username);

var password = Titanium.UI.createTextField({
	color:'#336699',
	top:120,
	left:10,
	width:300,
	hintText:'Password',
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(password);

var loginBtn = Titanium.UI.createButton({
	title:'Login',
	top:200,
	left: 10,
	width:90,
	height:40,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(loginBtn);

loginBtn.addEventListener('click', function(){
	win.close();
	var tabGroup = Titanium.UI.createTabGroup();
	var servers = Titanium.UI.createWindow({
		url:'servers.js',
		backgroundColor:'#fff',
		title:'Servers'
	});
	var tab = Titanium.UI.createTab({
		title:"Jenkins Servers",
		window:servers,
		globalConf:Configuration
	});
	tabGroup.addTab(tab);
	tabGroup.open();
});
