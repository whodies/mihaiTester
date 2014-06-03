var pushNotify = {
	plugin:null,
	config:{
		projectid: "4234860331", 
		appid : "23D51-53C15"
	},
	init:function() {
		var pushNotification = window.plugins.pushNotification;
		 
	    pushNotification.onDeviceReady({ projectid: "4234860331", appid : "23D51-53C15" });
		/*
		var self = this;
		var exists  = (typeof(window.plugins)!='undefined' && typeof(window.plugins.pushNotification)!='undefined');
		if (exists){
			this.plugin = window.plugins.pushNotification;
			this.register(function(){
				self.setTags();
			});
		}
		*/
	},
	register:function(callback){
		var self = this;
		var pushNotification = window.plugins.pushNotification;
		console.log(cordova);
		console.log(cordova);
		pushNotification.registerDevice(this.config,
			function(token) {
				alert('REGISTER');
				alert(token);
				callback();
			},
			function(error_status , status_code , status_message) {
				alert('error registering pushnotify');
				alert(error_status);
				alert(status_code);
				callback();
			}
		)
	},
	setTags:function(){
		var user_id = coinz.getUserId();
		var tags = {'coinz_user_id':user_id};
		this.plugin.setTags( tags,
            function(status) {
                console.log('setTags success');
            },
            function(status) {
            	console.log('setTags failed');
            }
		);
	}	
}