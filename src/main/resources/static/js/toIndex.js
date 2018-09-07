$(function () {
    // ajax请求
    $("#btndiv .btn").click(function(){
        $.ajax({
            url: path + "/article/getOneself",
            type: "post",
            async: false,
            data: {
                type:$(this).val()
            },
            success: function (responseText) {

            },
            error: function (response, ajaxOptions, thrownError) {
                console.log(response);
                console.log(ajaxOptions);
                console.log(thrownError);
                // sweetAlert("系统错误");
            }
        });
    });
    // $("#btndiv .btn").click(function(){
    //     // console.log($("input:radio[name='options']").val());
    //     //lert($('input:radio:checked').val());
    //     alert($(this).val());
    // });

    // function activationHints(content) {
    //     swal({
    //         title: '������ʾ',
    //         html: $('<div>')
    //             .addClass('some-class')
    //             .text(content),
    //         animation: false,
    //         customClass: 'animated tada'
    //     });
    // }
});
