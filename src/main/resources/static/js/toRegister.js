/*表单验证以及提交------------------------start*/

$(function () {
    //bootstrap校验
    $('form').bootstrapValidator({
       message: 'This value is not valid',
       feedbackIcons: {
           valid: 'glyphicon glyphicon-ok',
           invalid: 'glyphicon glyphicon-remove',
           validating: 'glyphicon glyphicon-refresh'
       },
       fields: {
           userEmail: {
               message: '邮箱验证失败',
               validators: {
                   notEmpty: {
                       message: '邮箱不能为空'
                   },
                   emailAddress: {
                       message: '邮箱地址格式有误'
                   }
               }
           },
           userPassword: {
               message: '密码验证失败',
               validators: {
                   notEmpty: {
                       message: '密码不能为空'
                   },
                   stringLength: {
                       min: 6,
                       max: 12,
                       message: '密码长度必须在6到12位之间'
                   },
               }
           },
           userNickname: {
               message: '昵称验证失败',
               validators: {
                   notEmpty: {
                       message: '昵称不能为空'
                   },
                   stringLength: {
                       min: 2,
                       max: 15,
                       message: '昵称长度必须在2到15位之间'
                   },
               }
           },

       },

        //这个方法只有0.45版本才能有效。
        //邮箱去做后台唯一性校验
        submitHandler: function (validator, form, submitButton) {
            var $email = $("#userEmail").val();
            console.log($email);
            console.log("---------------------------");
            console.log(path);
            console.log("---------------------------");
            $.ajax({
                url: path + "/anon/validateEmail",
                type: "post",
                async: false,
                data: {
                    "userEmail": $email
                },
                success: function (responseText) {
                    console.log(responseText);
                    if (responseText == "noEmail") {
                        validator.defaultSubmit();
                        activationHints("请到您的邮箱完成注册");
                    } else {
                        activationHints("您的邮箱已经注册过");
                    }
                },
                error: function () {
                    activationHints("系统错误！");
                }
            });
        }
    });

    function activationHints(content) {
        swal({
            title: '激活提示',
            html: $('<div>')
                .addClass('some-class')
                .text(content),
            animation: false,
            customClass: 'animated tada'
        });
    }
});


/*表单验证以及提交------------------------end*/
