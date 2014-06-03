var donatePage = {
    container:function(){
        return $('#donatePage');
    },
    init:function(){
        this.initDragDrop();
        this.initMultiply();
        this.initOther();
    },
    initDragDrop:function(){
        var self = this;
        $('.coins img').each(function(){
           var value = $(this).attr('value');
           $(this).draggable({ revert: true });
        });
        $('.cashier').droppable({
           drop:function(event , ui){
               var coin = ui.draggable;
               var value = coin.attr('value');
               coin.stop();
               self.donate(value);
           }
        });
    },
    initMultiply:function(){
        var self = this;
        var form =  $('#multiplyForm');
        $('button' , form).click(function(){
           var input_val = $('input' , form).val();
           var value = input_val * 1.8;
            self.donate(value);
        });
    },
    initOther:function(){
        var self = this;
        var form =  $('#otherDonate');
        $('button' , form).click(function(){
            var value = $('input' , form).val();
            self.donate(value);
        });
    },
    addToDB:function(donationData , callBack){
        $.ajax({
            url: coinz.serverUrl+'add_donation.php',
            data: donationData,
            success:function(response){
                callBack();
            }
        })
    },
    getHebDate:function(callback){
        var self = this;
        var currentTime = new Date();
        var dData = {
            month:currentTime.getMonth() + 1,
            day:currentTime.getDate(),
            year:currentTime.getFullYear()
        }
        $.ajax({
            type: "GET",
            url: "http://www.hebcal.com/converter/",
            data: "cfg=json"+"&gy="+dData.year+"&gm="+dData.month+"&gd"+dData.day+"&g2h=1",
            dataType:'json',
            success: function(date_result){
                var heb_date = date_result.hebrew;
                callback(heb_date);
            }
        });
    },
    donate:function(donationSum){
        var self = this;
        this.getHebDate(function(heb_date){
            var donationNote = $("#donationNote").val();
            var donationData = {donation_sum:donationSum,donation_note:donationNote,heb_date:heb_date};
            if (confirm("אנא אשר תרומה בסך" + " " + donationSum + " " + 'ש"ח') == true) {
                self.addToDB(donationData , function(){
                    coinz.goTo("donations.html");
                });
            } else {
                //do noting
            }
        });
    },
    messageDetailsEvents:function(){
        var container = this.container();
        $('a' , container).click(function(){
            $('#message_details').fadeOut(300 , function(){
                $('h2 #goBack').hide();
                $('ul' , container).fadeIn();
            });
        });
    }
}


$(document).ready(function(){
    donatePage.init();
});