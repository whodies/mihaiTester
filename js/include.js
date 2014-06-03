
document.addEventListener("deviceready", function(){
	alert('hello phonegap');
}, false);
var include = {
	callback:function(){
		
	},
	scriptGroups:{
		'lib':{
			'lib':[
			       'phonegap/cordova',
			       'PushNotification'],
			'lib/jquery':['jquery-1.11.0.min','jquery-ui-1.10.4.min',
			              'jquery.json-2.4','jquery.ui.touch-punch.min']
		},
		'app':{
			'app/pages':[
			             'main','splash','login','profile','register',
			             'donate','profile','reminders','msg','addReminder'
			],
			'app':[
			       'widgets/heb_date_select','coinz','pushNotify'
			]
		}
	},
	styles:['jquery.mobile-1.3.1.min','style', 'main' ,'footer','register',
	        'login','donate','msg','profile',
	        'profile/addReminder','profile/donations',
	        'profile/reminders'],
	loadScriptGroup:function(groupName , callback){
		var group_list = this.parseGroup(groupName);
		LazyLoad.js(group_list, function(){
			callback();
		});
	},
	parseGroup:function(groupName){
		var dirs = this.scriptGroups[groupName];
		var list = [];
		for(var dir in dirs) { 
			var files = dirs[dir];
			for(var file_index in files) {
				var file = files[file_index];
				dir = dir=='[root]' ? '':dir;
				var src = '../js/' + dir + '/' + file + '.js';
				list.push(src);
			};
		};
		return list;
	},
	addStyles:function(){
		list = [];
		var self = this;
		for(var style_index in this.styles) { 
			var file = self.styles[style_index];
			var src = "../css/" + file + '.css';
			list.push(src);
		};
		LazyLoad.css(list);
	},
	addScripts:function(callback){
		var self = this;
		self.loadScriptGroup('lib', function(){
			self.loadScriptGroup('app' , function(){
				if (typeof(callback)=='function'){
					callback();
				}
			});
		});
	},
	isMobile:function(){
		var isMobile = ( /Android|webOS|iPad|iPod|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
		return isMobile;
	},
	isApple:function(){
		var isMobile = ( /iPad|iPod|iPhone/i.test(navigator.userAgent) );
		return isMobile;
	},
	removeCordova:function(){
		delete this.scriptGroups.lib['lib'];
	},
	execute:function(callback){
		var self = this;
		if(!self.isMobile()) {
		//	self.removeCordova();
		}
		this.addStyles();
		this.addScripts(function(){
			coinz.init();
			callback();
		});
	}
};
