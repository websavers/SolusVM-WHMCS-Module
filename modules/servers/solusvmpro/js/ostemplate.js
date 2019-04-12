$(function () {
    window.solusvmpro_ostemplate = function (vserverid, lang, token) {
        token = typeof token !== 'undefined' ? token : "";
        if (typeof vserverid === 'undefined') {
            return false;
        }
        
        var ajaxData = {
            vserverid: vserverid,
            modop: 'custom',
            a: 'ListOSTemplates',
            ajax: 1,
            ac: 'Custom_ListOSTemplates'
        };
        $.ajax({
            /*type: "POST",*/
            url: document.location.href + token,
            data: ajaxData,
            cache: false,
            dataType: 'json'/*,
             timeout: 2000*/
        }).done(function (data){
        
            var button = $('#changeostemplate');

            var dataMsg = '';
            if (data.hasOwnProperty("msg")) {
                dataMsg = data.msg;
            }

            var dataSuccess = false;
            if (data.hasOwnProperty("success")) {
                dataSuccess = data.success;
            }
            
            var templates_options = "";
            $.each(dataMsg, function (index, template){
              templates_options += "<option value='" + template.sysname + "'>" + template.name + "</option>\n";
            });
            
            $('select#newostemplate').append(templates_options); //insert to selection dropdown.
            
            $('#consequencesostemplate').click(function(){
                button.prop('disabled', false);
            });
            
            //showSuccessOrErrorMsg(dataSuccess, dataMsg);
/*
            button.html(lang['solusvmpro_change']);
            button.prop('disabled', false);
*/
        }).fail(function (jqXHR, textStatus) {
            //console.log(jqXHR);
            //console.log(textStatus);
        });
        
        $('#changeostemplate').on('click', function () {
            var button = $(this);
            var newostemplate = $('#newostemplate').val();
            newostemplate = newostemplate.trim();

            var msgSuccess = $('#osTemplateMsgSuccess');
            var msgError = $('#osTemplateMsgError');
            msgSuccess.hide();
            msgError.hide();
            var showSuccessOrErrorMsg = function(success, msg) {
                msgSuccess.hide();
                msgError.hide();
                if (success) {
                    msgSuccess.html(msg);
                    msgSuccess.show();
                } else {
                    msgError.html(msg);
                    msgError.show();
                }
            };
            if (newostemplate === '') {
                showSuccessOrErrorMsg(false, lang['solusvmpro_invalidOSTemplate']);
                return false;
            }

            button.html('<span class="glyphicon glyphicon-refresh spinning"></span> ' + lang['solusvmpro_change']);
            button.prop('disabled', true);
            var ajaxData = {
                vserverid: vserverid,
                modop: 'custom',
                a: 'ChangeOSTemplate',
                newostemplate: newostemplate,
                ajax: 1,
                ac: 'Custom_ChangeOSTemplate'
            };
            $.ajax({
                /*type: "POST",*/
                url: document.location.href + token,
                data: ajaxData,
                cache: false,
                dataType: 'json'/*,
                 timeout: 2000*/
            }).done(function (data) {

                var dataMsg = '';
                if (data.hasOwnProperty("msg")) {
                    dataMsg = data.msg;
                }

                var dataSuccess = false;
                if (data.hasOwnProperty("success")) {
                    dataSuccess = data.success;
                }

                showSuccessOrErrorMsg(dataSuccess, dataMsg);

                button.html(lang['solusvmpro_change']);
                button.prop('disabled', false);

            }).fail(function (jqXHR, textStatus) {
                //console.log(jqXHR);
                //console.log(textStatus);
            });
        });

        return true;
      
    }
});

