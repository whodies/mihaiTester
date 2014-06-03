var donationsPage = {
    container:function(){
        return $('#donationsPage');
    },
    init:function(){
        this.setList();
    },
    messageDetailsEvents:function(){
        var container = this.container();
        $('a' , container).click(function(){
            $('#message_details').fadeOut(300 , function(){
                $('h2 #goBack').hide();
                $('ul' , container).fadeIn();
            });
        });
    },
    getList:function(callback){
        var serviceURL = coinz.serverUrl+'get_donations.php';
        $.getJSON(serviceURL,function(data) {
            callback(data);
        });
    },
    sortList:function(data){
        var serviceURL = coinz.serverUrl+'get_donations.php';
        $.getJSON(serviceURL,function(data) {
            callback(data);
        });
    },
    appendList:function(data){
        var self = this;
        $(".donations_list").empty();
        $.each(data, function(index,item) {
            var hebDate = item.heb_date;
            hebDate = hebDate.replace(/\\/g, '');
            var donationNote = item.donation_note;
            donationNote = donationNote.replace(/\\/g, '');

            var li = $("<li>" + "תרומה בתאריך" + " " + hebDate + " "
                + "בסך " +
                item.donation_sum + " " + 'ש"ח' + " " + donationNote + "</li>");
            self.container().find('.donations_list').append(li);
            $(li).click(function(){
                self.container().showMessage(item);
            });
        });
    },
    setList:function(){
        var self = this;
        this.getList(function(data){
            self.appendList(data);
        })
    }
};