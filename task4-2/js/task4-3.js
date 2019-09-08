
//数据读取    
var data = JSON.parse(sessionStorage.getItem("allMsg")); //读取保存总人数的数据
var scene = JSON.parse(sessionStorage.getItem("scene")); //读取杀手还是投票识别
var d = JSON.parse(sessionStorage.getItem("d")); //读取天数
var killx = JSON.parse(sessionStorage.getItem("killx")); //杀手被杀的人数
var flat = JSON.parse(sessionStorage.getItem("flat")); //平民被杀的人数
console.log("杀手死亡人数：", killx);
console.log("平民死亡人数：", flat);
var killko = JSON.parse(sessionStorage.getItem('killko')); //杀手杀死的玩家数据
var vote = JSON.parse(sessionStorage.getItem('vote')); //投票杀死的玩家数据
console.log("总人数", data);
console.log("杀手数组下标", killko);
console.log("投票数组下标", vote);
//页面渲染
//剩余玩家
$("#kier").text(Number(data.killerNum - killx));
$("#plbs").text(Number(data.plebsNum - flat));
//胜利标题
if (scene == 1) {
    $("#title").text("杀手胜利");
} else {
    $("#title").text("平民胜利");
}
var number = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
for (let i = 0; i < d; i++) { //循环克隆身份块
    let dayss = number[i + 2];
    $(".day").eq(i).clone().appendTo("#hy");
    $(".time").eq(i+1).text("第" + dayss + "天");
}

//给每天插入当天的游戏结果
for (var i = 0; i <= d; i++) {
    $(".night").eq(i).text("晚上： " + (killko[i] + 1) + "号被杀手杀死，" + (killko[i] + 1) + "号是" + data.playerArr[killko[i]]);
    if ((vote[i] + 1)) { //当杀手杀人事件结束游戏时晚上为空，空字符串为false  
        $(".timt").eq(i).text("白天： " + (vote[i] + 1) + "号被全民投票投死，" + (vote[i] + 1) + "号是" + data.playerArr[vote[i]]);
    } else {
        $(".timt").eq(i).text("白天未进行游戏，出局玩家为空");
    }

}

$(".over").click(function(){ //结束游戏   
    var o = confirm("再来一局，GO!");
    if (o == true) {
        sessionStorage.clear();//删除所有数据
        window.location.href = "../jstask2/task2-1.html";
    }

});