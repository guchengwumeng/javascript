function back() { //返回

    window.location.href = "../jstask3/task3-1.html"
}

function stut() { //关闭
    var r = confirm("确定要离开游戏吗？"); //提示框//点击确认返回true跳转页面取消不执行代码留在本页面
    if (r == true) {
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
var title=document.getElementsByClassName("title");//标题
var start=document.getElementById("start");//底部跳转按钮
var box = document.getElementsByClassName("box"), //盒子节点
    hy = document.getElementById("hy"); //包裹所有盒子的父节点

var data = JSON.parse(sessionStorage.getItem("allMsg")); //读取保存的数据
var scee = JSON.parse(sessionStorage.getItem("scee"));//读取法官台本页面跳转过来的判断数据 
var killko = JSON.parse(sessionStorage.getItem("killko")) || []; //读取杀手杀人的下标
var vote = JSON.parse(sessionStorage.getItem("vote")) || []; //读取全民投票的下标
console.log(data);
console.log(data.playerNum);



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
//循环插入角色
for (let i = 0; i < data.playerNum; i++) {

    box[i].children[0].innerHTML = data.playerArr[i]; //插入身份
    box[i].children[1].innerHTML = i + 1; //给父节点的第二个子元素插入序号
}

console.log(scee);
if(scee==2){
    title.innerHTML="法官日记";
    start.innerHTML="返回游戏";
}

console.log('被投票的下标：', vote);
console.log('杀手杀人下标：', killko);

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



start.onclick = function () {
   
    window.location.href = "../jstask4/task4-1.html";
}