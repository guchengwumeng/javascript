function back() { //返回

    window.location.href = "../jstask4/task4-1.html"
  }
  
  function stut() { //关闭
    var r = confirm("确定要离开游戏吗？"); //提示框//点击确认返回true跳转页面取消不执行代码留在本页面
    if (r == true) {
        sessionStorage.clear();//删除所有数据
      window.location.href = "../jstask2/task2-1.html";
    }
  }


var entity = document.getElementsByClassName("entity"), //身份节点
    seriai = document.getElementsByClassName("seriai"), //序号节点
    imgs = document.getElementsByClassName("imgs"), //图片
    box = document.getElementsByClassName("box"), //盒子节点
    hy = document.getElementById("hy"); //包裹所有盒子的父节点


console.log('盒子下标', box);
var data = JSON.parse(sessionStorage.getItem("allMsg")); //读取保存总人数的数据
var title = document.getElementById("title"),
    hint = document.getElementsByClassName("hint")[0],
    click = document.getElementsByClassName("click")[0];
var start = document.getElementById("start"); //确认按钮  

var x = sessionStorage.getItem("x") || 0;
var y = sessionStorage.getItem("y") || 0;
console.log(x);
var killko = JSON.parse(sessionStorage.getItem("killko")) || []; //读取杀手杀人的下标
var vote = JSON.parse(sessionStorage.getItem("vote")) || []; //读取全民投票的下标
var aa = JSON.parse(sessionStorage.getItem("aa")); //点击事件变量
console.log('点击事件变量：', aa);

// var fall = JSON.parse(sessionStorage.getItem("fall")) || false;
var scene = JSON.parse(sessionStorage.getItem("scene")); //读取杀手还是投票识别


console.log('所有信息', data);
console.log('所有玩家', data.playerArr)
console.log('当前总人数', data.playerNum);





for (let i = 0; i < data.playerNum - 1; i++) { //循环克隆身份块
    // console.log(i);

    var cln = box[0].cloneNode(true); //设置返回所有子节点
    hy.appendChild(cln); //添加克隆的节点
    /**
     * var cln = box.cloneNode(true);
     * box是将要被克隆的节点
     * cln是克隆生成的副本节点
     * true、、可选
     * 是否采用深度克隆,如果为true,则该节点的所有后代节点也都会被克隆,如果为false,则只克隆该节点本身.    
     */
}
for (let i = 0; i < data.playerNum; i++) {

    box[i].children[0].innerHTML = data.playerArr[i]; //插入身份
    box[i].children[1].innerHTML = i + 1; //给父节点的第二个子元素插入序号
}
//页面一显示给被杀的盒子赋予颜色
if (killko) {
    for (let i = 0; i < killko.length; i++) {
        box[killko[i]].style.backgroundColor = "#ff0000";
    }
}
if (vote) {
    for (let i = 0; i < vote.length; i++) {
        box[vote[i]].style.backgroundColor = "#ff0000";
    }
}


//页面渲染
if (aa == 1) {
    title.innerHTML = "杀手杀人";
    hint.innerHTML = "杀手请睁眼，杀手请选择要杀的对象";
    click.innerHTML = "点击下方玩家头像，对被杀玩家标记";

} else if (aa == 0) {
    title.innerHTML = "投票投死";
    hint.innerHTML = "发言讨论结束，大家请投票";
    click.innerHTML = "点击得票数最多的人的头像";
}



var killer; //保存身份的下标
for (let i = 0; i < data.playerNum; i++) { //循环得到所有盒子按钮
    console.log(data.playerNum);

    box[i].onclick = function () { //给循环获取的盒子添加点击事件

        for (let j = 0; j < data.playerNum; j++) { //循环将点击的图片和颜色还原  还原的两行必须放前面优先执行

            imgs[j].style.display = "none"; //还原图片初始状态
            imgs[i].style.display = "block"; //点击后
            box[j].style.backgroundColor = "#fbb435"; //还原盒子初始颜色
            for (let i = 0; i < killko.length; i++) { //还原之后给被杀手杀人的盒子颜色
                box[killko[i]].style.backgroundColor = "#ff0000";
            }
            for (let i = 0; i < vote.length; i++) { //还原之后给被投票的盒子颜色
                box[vote[i]].style.backgroundColor = "#ff0000";
            }
            box[i].style.backgroundColor = "#ff0000"; //点击后赋予颜色

        }

        killer = i; //点击的下标保存起来
        console.log('点击的下标', killer);

    }

}
// var killx = 0;
// var flat = 0;

var killx = JSON.parse(sessionStorage.getItem("killx")) || 0; //杀手被杀的人数
var flat = JSON.parse(sessionStorage.getItem("flat")) || 0; //平民被杀的人数
    console.log("杀手死亡人数：", killx);
    console.log("平民死亡人数：", flat);
    console.log("杀手总人数",data.killerNum);
    console.log("平民总人数",data.plebsNum);

(start.onclick = function () {
    
    
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