var win = Titanium.UI.currentWindow;
// Ti.include('config.js');
var buttonbar = Ti.UI.createView({
	height : 50,
	backgroundColor: '#999',
	top:0,
	borderRadius: 2,
	borderWidth: 2,
	borderColor: '#fff',
	// bottom: 0,
	// backgroundColor: '#ff0800',
});
var donebutton = Ti.UI.createButton({
	height:40,
	width:40,
	// image:'warning.png',
	title:'Done',
	left:10,
	font:{fontSize:7},
	name:'Done'
});
buttonbar.add(donebutton);

var addbutton = Ti.UI.createButton({
	height:30,
	width:30,
	image:'add.png',
	// title:'Add',
	right:50,
	// bottom:50,
	// font:{fontSize:7},
	name:'Add'
});
buttonbar.add(addbutton);

var removebutton = Ti.UI.createButton({
	height:30,
	width:30,
	image:'delete.png',
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
	
for (var i in config){
	Ti.API.log('', 'i::'+i);
	var rowProperties = {title:i};
	if (config[i]['visible'] == true){
		rowProperties.backgroundColor = 'orange';
	} else {
		rowProperties.backgroundColor = '#fff';
	}
	data.push(rowProperties);
}

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
	width:30,
	image:'checkAll.png',
	right:50
});
var uncheckAll = Ti.UI.createButton({
	height:30,
	width:30,
	image:'uncheckAll.png',
	right:10
});
checkbar.add(checkAll);
checkbar.add(uncheckAll);
win.add(checkbar);

var tableview = Titanium.UI.createTableView({
	data:data,
	top:100
});
win.add(tableview);

checkAll.addEventListener('click', function(){
	for (var i = 0; i < data.length; i++){
		if (data[i]['backgroundColor'] == '#fff'){
			// data[i]['visible'] = true;
			data[i]['backgroundColor'] = 'orange';
			config[data[i]['title']]['visible'] = true;
		}
	};
	tableview.setData(data);
});

uncheckAll.addEventListener('click', function(){
	for (var i = 0; i < data.length; i++){
		if (data[i]['backgroundColor'] == 'orange'){
			data[i]['backgroundColor'] = '#fff';
			config[data[i]['title']]['visible'] = false;
		}
	};
	tableview.setData(data);
});

tableview.addEventListener('click', function(e){
	if (e.rowData.backgroundColor ==  'orange'){
		config[e.rowData.title]['visible'] = false;
		e.rowData.backgroundColor = '#fff';
	} else {
		config[e.rowData.title]['visible'] = true;
		e.rowData.backgroundColor =  'orange'
	}
	// storeUpdatedConf(config);
	// var configWindow = Ti.UI.createWindow({
		// url:'config.js',
		// newData: config
	// })
});

addbutton.addEventListener('click', function(){
	var addServer = Ti.UI.createView({
		top: 100,
		left:50,
		right:50,
		height: 300,
		backgroundColor: '#F0FFFF',
		borderRadius: 2,
		borderWidth: 2,
		borderColor: '#999',
		visible: false
	});
	
	var servername = Titanium.UI.createTextField({
		color:'#336699',
		top:40,
		left:10,
		width:300,
		// center:{x:10, y:10},
		hintText:'Server Name',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	addServer.add(servername);
	
	var url = Titanium.UI.createTextField({
		color:'#336699',
		top:120,
		left:10,
		width:300,
		hintText:'Server URL',
		// passwordMask:true,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	addServer.add(url);
	
	var confirmadd = Titanium.UI.createButton({
		title:'Add',
		top:200,
		left: 10,
		width:90,
		height:40,
		borderRadius:1,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	});
	addServer.add(confirmadd);
	
	var canceladd = Titanium.UI.createButton({
		title:'Cancel',
		top:200,
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
			// newData.push({title:servername.value, backgroundColor:'orange'});
			// tableview.setData(newData);
			tableview.appendRow({title:servername.value, backgroundColor:'orange'});
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
	var removeServer = Ti.UI.createView({
		top: 100,
		left:50,
		right:50,
		height: 300,
		backgroundColor: '#F0FFFF',
		borderRadius: 2,
		borderWidth: 2,
		borderColor: '#999',
		visible: false
	});
	
	var serverList = [];
	for (var i in config){
		var rowProperties = {title:i, backgroundColor:'#fff', height:20, left:10,
							font:{fontSize:14, fontFamily:'Arial'}};
		serverList.push(rowProperties);
	}
	serverList.unshift({title:'List of servers', backgroundColor:'#CECCCC', 
						height:20, left:10, 
						font:{fontSize:14, fontFamily:'Arial', fontWeight:'bold'}});
	var tableRemove = Titanium.UI.createTableView({
		data:serverList,
		top:50,
		bottom:100,
		left:10,
		right:10
	});
	removeServer.add(tableRemove);
	
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
			e.rowData.backgroundColor = 'red';
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
					newrow.backgroundColor = 'orange';
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

