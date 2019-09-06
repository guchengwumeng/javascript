$(".return").click(function () { //返回

  window.location.href = "../jstask2/task2-2.html"
});

$(".stut").click(function () { //关闭
  var r = confirm("确定要离开游戏吗？"); //提示框//点击确认返回true跳转页面取消不执行代码留在本页面
  if (r == true) {
    window.location.href = "../jstask2/task2-1.html";
  }
});

var figure = $("#figure")[0]; //头部圆内数字节点
var reveal = $("#reveal")[0]; // 图1节点
var hide = $("#hide")[0]; //图2节点   
var role = $("#role")[0]; // 角色节点 
var identity = $("#identity")[0]; //按钮节点
var data = JSON.parse(sessionStorage.getItem("allMsg")); //读取保存的数据

console.log(data.playerNum);
console.log(data);

var i = 1;
var j = 1; //初始值
var p = 0;


identity.onclick = function () {
  i++; //每次运行增值

  if (i < 2 * data.playerNum + 1) {
    if (i % 2 == 1) { //奇数页
      j++;

      figure.innerHTML = j; //头部圆内数字
      identity.innerHTML = "查看" + j + "号身份";
      hide.style.display = "none"; //隐藏小图
      reveal.style.display = "block"; //显示大图
      role.style.display = "none";
    } else { //偶数页
      var x = j + 1;
      reveal.style.display = "none"; //隐藏大图
      hide.style.display = "block"; //显示小图
      if (x <= data.playerNum) { //判断x小于等于总人数

        identity.innerHTML = "隐藏并传递给" + x + "号";
      } else { //大于总人数执行
        identity.innerHTML = "法官查看";
      }

      role.style.display = "block"; //角色显示
      role.innerHTML = "角色：" + data.playerArr[p]; //角色身份
      p++;

    }

  } else {
    location.href = "../jstask3/task3-2.html";
  }

}