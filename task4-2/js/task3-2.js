
$(".return").click(function(){//返回

    window.location.href = "../jstask3/task3-1.html"
});

$(".stut").click(function(){//关闭
    var r = confirm("确定要离开游戏吗？"); //提示框//点击确认返回true跳转页面取消不执行代码留在本页面
    if (r == true) {
        sessionStorage.clear();//删除所有数据
        window.location.href = "../jstask2/task2-1.html";
    }
});

var data = JSON.parse(sessionStorage.getItem("allMsg")); //读取保存的数据
var scee = JSON.parse(sessionStorage.getItem("scee"));//读取法官台本页面跳转过来的判断数据 
var killko = JSON.parse(sessionStorage.getItem("killko")) || []; //读取杀手杀人的下标
var vote = JSON.parse(sessionStorage.getItem("vote")) || []; //读取全民投票的下标
console.log(data);

for (let i = 0; i < data.playerNum - 1; i++) { //循环克隆身份块    
$(".box").eq(i).clone().appendTo("#hy");   
}
//循环插入角色
for (let i = 0; i < data.playerNum; i++) {
$(".entity").eq(i).text(data.playerArr[i]);//插入身份
$(".seriai").eq(i).text(i+1);//给父节点的第二个子元素插入序号
   
}

if(scee==2){
    $("#title")[0].innerText="法官日记";
    $("#start")[0].innerText="返回游戏";
}

console.log('被投票的下标：', vote);
console.log('杀手杀人下标：', killko);

//页面一显示给被杀的盒子赋予颜色
if (killko) {
    for (let i = 0; i < killko.length; i++) {
   
        $(".box").eq(killko[i]).css({"backgroundColor":"#ff0000"});
     
    }
}
if (vote) {
    for (let i = 0; i < vote.length; i++) {
     
        $(".box").eq(vote[i]).css({"backgroundColor":"#ff0000"});
     
    }
}

$("#start").click(function(){
   
    window.location.href = "../jstask4/task4-1.html";
});