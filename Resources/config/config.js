/**
 * Config function
 */
(function() {
	var serverList = Ti.App.Properties.getList("serverConfig");
	
	//Default config
	var Configuration = {
		"Jenkins-Cot" : {
			"title": "Jenkins-Cot",
			"url" : "http://lcalink.dyndns.org/jenkins-cot/job/COT/rssAll",
			"visible":true
		},
		"Jenkins-Dashboards" : {
			"title": "Jenkins Dashboards",
			"url" : "http://lcalink.dyndns.org/jenkins-cot/job/LUCIA_BI_dashboards/rssAll",
			"visible":true
		},
		"Melinda" : {
			"title": "Melinda",
			"url" : "http://melinda.lcalink.com:8080/rssLatest",
			"visible":true
		},
		"Lobster" : {
			"title": "Lobster",
			"url" : "http://lobster.lcalink.com:8080/rssLatest",
			"visible":true
		},
		"error" : {
			"title": "error",
			"url" : "http://lcalink.dyndns.org/jenkins-cot/job/LUCIA_BI_dashboards/rssAll1111111111111111111111111111111",
			"visible":true
		},/*
		"Emiko" : {
			"title": "Emiko",
			"url" : "http://emiko.lcalink.com:8080/rssLatest",
			"visible":true
		},
		"Kaoru" : {
			"title": "Kaoru",
			"url" : "http://kaoru.lcalink.com:8080/rssLatest",
			"visible":true
		}*/
	};
	
	if (serverList !== null){
		for (var i=0; i < serverList.length; i++) {
			var serverTitle = serverList[i]["title"] || "";
			Ti.API.log("", "server TITLE::"+serverTitle+" url:"+serverList[i]["url"]);
		  	if (serverTitle !== "" && !Configuration[serverTitle]){
		  		Configuration[serverTitle] = {};
		  		Configuration[serverTitle]["title"] = serverList[i]["title"];
		  		Configuration[serverTitle]["url"] = serverList[i]["url"];
		  		Configuration[serverTitle]["visible"] = serverList[i]["visible"];
		  	}
		}
	}
	
	jenkins.config = Configuration;
})();