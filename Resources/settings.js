var win = Titanium.UI.currentWindow;
// Ti.include('config.js');

/**
 * actionbar - container for done, add, remove buttons
 */
var buttonbar = Ti.UI.createView({
	height : 50,
	backgroundColor: '#0788ff',
	top:0,
	borderRadius: 2,
	borderWidth: 1,
	borderColor: '#fff'
});

/**
 * Done button. Close current window. Redirect to previous window on stack
 * Left hand corner
 */
var donebutton = Ti.UI.createButton({
	height:40,
	width:60,
	// image:'warning.png',
	title:'  Done  ',
	left:10,
	font:{fontSize:11},
	name:'Done'
});
buttonbar.add(donebutton);

/**
 * Add button. Add new server
 * Right hand corner
 */
var addbutton = Ti.UI.createButton({
	height:30,
	width:33,
	image:'icon-add.png',
	// title:'Add',
	right:50,
	// bottom:50,
	// font:{fontSize:7},
	name:'Add'
});
buttonbar.add(addbutton);

/**
 * Remove button. Delete servers from list
 * Right hand corner
 */
var removebutton = Ti.UI.createButton({
	height:30,
	width:33,
	image:'icon-delete.png',
	// title:'Add',
	right:10,
	// bottom:50,
	// font:{fontSize:7},
	name:'Remove'
});
buttonbar.add(removebutton);
win.add(buttonbar);

var data = [], 
	config = Ti.UI.currentTab.globalConf;

/**
 * Prepare table data for list of servers
 */	
for (var i in config){
	Ti.API.log('', 'i::'+i);
	var rowProperties = {title:i};
	if (config[i]['visible'] == true){
		rowProperties.backgroundColor = '#0c67d1';
		rowProperties.color = '#a1cdfb';
	} else {
		rowProperties.backgroundColor = '#fff';
		rowProperties.color = '#757575';
	}
	data.push(rowProperties);
}

/**
 * Container below actionbar. Contain buttons to check/remove all servers
 */
var checkbar = Ti.UI.createView({
	height : 50,
	backgroundColor: '#fff',
	top:50,
	borderRadius: 2,
	borderWidth: 2,
	borderColor: '#999',
});
var checkAll = Ti.UI.createButton({
	height:30,
	width:33,
	image:'icon-select.png',
	right:73,
	// top:80
	// right:50
});
var uncheckAll = Ti.UI.createButton({
	height:30,
	width:33,
	image:'icon-unselect.png',
	right:30,
	// top:80
	// right:10
});
// checkbar.add(checkAll);
// checkbar.add(uncheckAll);
// win.add(checkbar);

var textLabel = Titanium.UI.createLabel({
	text: 'Servers',
	top:10,
	height:25,
	left: 30,
	right:100,
	color:'#666464',
	font:{fontSize:20, fontWeight: 'bold'}
});

var explanationLabel = Titanium.UI.createLabel({
	text: 'Please choose which server you want to view',
	height: 55,
	top: 20,
	left:30,
	right:100,
	color:'#666464',
	font:{fontSize:14, fontWeight: 'bold'}
});

var containerLabel = Titanium.UI.createView({
	top:50,
	height:80
});
containerLabel.add(textLabel);
containerLabel.add(explanationLabel);
containerLabel.add(checkAll);
containerLabel.add(uncheckAll);
win.add(containerLabel);

var tableview = Titanium.UI.createTableView({
	data:data,
	top:130,
	left:30,
	right:30
});
win.add(tableview);

checkAll.addEventListener('click', function(){
	for (var i = 0; i < data.length; i++){
		if (data[i]['backgroundColor'] == '#fff'){
			// data[i]['visible'] = true;
			data[i]['backgroundColor'] = '#0c67d1';
			data[i]['color'] = '#a1cdfb';
			config[data[i]['title']]['visible'] = true;
		}
	};
	tableview.setData(data);
});

uncheckAll.addEventListener('click', function(){
	for (var i = 0; i < data.length; i++){
		if (data[i]['backgroundColor'] == '#0c67d1'){
			data[i]['backgroundColor'] = '#fff';
			data[i]['color'] = '#757575';
			config[data[i]['title']]['visible'] = false;
		}
	};
	tableview.setData(data);
});

tableview.addEventListener('click', function(e){
	if (e.rowData.backgroundColor ==  '#0c67d1'){
		config[e.rowData.title]['visible'] = false;
		e.rowData.backgroundColor = '#fff';
		e.rowData.color = '#757575';
	} else {
		config[e.rowData.title]['visible'] = true;
		e.rowData.color = '#a1cdfb';
		e.rowData.backgroundColor =  '#0c67d1'
	}
});

addbutton.addEventListener('click', function(){
	/**
	 * popup to add server
	 */
	var addServer = Ti.UI.createView({
		top: 130,
		left:50,
		right:50,
		height: 300,
		backgroundColor: '#424542',
		borderRadius: 2,
		borderWidth: 1,
		borderColor: '#bdbebd',
		visible: false
	});
	
	var addtitleIcon = Ti.UI.createImageView({
		url : 'icon-add.png', //icon
		width: 33,
		height: 30,
		left:19
	})
	
	var addtitleText = Ti.UI.createLabel({
		text: 'Add Server',
		height: 40,
		left:65
	});
	
	var addtitleview = Ti.UI.createView({
		top: 0,
		height: 50
	});
	
	addtitleview.add(addtitleIcon);
	addtitleview.add(addtitleText);
	addServer.add(addtitleview);
	/**
	 * textfield for new server name
	 */
	var servername = Titanium.UI.createTextField({
		color:'#336699',
		top:50,
		//left:10,
		width:350,
		// center:{x:10, y:10},
		hintText:'Server Name',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	addServer.add(servername);
	
	/**
	 * text field for new server url
	 */
	var url = Titanium.UI.createTextField({
		color:'#336699',
		top:130,
		//left:10,
		width:350,
		hintText:'Server URL',
		// passwordMask:true,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	addServer.add(url);
	
	/**
	 * button for confirm server details
	 */
	var confirmadd = Titanium.UI.createButton({
		title:'Add',
		top:210,
		left: 10,
		width:90,
		height:40,
		borderRadius:1,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	});
	addServer.add(confirmadd);
	
	/**
	 * button to cancel adding server action
	 */
	var canceladd = Titanium.UI.createButton({
		title:'Cancel',
		top:210,
		right: 10,
		width:90,
		height:40,
		borderRadius:1,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	});
	addServer.add(canceladd);
	
	win.add(addServer);
	addServer.show();
	
	confirmadd.addEventListener('click', function(){
		if (servername.value && url.value && check_it(url.value)) {
			config[servername.value] = {};
			config[servername.value]['url'] = url.value;
			config[servername.value]['visible'] = true;
			config[servername.value]['title'] = servername.value;
			//update table
			// var newData = tableview.data;
			// newData.push({title:servername.value, backgroundColor:'#0c67d1'});
			// tableview.setData(newData);
			tableview.appendRow({title:servername.value, backgroundColor:'#0c67d1', color: '#a1cdfb'});
			win.remove(addServer);
		} else{
			var alertLabel = Ti.UI.createLabel({
				text: 'No details. What to add?',
				backgroundColor: 'transparent',
				color: 'red',
				font: {fontSize:14,fontFamily:'Arial'},
				bottom:0,
				height:50,
				left:10
			});
			addServer.add(alertLabel);
			setTimeout(function(){
				addServer.remove(alertLabel);
			}, 2000);
		};
	});
	
	canceladd.addEventListener('click', function(){
		win.remove(addServer);
	});
});

removebutton.addEventListener('click', function(){
	/**
	 * popup to remove server
	 */
	var removeServer = Ti.UI.createView({
		top: 130,
		left:50,
		right:50,
		height: 300,
		backgroundColor: '#424542',
		borderRadius: 2,
		borderWidth: 1,
		borderColor: '#bdbebd',
		visible: false
	});
	
	var rmtitleIcon = Ti.UI.createImageView({
		url : 'icon-warning.png', //icon
		width: 32,
		height: 30,
		left:19
	})
	
	var rmtitleText = Ti.UI.createLabel({
		text: 'Delete Server',
		height: 40,
		left:65
	});
	
	var rmtitleview = Ti.UI.createView({
		top: 0,
		height: 50
	});
	
	rmtitleview.add(rmtitleIcon);
	rmtitleview.add(rmtitleText);
	removeServer.add(rmtitleview);
	
	/**
	 * populate table with server list
	 */
	var serverList = [];
	for (var i in config){
		var rowProperties = {title:i, backgroundColor:'#fff', height:40, left:10,
							font:{fontSize:14, fontFamily:'Arial'}};
		serverList.push(rowProperties);
	}
	var tableRemove = Titanium.UI.createTableView({
		data:serverList,
		top:50,
		bottom:100,
		left:10,
		right:10
	});
	removeServer.add(tableRemove);
	
	/**
	 * button to confirm remove selected server
	 */
	var confirmRemove = Titanium.UI.createButton({
		title:'Confirm',
		top:220,
		left: 10,
		width:90,
		height:40,
		borderRadius:1,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	});
	removeServer.add(confirmRemove);
	
	/**
	 * button to cancel remove server action
	 */
	var cancelRemove = Titanium.UI.createButton({
		title:'Cancel',
		top:220,
		right: 10,
		width:90,
		height:40,
		borderRadius:1,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	});
	removeServer.add(cancelRemove);
	
	win.add(removeServer);
	removeServer.show();
	
	var toBeDeleted = [];
	tableRemove.addEventListener('click', function(e){
		if (e.rowData.title !== 'List of servers') {
			e.rowData.backgroundColor = '#f61d1d';
			toBeDeleted.push(e.rowData.title);
		}
	});
	
	confirmRemove.addEventListener('click', function(){
		if (toBeDeleted.length > 0){
			for (var j=0; j < toBeDeleted.length; j++) {
				delete config[toBeDeleted[j]];
			};
			var settingsTableData = [];
			for (var i in config){
				var newrow = {title:i};
				if (config[i]['visible'] == true){
					newrow.backgroundColor = '#0c67d1';
					newrow.color = '#a1cdfb';
				}
				settingsTableData.push(newrow);
			}
			tableview.setData(settingsTableData);
			win.remove(removeServer);
		} else {
			var alertLabel = Ti.UI.createLabel({
				text: 'Select something la. Wat i wana remove?',
				backgroundColor: 'transparent',
				color: 'red',
				font: {fontSize:14,fontFamily:'Arial'},
				bottom:0,
				height:50,
				left:10
			});
			removeServer.add(alertLabel);
			setTimeout(function(){
				removeServer.remove(alertLabel);
			}, 2000);
		}
	});
	
	cancelRemove.addEventListener('click', function(){
		toBeDeleted.length = 0;
		win.remove(removeServer);
	});
});

donebutton.addEventListener('click', function(){
	//set the config to properties as list
	var configArray = [];
	for (var i in config) {
		Ti.API.log('', 'CLICK DONE::'+i);
		config[i]['title'] = i;
		configArray.push(config[i]);
	}
	Ti.App.Properties.setList('serverConfig', configArray);
	win.close();
});

function check_it(theurl) {
	//FROM http://www.java2s.com/Code/JavaScript/Form-Control/URLValidate.htm
     var tomatch= /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/
     if (tomatch.test(theurl))
     {
         return true;
     }
     else
     {
         return false; 
     }
}

