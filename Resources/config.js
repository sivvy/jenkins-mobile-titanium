// Ti.App.Properties.setList('serverConfig', configArray);
var serverList = [];
serverList = Ti.App.Properties.getList('serverConfig');

var Configuration = {
	'Jenkins-Cot' : {
		'url' : 'http://lcalink.dyndns.org/jenkins-cot/rssLatest',
		'visible':true
	},
	'Melinda' : {
		'url' : 'http://melinda.lcalink.com:8080/rssLatest',
		'visible':true
	},
	'Lobster' : {
		'url' : 'http://lobster.lcalink.com:8080/rssLatest',
		'visible':true
	},
	'Emiko' : {
		'url' : 'http://emiko.lcalink.com:8080/rssLatest',
		'visible':true
	},
	'Kaoru' : {
		'url' : 'http://kaoru.lcalink.com:8080/rssLatest',
		'visible':true
	}
};

// var Configuration = {};
if (serverList !== null){
for (var i=0; i < serverList.length; i++) {
	var serverTitle = serverList[i]['title'] || "";
	Ti.API.log('', 'server TITLE::'+serverTitle+' url:'+serverList[i]['url']);
  	if (serverTitle !== "" && !Configuration[serverTitle]){
  		Configuration[serverTitle] = {};
  		Configuration[serverTitle]['url'] = serverList[i]["url"];
  		Configuration[serverTitle]["visible"] = true;
  	}
}
}

