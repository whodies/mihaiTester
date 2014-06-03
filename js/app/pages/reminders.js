var remindersPage = {
    container:function(){
        return $('#remindersPage');
    },
    init:function(){
        this.setList();
    },
    getList:function(callback){
        var serviceURL = coinz.serverUrl+'get_reminders.php';
        $.getJSON(serviceURL,function(data) {
            callback(data);
        });
    },
    appendList:function(data){
    	alert("appending list");
        if(data!=''){
            $(".no_reminders_text").hide();
        } else {
            $(".no_reminders_text").show();
        }
        var self = this;
        var item_list = self.container().find('.reminders_list');
        $.each(data, function(index,item) {
            self.addItem(item_list , index , item);
        });
    },
    addItem:function(item_list , index , item){
        var self = this;
        alert("adding item");
        var reminder_item = $("<li><div class='remove'>X</div>" + item.reminder_heb + " "  + item.heb_type  + "</li>");
        item_list.append(reminder_item);
        $('.remove' , reminder_item).click(function(){
            self.removeFromDB(item.reminder_id , function(){
                self.removeFromList(reminder_item);
            });
        });
    },
    removeFromDB:function(reminder_id , callback){
        $.ajax({
            url: coinz.serverUrl+'remove_reminder.php',
            data: {reminder_id:reminder_id},
            success:function(){
                callback();
            }
        })
    },
    removeFromList:function(item){
        console.log(item);
        $(item).slideUp(200 , function(){
            item.remove();
        })
    },
    setList:function(){
        var self = this;
        this.getList(function(data){
            self.appendList(data);
        })
    }
};