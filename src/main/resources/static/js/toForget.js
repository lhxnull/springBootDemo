
/*---------------表单验证------------------start*/
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
            }
        },

        //这个方法只有0.45版本才能有效。
        //邮箱去做后台唯一性校验
        submitHandler: function (validator, form, submitButton) {
            var $email = $("#userEmail").val();
            $.ajax({
                url: path + "/anon/validateEmail.do",
                type: "post",
                async: false,
                data: {
                    "userEmail": $email
                },
                success: function (responseText) {
                    //因为后台成功之后会做重定向跳转，导致这个信息显示时间太短，所以成功页面让我直接放在了重定向页面展示。
                    // validator.defaultSubmit();
                    // activationHints("请到您指定的邮箱完成重置密码操作");
                    if(responseText == "hasEmail"){
                        validator.defaultSubmit();
                    }else {
                        activationHints("您的邮箱并没有注册过，请注册");
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


/*---------------表单验证------------------end*/
