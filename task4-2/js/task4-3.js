var kier = document.getElementById("kier"), //杀手剩余人数
    plbs = document.getElementById("plbs"), //平民剩余人数
    title = document.getElementById("title"), //胜利节点
    hy = document.getElementById("hy"), //内容节点
    day = document.getElementsByClassName("day"), //盒子节点
    time = document.getElementsByClassName("time"), //天数节点
    night = document.getElementsByClassName("night"), //晚上被杀身份  
    timt = document.getElementsByClassName("timt"); //白天被投身份



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
kier.innerHTML = Number(data.killerNum - killx);
plbs.innerHTML = Number(data.plebsNum - flat);
//胜利标题
if (scene == 1) {
    title.innerHTML = "杀手胜利";
} else {
    title.innerHTML = "平民胜利";
}

var number = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
for (let i = 0; i < d; i++) { //循环克隆身份块
    let dayss = number[i + 2];

    var cln = day[0].cloneNode(true); //设置返回所有子节点
    hy.appendChild(cln); //添加克隆的节点
    time[i + 1].innerHTML = "第" + dayss + "天";

}

//给每天插入当天的游戏结果
for (var i = 0; i <= d; i++) {

    night[i].innerHTML = "晚上： " + (killko[i] + 1) + "号被杀手杀死，" + (killko[i] + 1) + "号是" + data.playerArr[killko[i]];

    if ((vote[i] + 1)) { //当杀手杀人事件结束游戏时晚上为空，空字符串为false  
        timt[i].innerHTML = "白天： " + (vote[i] + 1) + "号被全民投票投死，" + (vote[i] + 1) + "号是" + data.playerArr[vote[i]];
    } else {
        timt[i].innerHTML = "白天未进行游戏，出局玩家为空";
    }

}



function over() { //结束游戏
    var o = confirm("再来一局，GO!");
    if (o == true) {
        sessionStorage.clear();//删除所有数据
        window.location.href = "../jstask2/task2-1.html";
    }

}

