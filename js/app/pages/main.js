var mainPage = {
    container:function(){
        return $('#main');
    },
    init:function(){
        $("#beitChabadLabel").html(coinz.getUser().beit_chabad_site);
        //$("#hebcalDate").append (mainPage.getDate() + " ," );
        $("#yom_yom_text").append(localStorage.getItem("Coinz_YomYom"));
    },
    getDate:function(){
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
       return(curr_date + "/" + curr_month + "/" + curr_year);
    }
}