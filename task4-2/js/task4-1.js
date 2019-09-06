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
var aa = JSON.parse(sessionStorage.getItem("aa")) || 0; //点击事件变量
console.log('点击事件变量：', aa);
var day = 1;
//天数数组
var number = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
if (day) { //插入天数
    let days = number[1]; //初始天数
    $(".preae")[0].innerHTML = "第" + days + "天";

}

var hy = $("#hy"), //要被克隆的父节点
    fate = $(".fate"), //天数盒子节点
    preae = $(".preae"), //天数节点
    boxtxt = $(".boxtxt"), //事件动作盒子节点
    kill = $(".kill"), //杀手按钮节点
    one = $(".one"), //杀手小三角
    bekill = $(".bekill"), //杀手杀死身份节点
    ghost = $(".ghost"), //亡灵节点
    two = $(".two"), //亡灵小三角
    make = $(".make"), //玩家发言节点
    three = $(".three"), //玩家小三角
    the = $(".the"), //全民投票节点
    four = $(".four "), //全民小三角
    bethro = $(".bethro"); //投死身份节点

if (vote != null) {

    var d = vote.length;
    for (let i = 0; i < d; i++) {
        let dayss = number[i + 2]; //设置克隆天数数组位置
        var tian = $(".fate")[0].cloneNode(true);
        $("#hy")[0].appendChild(tian); //克隆天数盒子
        var bot = $(".boxtxt").cloneNode(true);
        $("#hy")[0].appendChild(bot); //克隆四个事件按钮父盒子

        $(".preae")[i + 1].innerHTML = "第" + dayss + "天"; //插入天数
        // boxtxt[i].classList.add("display"); //给事件动作盒子节点添加隐藏样式的类
        $(".boxtxt")[i].style.display = 'none';

    }
} else {
    d = 0;
}

sessionStorage.setItem("d", d);
console.log("天数：", d);
for (let i = 0; i <= d; i++) { //给所有的天盒子添加点击事件
    $(".fate")[i].onclick = function () {


        if ($(".boxtxt")[i].style.display === 'none') { //注意 这里必须加上至少二个等号  加一个等号if的条件会永远都是true，因为此时list[i].style.display = 'none' 就相当于一个非空的字符串 所以永远为true；
            $(".boxtxt")[i].style.display = 'flex'; // 加上二个以上的等号 list[i].style.display === 'none' 这句话的判断才转为 list[i].style.display是否等于none  ，并且左右两边要求都要是字符串 才为true    
        } else {
            $(".boxtxt")[i].style.display = 'none';
        }

        //  另一种方法：
        // boxtxt[i].classList.toggle("display"); //给事件动作盒子节点移除隐藏样式的类
    }

}
var x = sessionStorage.getItem("x") || 0; //杀手点击事件控制被杀人的身份盒子显示
var y = sessionStorage.getItem("y") || 0; //投票点击事件控制被投人的身份盒子显示


for (let i = 0; i < x; i++) { //跳转回本页面，改变杀手按钮颜色

    kill[i].style.backgroundColor = "#C0C0C0"; //杀手按钮节点
    bekill[i].style.display = "block"; //杀手杀死身份节点
    bekill[i].innerHTML = +killko[i] + 1 + "号被杀死，真实身份是" + data.playerArr[killko[i]];

    one[i].style.borderRight = "12px solid #C0C0C0"; //杀手小三角
}

for (let i = 0; i < y; i++) { //跳回本页面，改变投票按钮颜色

    the[i].style.backgroundColor = "#C0C0C0"; //全民投票节点
    four[i].style.borderRight = "12px solid #C0C0C0"; //全民小三角
    bethro[i].style.display = "block"; //投死身份节点  
    bethro[i].innerHTML = +vote[i] + 1 + "号被杀死，真实身份是" + data.playerArr[vote[i]];
    ghost[i].style.backgroundColor = "#C0C0C0"; //亡灵按钮
    two[i].style.borderRight = "12px solid #C0C0C0"; //亡灵小三角   
    make[i].style.backgroundColor = "#C0C0C0"; //玩家发言节点
    three[i].style.borderRight = "12px solid #C0C0C0"; //玩家小三角
}
var t = d + 1;
if (aa == 2 || aa == 3) {
    for (let i = 0; i < t; i++) {
        ghost[i].style.backgroundColor = "#C0C0C0"; //亡灵按钮
        two[i].style.borderRight = "12px solid #C0C0C0"; //亡灵小三角   
    }
}

if (aa == 3) {
    for (let i = 0; i < t; i++) {
        make[i].style.backgroundColor = "#C0C0C0"; //玩家发言节点
        three[i].style.borderRight = "12px solid #C0C0C0"; //玩家小三角
    }

}


var fsm = new StateMachine({

    init: 'kill',

    transitions: [{
            name: "stepone",
            from: "kill",
            to: "ghost"
        },
        {
            name: "steptwo",
            from: "ghost",
            to: "make"
        },
        {
            name: "stepthree",
            from: "make",
            to: "the"
        },
        {
            name: "stepfour",
            from: "the",
            to: "kill"
        },
    ],

    methods: {

        onInvalidTransition: function ( from) { //执行错误处理
            switch (from) {
                case "kill":
                    alert("请按照游戏顺序，杀手杀人！");
                    break;
                case "ghost":
                    alert("请按照游戏顺序，亡灵发言！");
                    break;
                case "make":
                    alert("请按照游戏顺序，玩家发言!");
                    break;
                case "the":
                    alert("请按照游戏顺序，全民投票!");
                    break;
            }
        },
        onStepone: function () { //进入状态时执行
            aa = aa + 1;
            sessionStorage.setItem("aa", JSON.stringify(aa));
            window.location.href = "../jstask4/task4-2.html";

        },
        onSteptwo: function () { //进入状态时执行

            alert("亡灵发表遗言");
            aa = aa + 1;
            $(".ghost").eq(d).css({
                "backgroundColor": "#C0C0C0"
            });
            $(".two").eq(d).css({
                "borderRight": "12px solid #C0C0C0"
            });
            sessionStorage.setItem("aa", JSON.stringify(aa));
        },
        onStepthree: function () { //进入状态时执行
            alert("玩家依次发言");
            aa = aa + 1;
            $(".make").eq(d).css({
                "backgroundColor": "#C0C0C0"
            });
            $(".three").eq(d).css({
                "borderRight": "12px solid #C0C0C0"
            });
            sessionStorage.setItem("aa", JSON.stringify(aa));
        },
        onStepfour: function () { //进入状态时执行
            aa = 0;
            sessionStorage.setItem("aa", JSON.stringify(aa));
            window.location.href = "../jstask4/task4-2.html";

        }

    }


});

for (let i = 0; i <= d; i++) {
    console.log(i);
    $(".kill").eq(i).click(function () {
        fsm.stepone();

    });
    $(".ghost").eq(i).click(function () {

        fsm.steptwo();

    });

    $(".make").eq(i).click(function () {

        fsm.stepthree();

    });
    $(".the").eq(i).click(function () {

        fsm.stepfour();

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