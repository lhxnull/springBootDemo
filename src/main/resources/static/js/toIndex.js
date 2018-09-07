/*----------------------表单验证以及提交表单----------------------start*/
$(function () {
    //点击图片换一张验证码
    // $("#captcha").click(function () {
    //     $(this).attr("src", path + "/anon/getGifCode?time=" + new Date().getTime());
    // });
    $("#btndiv .btn").click(function(){
        alert($(this).button.val());
    });

    // function activationHints(content) {
    //     swal({
    //         title: '激活提示',
    //         html: $('<div>')
    //             .addClass('some-class')
    //             .text(content),
    //         animation: false,
    //         customClass: 'animated tada'
    //     });
    // }
});
