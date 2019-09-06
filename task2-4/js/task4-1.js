var hy = document.getElementById("hy"), //要被克隆的父节点
    fate = document.getElementsByClassName("fate"), //天数盒子节点
    preae = document.getElementsByClassName("preae"), //天数节点
    boxtxt = document.getElementsByClassName("boxtxt"), //事件动作盒子节点
    kill = document.getElementsByClassName("kill"), //杀手按钮节点
    one = document.getElementsByClassName("one"), //杀手小三角
    bekill = document.getElementsByClassName("bekill"), //杀手杀死身份节点
    ghost = document.getElementsByClassName("ghost"), //亡灵节点
    two = document.getElementsByClassName(" two"), //亡灵小三角
    make = document.getElementsByClassName("make"), //玩家发言节点
    three = document.getElementsByClassName("three"), //玩家小三角
    the = document.getElementsByClassName("the"), //全民投票节点
    four = document.getElementsByClassName("four "), //全民小三角
    bethro = document.getElementsByClassName("bethro"); //投死身份节点


// var x=0;
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
    preae[0].innerHTML = "第" + days + "天";

}


if (vote != null) {

    var d = vote.length;
    for (let i = 0; i < d; i++) {
        let dayss = number[i + 2]; //设置克隆天数数组位置
        var tian = fate[i].cloneNode(true);
        hy.appendChild(tian); //克隆天数盒子
        var bot = boxtxt[i].cloneNode(true);
        hy.appendChild(bot); //克隆四个事件按钮父盒子

        preae[i + 1].innerHTML = "第" + dayss + "天"; //插入天数
        // boxtxt[i].classList.add("display"); //给事件动作盒子节点添加隐藏样式的类
        boxtxt[i].style.display = 'none';

    }
} else {
    d = 0;
}

sessionStorage.setItem("d", d);
console.log("天数：", d);
for (let i = 0; i <= d; i++) { //给所有的天盒子添加点击事件
    fate[i].onclick = function () {


        if (boxtxt[i].style.display === 'none') { //注意 这里必须加上至少二个等号  加一个等号if的条件会永远都是true，因为此时list[i].style.display = 'none' 就相当于一个非空的字符串 所以永远为true；
            boxtxt[i].style.display = 'flex'; // 加上二个以上的等号 list[i].style.display === 'none' 这句话的判断才转为 list[i].style.display是否等于none  ，并且左右两边要求都要是字符串 才为true    
        } else {
            boxtxt[i].style.display = 'none';
        }

        //  另一种方法：
        // boxtxt[i].classList.toggle("display"); //给事件动作盒子节点移除隐藏样式的类
    }

}
// boxtxt[0].classList.contains("display");


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






for (let i = 0; i <= d; i++) {
    console.log(i);
    kill[i].onclick = function () {
        if (i == d) { //判断是否为当前执行的天数

            if (aa == 0) {
                // alert("杀手杀人");
                aa = aa + 1;
                sessionStorage.setItem("aa", JSON.stringify(aa));
                let scene = 1; //设置页面跳转时是杀手还是投票的识别
                sessionStorage.setItem("scene", JSON.stringify(scene));
                window.location.href = "../jstask4/task4-2.html";

            } else if (aa == 1) {
                alert("请按照游戏顺序，亡灵先发言！");

            } else if (aa == 2) {
                alert("请按照游戏顺序，玩家先发言!");
            } else if (aa == 3) {
                alert("请按照游戏顺序，全民投票!");

            }
        } else {
            alert("请按顺序进行！");
        }

    }

    ghost[i].onclick = function () {

        if (i == d) {
            if (aa == 1) {
                alert("亡灵发表遗言");
                aa = aa + 1;
                ghost[i].style.backgroundColor = "#C0C0C0";
                two[i].style.borderRight = "12px solid #C0C0C0";
                sessionStorage.setItem("aa", JSON.stringify(aa));
                console.log('点击事件变量：', aa);
            } else if (aa == 0) {
                alert("请按照游戏顺序，杀手杀人！");

            } else if (aa == 2) {
                alert("请按照游戏顺序，玩家先发言!");
            } else if (aa == 3) {
                alert("请按照游戏顺序，全民投票!");
            }
        } else {
            alert("请按顺序进行！");
        }

    }
// }
// for (let i = 0; i <= d; i++) {
    make[i].onclick = function () {
       
        if (i == d) {
            if (aa == 2) {
                alert("玩家依次发言");
                aa = aa + 1;
                make[i].style.backgroundColor = "#C0C0C0";
                three[i].style.borderRight = "12px solid #C0C0C0";
                sessionStorage.setItem("aa", JSON.stringify(aa));
                console.log('点击事件变量：', aa);
            } else if (aa == 0) {
                alert("请按照游戏顺序，杀手杀人！");

            } else if (aa == 1) {
                alert("请按照游戏顺序，亡灵先发言!");
            } else if (aa == 3) {
                alert("请按照游戏顺序，全民投票!");
            }
        } else {
            alert("请按顺序进行！");
        }

    }

    the[i].onclick = function () {
     
        if (i == d) {
            if (aa == 3) {
                
                aa = 0;
                sessionStorage.setItem("aa", JSON.stringify(aa));
                let scene = 2;
                sessionStorage.setItem("scene", JSON.stringify(scene));
                window.location.href = "../jstask4/task4-2.html";

            } else if (aa == 0) {
                alert("请按照游戏顺序，杀手杀人！");

            } else if (aa == 1) {
                alert("请按照游戏顺序，亡灵先发言!");
            } else if (aa == 2) {
                alert("请按照游戏顺序，玩家先发言!");
            }
        } else {
            alert("请按顺序进行！");
        }


    }
}


function over() { //结束游戏
    var o = confirm("确立离开游戏吗？");
    if (o == true) {
        sessionStorage.removeItem("allMsg"); //清除所有保存的本地数据
        sessionStorage.removeItem("killko");
        sessionStorage.removeItem("vote");
        sessionStorage.removeItem("scee");
        sessionStorage.removeItem("x");
        sessionStorage.removeItem("y");
        sessionStorage.removeItem("killx");
        sessionStorage.removeItem("flat");
        sessionStorage.removeItem("aa");
        window.location.href = "../jstask2/task2-1.html";
    }

}

function daily() { //法官日志
    if (killko != 0) {
        let scee = 2;
        sessionStorage.setItem("scee", JSON.stringify(scee));
        window.location.href = "../jstask3/task3-2.html";
    } else {
        alert("请至少完成一次杀人，在查看日志！")
    }
}