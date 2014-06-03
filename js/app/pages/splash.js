var splashPage = {
    container:function(){
        return $('#splash');
    },
    setHeight:function(){
      var window_height = $(window).height();
      this.container().height(window_height);
    },
    data:{
        date:{},
        heb_date:{}
    },
    init:function(){
        var self = this;
        self.setHeight();
        coinz.autoLogin(function(){
        	self.setDate(function(){
                self.setHebDate(function(){
                    self.setText(function(){
                        self.redirect();
                    });
                });
            });
        });
    },
    setHebDate:function(callback){
        //Get the hebrew date and save to local storage
        var self = this;
        var dData = self.data.date;
        
        $.ajax({
            type: "GET",
            url: "http://www.hebcal.com/converter/",
            dataType:'json',
            data: "cfg=json"+"&gy="+dData.year+"&gm="+dData.month+"&gd"+dData.day+"&g2h=1",
            success: function(heb_date){
                var hebrew = heb_date.hebrew;
                var hebrewArray = hebrew.split(" ");
                var hebrewDay = hebrewArray[0];
                var hebrewMonthStart = hebrewArray[1];
                var hebrewMonthEnd = hebrewArray[2];
                if (hebrewMonthEnd.length > 2){
                    hebrewMonthEnd = "none";
                }
                hebrewDay = hebrewDay.replace(/״/g, '');
                hebrewMonthEnd = hebrewMonthEnd.replace(' \' ','');
                heb_date.texts = {hebrewDay:hebrewDay,hebrewMonthStart:hebrewMonthStart,hebrewMonthEnd:hebrewMonthEnd};
                self.data.heb_date = heb_date;
                callback();
            }
        });
    },
    setDate:function(callback){
        var self = this;
        //Get hebrew date today
        var currentTime = new Date();
        this.data.date.month = currentTime.getMonth() + 1;
        this.data.date.day = currentTime.getDate();
        this.data.date.year = currentTime.getFullYear();
        callback();
    },
    setText:function(callback){
        var self = this;
        var dData = self.data.heb_date;
        var ajax_data = {hday:dData.hd,hmonth:dData.hm}; 
        $.ajax({
            type: "GET",
            dataType:'json',
            url: coinz.serverUrl + "get_yom_yom.php",
            data: ajax_data,
            success: function(response){
                if(response!='yom yom not found.')    {
                    var stringData = JSON.stringify(response);
                    stringData = stringData.slice(17);
                    stringData = stringData.replace('"}]',"");
                    stringData = stringData.replace(/\\/g, '');
                    stringData = stringData.replace('r', '');
                    stringData = stringData.replace('n', '');
                    stringData = stringData.replace('"n', '');
                    stringData = stringData.replace('{', '');
                    stringData = stringData.replace('}', '');
                    localStorage.setItem("Coinz_YomYom",stringData);
                    callback();
                } else {
                    alert("Sorry, there is a problem in our service.");
                }
            }});
    },
    redirect:function(){
        setTimeout(function(){
        	var user_exists = typeof(localStorage.getItem("user")) == "string";
        	var page_url = (user_exists ? "main.html" : "register.html");
        	coinz.goTo(page_url);
        }, 1500);
    }
};