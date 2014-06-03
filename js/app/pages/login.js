var loginForm = {
    container:function(){
        return $('#login');
    },
    init:function(){
        this.registerEvent();
        this.setSubmitEvent();
    },
    registerEvent:function(){
        $("#goToRegister").click(function(){
            coinz.goTo('register.html');
        });
    },
    setSubmitEvent:function(){
        var self = this;
        $("#loginForm").on("submit", function(event){
            event.preventDefault();
            var form = $(this);
            var ajax_data = coinz.dataFromForm(form);
            var validForm = self.validate(ajax_data);
            if (validForm){
                self.submit(ajax_data);
            };
        });
    },
    validEmail:function(email){
        atpos = email.indexOf("@");
        dotpos = email.lastIndexOf(".");
        var valid_email = !(atpos < 1 || ( dotpos - atpos < 2 ));
        return valid_email;
    },
    validate:function(formData){
        var valid_email = this.validEmail(formData.email);
        if (!valid_email){
            alert('אנא הכנס כתובת אימייל תקינה');
        }
        return valid_email;
    },
    submit:function(data){
        this.login(data , function(user_data){
            coinz.setUser(user_data);
            coinz.goTo('main.html');
        });
    },
    login:function(userData,callBack){
        $.ajax({
            url: coinz.serverUrl+'login.php',
            dataType:'json',
            data: userData,
            success:function(response){
                var error_exists = typeof(response.error)=='string';
                error_exists ? alert('כניסה נכשלה') : callBack(response);
            }
        })
    }
}