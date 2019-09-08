$(".return").click(function () { //返回
    window.location.href = "../jstask4/task4-1.html"
});
$(".stut").click(function () { //关闭
    var r = confirm("确定要离开游戏吗？"); //提示框//点击确认返回true跳转页面取消不执行代码留在本页面
    if (r == true) {
        sessionStorage.clear(); //删除所有数据
        window.location.href = "../jstask2/task2-1.html";
    }
});

var data = JSON.parse(sessionStorage.getItem("allMsg")); //读取保存总人数的数据 

var x = sessionStorage.getItem("x") || 0;
var y = sessionStorage.getItem("y") || 0;
console.log(x);
var killko = JSON.parse(sessionStorage.getItem("killko")) || []; //读取杀手杀人的下标
var vote = JSON.parse(sessionStorage.getItem("vote")) || []; //读取全民投票的下标
var aa = JSON.parse(sessionStorage.getItem("aa")); //点击事件变量
console.log('点击事件变量：', aa);

var scene = JSON.parse(sessionStorage.getItem("scene")); //读取杀手还是投票识别

console.log('所有信息', data);
console.log('所有玩家', data.playerArr)
console.log('当前总人数', data.playerNum);

for (let i = 0; i < data.playerNum - 1; i++) { //循环克隆身份块
    $(".box").eq(i).clone().appendTo("#hy");
}
for (let i = 0; i < data.playerNum; i++) {
    $(".box").eq(i).find("p").text(data.playerArr[i]); //插入身份
    $(".box").eq(i).find("span").text(i + 1); //给父节点的第二个子元素插入序号
}
//页面一显示给被杀的盒子赋予颜色
if (killko) {
    for (let i = 0; i < killko.length; i++) {
        $(".box").eq(killko[i]).css({
            "backgroundColor": "#ff0000"
        });
    }
}
if (vote) {
    for (let i = 0; i < vote.length; i++) {
        $(".box").eq(vote[i]).css({
            "backgroundColor": "#ff0000"
        });
    }
}
console.log(scene)
//页面渲染
if (scene == 1) {
    $("#title").text("杀手杀人");
    $(".hint").text("杀手请睁眼，杀手请选择要杀的对象");
    $(".click").text("点击下方玩家头像，对被杀玩家标记");

} else if (scene == 2) {
    $("#title").text("投票投死");
    $(".hint").text("发言讨论结束，大家请投票");
    $(".click").text("点击得票数最多的人的头像");
}
var killer; //保存身份的下标
for (let i = 0; i < data.playerNum; i++) { //循环得到所有盒子按钮
    console.log(data.playerNum);
    $(".box").eq(i).click(function () {
        for (let j = 0; j < data.playerNum; j++) { //循环将点击的图片和颜色还原  还原的两行必须放前面优先执行
            $(".imgs").eq(j).hide();//还原图片初始状态
            $(".imgs").eq(i).show();//点击后
            $(".box").eq(j).css({//还原盒子初始颜色 
                "backgroundColor": "#fbb435"
            });       
            for (let i = 0; i < killko.length; i++) { //还原之后给被杀手杀人的盒子颜色              
                $(".box").eq(killko[i]).css({
                    "backgroundColor": "#ff0000"
                });
            }
            for (let i = 0; i < vote.length; i++) { //还原之后给被投票的盒子颜色   
                $(".box").eq(vote[i]).css({
                    "backgroundColor": "#ff0000"
                });
            }
            $(".box").eq(i).css({
                "backgroundColor": "#ff0000"
            }); //点击后赋予颜色
        }
        killer = i; //点击的下标保存起来
        console.log('点击的下标', killer);
    });
}

var killx = JSON.parse(sessionStorage.getItem("killx")) || 0; //杀手被杀的人数
var flat = JSON.parse(sessionStorage.getItem("flat")) || 0; //平民被杀的人数
console.log("杀手死亡人数：", killx);
console.log("平民死亡人数：", flat);
console.log("杀手总人数", data.killerNum);
console.log("平民总人数", data.plebsNum);

$("#start").click(function(){

    if (scene == 1) { //判断是杀手还是投票
        //杀手杀人
        if (killer == undefined) { //判断当前被杀的不为空，不可以不杀人
            alert("不可以不杀人，请重新选择！");
        } else { //判断被杀的不是自己人
            if (data.playerArr[killer] == "杀手") {
                alert("不可以杀自己人，请重新选择！");
            } else {
                if (killko.indexOf(killer) == -1 && vote.indexOf(killer) == -1) { //在数组内用indexOf() 方法查找当这个数值存在数组内会返回它在数组内首次出现的位置也就是会不等于-1（为false）,不存在就返回-1（为true）用且运算符&&关联两个表达式使选取的值和杀手杀人、投票数组查证是否存在。
                    x++;
                    sessionStorage.setItem("x", x); //保存法官台本杀手按钮点击 
                    killko.push(killer); //保存杀手杀的平民下标，以跨页面访问
                    sessionStorage.setItem("killko", JSON.stringify(killko));
                    flat = flat + 1;
                    sessionStorage.setItem("flat", JSON.stringify(flat)); //保存平民被杀数

                    if ((data.killerNum - killx) >= (data.plebsNum - flat)) { //条件判断胜利条件
                        alert("恭喜杀手获得胜利！游戏结束")
                        let scene = 1; //设置页面跳转时是杀手还是投票的识别
                        sessionStorage.setItem("scene", JSON.stringify(scene));
                        window.location.href = "../jstask4/task4-3.html";
                    } else {

                        window.location.href = "../jstask4/task4-1.html";
                    }
                } else {
                    alert("不可以杀已被杀死的人，请重新选择!")
                }
            }
        }
    } else {
        console.log(scene);
        if (killer == undefined) { //判断当前被杀的不为空，不可以不杀人
            alert("不可以不杀人，请重新选择！");
        } else {
            if (killko.indexOf(killer) == -1 && vote.indexOf(killer) == -1) { //查询数组，确定不是已被杀的人
                y++;
                sessionStorage.setItem("y", y); //保存法官台本投票按钮点击 
                vote.push(killer); //保存全民投票杀的下标，以跨页面访问
                sessionStorage.setItem("vote", JSON.stringify(vote));
                if (data.playerArr[killer] == "杀手") {
                    killx = killx + 1;
                    sessionStorage.setItem("killx", JSON.stringify(killx)); //保存平民被杀数
                } else {
                    flat = flat + 1;
                    sessionStorage.setItem("flat", JSON.stringify(flat)); //保存平民被杀数
                }
                if ((data.killerNum - killx) >= (data.plebsNum - flat)) { //条件判断胜利条件
                    let scene = 1; //设置页面跳转时是杀手还是投票的识别
                    sessionStorage.setItem("scene", JSON.stringify(scene));
                    alert("恭喜杀手获得胜利！游戏结束")
                    window.location.href = "../jstask4/task4-3.html";
                } else if (data.killerNum - killx == 0) {
                    let scene = 2; //投票
                    sessionStorage.setItem("scene", JSON.stringify(scene));
                    alert("恭喜平民获得胜利！游戏结束")
                    window.location.href = "../jstask4/task4-3.html";
                } else {
                    window.location.href = "../jstask4/task4-1.html";
                }
            } else {
                alert("不可以杀已被杀死的人，请重新选择!")
            }
        }
    }
});