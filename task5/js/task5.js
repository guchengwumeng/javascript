var xhr = new XMLHttpRequest();



$("button").click(function () {

    name = $("#one").val();
    pwd = $("#two").val();


    // xhr.open('GET','http://dev.admin.carrots.ptteng.com',true);

    // xhr.send(name,pwd);

    // nreadystatechange=function(){
    // alert();
    // if (xhr.readyState === 4){
    //     if (xhr.status === 200){
    //       console.log(xhr.responseText);
    //     } else {
    //       console.error(xhr.statusText);
    //     }
    //   }

    // }
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://dev.admin.carrots.ptteng.com',
        //服务器返回的数据类型
        dataType: 'json',
        //发送到服务器的数据
        data: {
            name,
            pwd
        },
        //请求成功执行
        success: function () {

            window.location.href = "http://dev.admin.carrots.ptteng.com/";
        },
        //请求失败执行
        error: function () {
            $("p").text("无此用户")

        }




    });

    console.log(name);
    console.log(pwd);

});