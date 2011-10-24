var win = Titanium.UI.currentWindow;

var loginBtn = Titanium.UI.createButton({
	title:'Login',
	top:200,
	// left: 50,
	width:200,
	height:40,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

var closeBtn = Titanium.UI.createButton({
	title:"Quit",
  	top:300,
	// left: 150,
	width:200,
	height:40,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

// if (Ti.App.Properties.getBool('session') == true) {
	// loginBtn.title = 'Login';
// } else{
	// loginBtn.title = 'Login as another user';
// };
win.add(loginBtn);
win.add(closeBtn);
// win.add(loginBtn);
var loginView = Ti.UI.createView({
	top: 100,
	left:50,
	right:50,
	height: 300,
	// opacity: 0.1,
	backgroundColor: '#F0FFFF',
	borderRadius: 2,
	borderWidth: 2,
	borderColor: '#999',
	visible: false
});

var username = Titanium.UI.createTextField({
	color:'#336699',
	top:40,
	left:10,
	width:300,
	// center:{x:10, y:10},
	hintText:'Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
loginView.add(username);

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
loginView.add(password);

var enter = Titanium.UI.createButton({
	title:'Enter',
	top:200,
	left: 10,
	width:90,
	height:40,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
loginView.add(enter);
win.add(loginView);

loginBtn.addEventListener('click', function(){
	loginView.show();
});

enter.addEventListener('click', function(){
	//if validation oauth successful
	// Ti.App.Properties.setBool('session', true);
	loginBtn.title = 'Login as another user';
	var servers = Titanium.UI.createWindow({
		url:'servers.js',
		backgroundColor:'#fff',
		title:'Servers'
		// exitOnClose:true
	});
	loginView.hide();
	Titanium.UI.currentTab.open(servers,{animated:true});
})

closeBtn.addEventListener('click', function(){
	// Ti.App.Properties.setBool('session', false);
	win.close();
});
