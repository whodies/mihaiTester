var registerForm = {
    container:function(){
        return $('#register');
    },
    init:function(){
        this.termsEvent();
        this.loginEvent();
        this.loadList();
        this.setSubmitEvent();
    },
    setSubmitEvent:function(){
        var self = this;
        $("#registerFormOne").on("submit", function(event){
            event.preventDefault();
            var form = $(this);
            var ajax_data = coinz.dataFromForm(form);
            var validForm = self.validate(ajax_data);
            if (validForm){
                self.submit(ajax_data);
            };
        });
    },
    termsEvent:function(){
        $("#goToTerms").click(function(){
            $('#register').fadeOut(300 , function(){
                $('#appterms').fadeIn(300 , function(){
                   $("#appterms a").one('click' , function(){
                       $('#appterms').fadeOut(300 , function(){
                          $('#register').fadeIn(300);
                       });
                   });
                });
            });
        });
    },
    loginEvent:function(){
        $("#goToLogin").click(function(){
            coinz.goTo('login.html');
        });
    },
    loadList:function(){
        var selobj = $('select#owner_beit_chabad');
        var url = coinz.serverUrl+'get_beit_chabad_sites.php';
        var nameattr = 'beit_chabad_site';
        $.getJSON(url,{},function(sites_data)
        {
            $.each(sites_data, function(i,site_data){
                var site_name = site_data.site_name;
                var site_id = site_data.site_id;
                var option = "<option value='" + site_id + "'>" + site_name + "</option>";
                $(selobj).append(option);
            });
        });
    },
    validEmail:function(email){
        atpos = email.indexOf("@");
        dotpos = email.lastIndexOf(".");
        var valid_email = !(atpos < 1 || ( dotpos - atpos < 2 ));
        return valid_email;
    },
    validate:function(formData){
        var valid_terms = (formData.terms == 'on');
        var valid_email = this.validEmail(formData.email);
        var valid_beit_chabad = formData.beit_chabad_id>0;
        if (valid_terms){
            if (valid_email){
                if (valid_beit_chabad){
                     return true;
                } else {
                    alert("אנא בחר את שם המוסד");
                }
            } else {
                alert("אנא הכנס כתובת אימייל תקינה");
            }
        } else {
            alert("אנא אשר את תנאי השירות");
        }
        return false;
    },
    submit:function(ajax_data){
        this.register(ajax_data , function(user){
            coinz.setUser(user);
            alert("פרטיך נקלטו בהצלחה! האפליקציה מוכנה לשימוש. מנהל המוסד יצור איתך קשר בימים הקרובים לאימות הפרטים")
            coinz.goTo('main.html');
        });
    },
    register:function(userForm,callBack){
        $.ajax({
            url: coinz.serverUrl+'register.php',
            dataType:'json',
            data: userForm,
            success:function(response){
                if (typeof(response.error)=='string'){
                    if (response.error=='Email exists'){
                        alert('כתובת האימייל כבר קיימת במאגר, נסה שנית או בצע כניסה אם הינך רשום');
                    }
                } else {
                    var userDB = response;
                    callBack(userDB);
                }

            }
        });
    }
};