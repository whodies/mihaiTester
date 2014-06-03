var coinz = {
    serverUrl:'http://bit2bemobile.co.nf/pushkeBietChabad/server/actions/',
    init:function(){
    	var self = this;
    	self.goToEvent();
        self.initFooter();
        self.setDynamicHeight();
        self.showPage();
        var user = this.getUser();
        if (typeof(user)!='undefined'){
        	pushNotify.init();
        }
    },
    autoLogin:function(callback){
    	var userData = this.getUser();
    	if (userData!=false){
    		$.ajax({
                url: coinz.serverUrl+'login.php',
                dataType:'json',
                data: userData,
                success:function(response){
                	if (response!=false){
                		coinz.setUser(response);
                	} else {
                		coinz.removeUser();
                	}
                	callback();
                }
            })
    	} else {
    		callback();
    	}
    },
    showPage:function(){
        $('.coinzPage').fadeIn();
    },
    hidePage:function(callback){
        $('.coinzPage').fadeOut(300 , function(){
            callback();
        });
    },
    setDynamicHeight:function(){
      $('.dynamic_height').each(function(){
         var item = $(this);
         var dynamic_height = $(window).height();
         item.siblings(':visible').each(function(){
             dynamic_height-=$(this).outerHeight(true);
         });
         item.height(dynamic_height);
      });
    },
    goTo:function(url){
        this.hidePage(function(){
            window.location = url;
        });
    },
    goToEvent:function(){
        var self = this;
        $('.goToLink').each(function(){
           var href_str = $(this).attr('href');
           if (window.location.href.indexOf(href_str)!=-1){
               $(this).addClass('active');
           }
        });
        $('.goToLink').click(function(e){
            e.preventDefault();
            var url = $(this).attr('href');
            self.goTo(url);
        })
    },
    initFooter:function(){
        $('#footer a').click(
            function(){
                $(this).addClass('active');
            },
            function(){
                $(this).removeClass('active');
            }
        )
    },
    dataFromForm:function(form){
        var return_data = {};
        var raw_data = $(form).serializeArray();
        $(raw_data).each(function(){
            return_data[this.name] = this.value;
        });
        return return_data;
    },
    getUser:function(){
        var user = localStorage.getItem("user");
        if (typeof(user)=='string'){
        	user = JSON.parse(user);
        } else {
        	user = false;
        }
        return user;
    },
    getUserId:function(){
    	var user = this.getUser();
    	return user.user_id;
    },
    setUser:function(data){
        var user = JSON.stringify(data);
        localStorage.setItem("user" , user)
    },
    removeUser:function(){
    	localStorage.removeItem("user");
    },
    queryUser:function(success , fail){
    	var self = this;
        $.ajax({
            type: "GET",
            dataType:'json',
            url: coinz.serverUrl + "get_user.php",
            success: function(user){
            	console.log(user);
                if(typeof(user.user_id)!='undefined'){
                	success(user);
                } else {
                	fail(user);
                }
            }});
    }
}