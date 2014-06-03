var messagePage = {
    container:function(){
        return $('#msgPage');
    },
    init:function(){
        this.populateLocation();
        this.setList();
        this.messageDetailsEvents();
    },
    populateLocation:function(){
        var location = coinz.getUser().beit_chabad_site;
        this.container().find('.location').html(location);
    },
    messageDetailsEvents:function(){
       var container = this.container();
       $('a' , container).click(function(){
            $('#message_details').fadeOut(500 , function(){
                $('h2 #goBack').hide();
                $('ul' , container).fadeIn();
            });
        });
    },
    getList:function(callback){
    	var Coinz_beitchabad = coinz.getUser().beit_chabad_site;
        var serviceURL = coinz.serverUrl+'get_note.php?beit_chabad=' + Coinz_beitchabad;
        $.getJSON(serviceURL,function(data) {
            callback(data);
        });
    },
    appendList:function(data){
        var self = this;
        $.each(data, function(index,item) {
            var li = $("<li>" + item.note_title + "</li>");
            self.container().find('.message_list').append(li);
            $(li).click(function(){
                self.showMessage(item);
            });
        });
    },
    setList:function(){
        var self = this;
        this.getList(function(data){
            self.appendList(data);
        })
    },
    showMessage:function(item){
        var container = this.container();
        $('img' , container).attr('src' , item.image_url);
        $('.title' , container).html(item.note_title);
        var textToShow = item.note;
        textToShow = textToShow.replace(/\\/g, '');
        $('.text' , container).html(textToShow);
        $('ul' , container).fadeOut(500 , function(){
           $('#message_details').fadeIn(500);
        });
        $('#goBack' , container).show();
    }
};