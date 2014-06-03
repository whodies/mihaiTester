var addReminderPage = {
    container:function(){
        return $('#addReminderPage');
    },
    init:function(){
        var container = this.container();
        this.typeEvent();
        this.submitEvent();
        this.populateSelection();
        $('#goBack' , container).show();
    },
    populateSelection:function(){
        this.populateYearly();
        this.populateDaily();
    },
    populateYearly:function(){
        var oneTimeSelect = $('#yearly');
        heb_date_select.apply(oneTimeSelect);
    },
    populateDaily:function(){
        this.populateHour();
        this.populateMinute();
    },
    populateHour:function(){
        var hourSelect = $('.hourSelect' , this.container());
        for (var i = 0; i <= 23; i++) {
            var str_val = i.toString();
            if (str_val.length==1){
                str_val = '0' + str_val;
            }
            var option = "<option value='" + i + "'>" + str_val + "</option>";
            hourSelect.append(option);
        }
        hourSelect.val(12);
    },
    populateMinute:function(){
        var minuteSelect = $('.minuteSelect' , this.container());
        for (var i = 0; i <= 59; i++) {
            var str_val = i.toString();
            if (str_val.length==1){
                str_val = '0' + str_val;
            }
            var option = "<option value='" + i + "'>" + str_val + "</option>";
            minuteSelect.append(option);
        }
    },
    addToDB:function(form_data , callBack){
        var form = this.container().find('form');

        $.ajax({
            url: coinz.serverUrl+'add_reminder.php',
            data: form_data,
            success:function(){
                console.log("added reminder to db");
                callBack();
            }
        })
    },
    typeEvent:function(){
        var container = this.container();
        var labels = $('#typeSelect label');
        labels.click(function(){
            labels.removeClass('checked');
            $(this).addClass('checked');
        });
        var type_select = $('input[name="type"]' , container);
        type_select.change(function(){
            var selected_type = $(this).val();
            form_options.removeClass('yearly_options').removeClass('weekly_options').removeClass('daily_options');
            form_options.addClass(selected_type + '_options');
        });
        var form_options = $('#formOptions' , container);
    },
    getReminderHeb:function(type){
        var visible_select = $('#formOptions select:visible' , this.container());
        var date_strings = {};
        visible_select.each(function(){
            var select = $(this);
            var option = $("option[value=" + select.val() + "]" , select);
            var title = option.html();
            date_strings[select.attr('name')] = title;
        });
        date_string = date_strings.hour+":"+date_strings.minutes
        switch (type){
            case 'yearly':
                date_string =
                       date_strings.month_day + " " +
                           'ב' +
                       date_strings.month + " " +
                           date_string
                           ;
                break;
            case 'weekly':
                date_string =
                    "יום"
                    + " " +
                    date_strings.week_day.trim() + " " +date_string;
                break;
        }
        return date_string;
    },
    submitEvent:function(){
        var self = this;
        var form = this.container().find('#formAddReminder');
        form.submit(function(e){
            e.preventDefault();
            var form_data = coinz.dataFromForm(form);
            form_data.reminder_heb =  self.getReminderHeb(form_data.type);
            self.addToDB(form_data , function(){
                coinz.goTo("reminders.html");
            });
            return false;
        })
    }
}