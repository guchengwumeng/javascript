var data = JSON.parse(sessionStorage.getItem("allMsg")); //读取保存的数据
console.log(data);
var killko = JSON.parse(sessionStorage.getItem('killko')); //杀手杀死的玩家数据
var vote = JSON.parse(sessionStorage.getItem('vote')); //投票杀死的玩家数据
console.log('被投票的下标：', vote);
console.log('杀手杀人下标：', killko);
var killx = JSON.parse(sessionStorage.getItem("killx")) || 0; //杀手被杀的人数
var flat = JSON.parse(sessionStorage.getItem("flat")) || 0; //平民被杀的人数
console.log("杀手死亡人数：", killx);
console.log("平民死亡人数：", flat);
var day = 0;
//天数数组
var number = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    var days = number[1]; //初始天数
    $(".preae").eq(day).text("第" + days + "天");
   
console.log();

var state = sessionStorage.state || "killOne"; //得到状态后赋值给init：state
var log = console.log;
if (vote !== null) {
    //克隆节点
    var d = vote.length;
    for (let i = 0; i < d; i++) {
        let dayss = number[i + 2]; //设置克隆天数数组位置
        $(".fate").eq(i).clone().appendTo("#hy");
        $(".boxtxt").eq(i).clone().appendTo("#hy");
        $(".preae").eq(i + 1).text("第" + dayss + "天");//插入天数
        $(".boxtxt").eq(i).hide();//隐藏
    }
} else {
    d = 0;
}

sessionStorage.setItem("d", d);
console.log("天数：", d);

var x = sessionStorage.getItem("x") || 0; //杀手点击事件控制被杀人的身份盒子显示
var y = sessionStorage.getItem("y") || 0; //投票点击事件控制被投人的身份盒子显示
log("x:", x);
log("y:", y);

for (let i = 0; i < x; i++) { //跳转回本页面，改变杀手按钮颜色

    $(".kill").eq(i).css({ "backgroundColor": "#C0C0C0"}); //杀手按钮节点
    $(".bekill").eq(i).css({ "display": "block"}); //杀手杀死身份节点
    $(".bekill").eq(i).text(killko[i] + 1 + "号被杀死，真实身份是" + data.playerArr[killko[i]])
    $(".one").eq(i).css({ "borderRight": "12px solid #C0C0C0"}); //杀手小三角

}

for (let i = 0; i < y; i++) { //跳回本页面，改变投票按钮颜色
    $(".the").eq(i).css({ "backgroundColor": "#C0C0C0"});//全民投票节点
    $(".four").eq(i).css({ "borderRight": "12px solid #C0C0C0"}); //全民小三角
    $(".ghost").eq(i).css({"backgroundColor": "#C0C0C0" }); //亡灵按钮
    $(".two").eq(i).css({"borderRight": "12px solid #C0C0C0"});//亡灵小三角 
    $(".make").eq(i).css({"backgroundColor": "#C0C0C0"});//玩家发言节点
    $(".three").eq(i).css({"borderRight": "12px solid #C0C0C0"});//玩家小三角
    $(".bethro").eq(i).css({ "display": "block"}); //杀手杀死身份节点
    $(".bethro").eq(i).text(vote[i] + 1 + "号被杀死，真实身份是" + data.playerArr[vote[i]])

}

//创建一个有限状态机
var fsm = new StateMachine({
    //当前状态
    init: state,
    //状态转换
    transitions: [{
            name: 'kill',
            from: 'killOne',
            to: 'ghostTwo',
        },
        {
            name: 'ghost',
            from: 'ghostTwo',
            to: 'makeThree',
        },
        {
            name: 'make',
            from: 'makeThree',
            to: 'theFour',
        },
        {
            name: 'the',
            from: 'theFour',
            to: 'killOne',
        },
    ],
    methods: {
        onInvalidTransition: function (transition, from, to) { //执行错误处理
            switch (from) {
                case "killOne":
                    alert("请按照游戏顺序，杀手杀人！");
                    break;
                case "ghostTwo":
                    alert("请按照游戏顺序，亡灵发言！");
                    break;
                case "makeThree":
                    alert("请按照游戏顺序，玩家发言！");
                    break;
                case "theFour":
                    alert("请按照游戏顺序，全民投票！");
                    break;
            }
        },
        //ON后首字母必须为大写
        onKill: function () { //进入状态时执行
            log('状态：', fsm.state);
            sessionStorage.setItem('state', fsm.state);
            let scene = 1; //设置页面跳转时是杀手还是投票的识别
            sessionStorage.setItem("scene", JSON.stringify(scene));
            window.location.href = "../jstask4/task4-2.html";
        },
        onGhost: function () { //进入状态时执行
            sessionStorage.setItem('state', fsm.state);
            alert("亡灵发表遗言");
            log('状态：', fsm.state);
        },
        onMake: function () { //进入状态时执行
            sessionStorage.setItem('state', fsm.state);
            alert("玩家依次发言");
            log('状态：', fsm.state);
        },
        onThe: function () { //进入状态时执行
            log('状态：', fsm.state);
            sessionStorage.setItem('state', fsm.state);
            let scene = 2;
            sessionStorage.setItem("scene", JSON.stringify(scene));
            window.location.href = "../jstask4/task4-2.html";
        }

    },


});
log("状态：",fsm.state);


if (fsm.state == 'makeThree'|| fsm.state == 'theFour') {
    for (let i = 0; i <= d; i++) {
        log("1",fsm.state);
        $(".ghost").eq(i).css({"backgroundColor": "#C0C0C0" }); //亡灵按钮
        $(".two").eq(i).css({ "borderRight": "12px solid #C0C0C0"}); //亡灵小三角 

    }
}

if (fsm.state == 'theFour') {
    for (let i = 0; i <= d; i++) {
        $(".make").eq(i).css({
            "backgroundColor": "#C0C0C0"
        }); //玩家发言节点
        $(".three").eq(i).css({
            "borderRight": "12px solid #C0C0C0"
        }); //玩家小三角

    }

}

for (let i = 0; i <= d; i++) {
  
    $(".fate").eq(i).click(function () {//给所有的天盒子添加点击事件
        $(".boxtxt").eq(i).toggle("slow", "swing"); //隐藏/显示切换
    });
    $(".kill").eq(i).click(function () {
        if (i == d) {
            fsm.kill();          
            log('状态：', fsm.state);
        } else {
            alert("请按顺序进行！");
        }     
    });

    $(".ghost").eq(i).click(function () {
        if (i == d) {
            fsm.ghost();
            $(".ghost").eq(i).css({"backgroundColor": "#C0C0C0" }); //亡灵按钮
            $(".two").eq(i).css({ "borderRight": "12px solid #C0C0C0"}); //亡灵小三角
            console.log("状态：", fsm.state);
        } else {
            alert("请按顺序进行！");
        }
    });

    $(".make").eq(i).click(function () {
        if (i == d) {
            fsm.make();
            $(".make").eq(i).css({
                "backgroundColor": "#C0C0C0"
            }); //玩家发言节点
            $(".three").eq(i).css({
                "borderRight": "12px solid #C0C0C0"
            }); //玩家小三角
            console.log("状态：", fsm.state);
        } else {
            alert("请按顺序进行！");
        }
    });

    $(".the").eq(i).click(function () {
        if (i == d) {
            fsm.the();
        } else {
            aolert("请按顺序进行！");
        }
    });
 
}

$(".over").click(function () { //结束游戏  
    var o = confirm("确立离开游戏吗？");
    if (o == true) {
        sessionStorage.clear(); //删除所有数据
        window.location.href = "../jstask2/task2-1.html";
    }

});


$(".daily").click(function () { //法官日志
    if (killko != null) {
        let scee = 2;
        sessionStorage.setItem("scee", JSON.stringify(scee));
        window.location.href = "../jstask3/task3-2.html";
    } else {
        alert("请至少完成一次杀人，在查看日志！")
    }
});