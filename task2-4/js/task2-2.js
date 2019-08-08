function back() {
    
    var r=confirm("确定要离开游戏吗？");//提示框//点击确认返回true跳转页面取消不执行代码留在本页面
    if(r==true){
    window.location.href = "https://guchengwumeng.github.io/javascript/task2-4/html/jstask2/task2-1.html";
    }
}


var player = document.getElementById("player"), //玩家输入框人数
    killer = document.getElementById("killer"), // 获取杀手数节点   
    plebs = document.getElementById("plebs"), // 获取农民数节点 
    sliding = document.getElementById("sliding"), //获取滑块节点
    playerArr = []; //定义一个没有元素的字面量数组

document.addEventListener("input", monitor);
// 表单事件，输入时触发，触发后执行allot 函数


sliding.oninput = function monitor() { //给滑块输入事件，和总人数绑定

    player.value = sliding.value;

}
// 减号按钮
document.getElementById("minus").onclick = function () {

    if (player.value > 4) {
        player.value--;//每次点击减值
        killer.innerHTML = Math.floor((player.value) / 3); //计算杀手人数
        plebs.innerHTML= player.value - killer.innerHTML; //计算农民人数
        sliding.value=player.value;//
        sliding.style.background = 'linear-gradient(to right, Orange, white ' + (sliding.value - 4) * 100 / 14 + '%, white)';
        // sliding.style.backgroundSize=this.value +'0% 100%';
    }

}
// 加号按钮
document.getElementById("plus").onclick = function () {

    if(player.value<18){
        player.value++;//每次点击增值
        killer.innerHTML = Math.floor((player.value) / 3); //计算杀手人数
        plebs.innerHTML = player.value - killer.innerHTML; //计算农民人数
        sliding.value=player.value;
        sliding.style.background = 'linear-gradient(to right, Orange, white ' + (sliding.value - 4) * 100 / 14 + '%, white)';
        // sliding.style.backgroundSize=this.value +'0% 100%';
    }

}


// 属性类型转换
function monitor() {
    allot();
    playerNum = Number(player.value); //把（）内的数值转换成原始的数值，并返回。
    killerNum = Number(killer.innerHTML); //杀手数值转换成字符
    plebsNum = Number(plebs.innerHTML); //农民数值转换成字符
    print(); //清空数组
    shuffle(playerArr); //洗牌生成的数组

}
monitor();


// 分配玩家
function allot() {

    if (player.value < 4 || player.value > 18) {
        killer.innerHTML = ""; //输出空数值
        plebs.innerHTML = "";
    } else {
        killer.innerHTML = Math.floor((player.value) / 3); //计算杀手人数
        plebs.innerHTML = player.value - killer.innerHTML; //计算农民人数
    }
    console.log(player.value);

}

// 给数组写入值，分配身份
function print() {

    // playerArr=[]; //字面量数组 

    for (var i = 0; i < plebsNum; i++) {
        playerArr[i] = "平民"; //给数组写入值
    }
    for (var j = plebsNum; j < playerNum; j++) {
        playerArr[j] = "杀手";
    }

    console.log(playerArr);
}

// 数组乱序
function shuffle(arr) { //新赋值的参数arr,在监听内与playerArr交接

    var RAM, //随机参数
        temp; //临时储存
    for (i = arr.length; i > 0; i--) {
        RAM = Math.floor(Math.random() * i); //取一个总人数内的随机数
        temp = arr[i - 1]; //总数减掉一位临时储存起来
        arr[i - 1] = arr[RAM]; //重复以上两步直到把所有数值取出
        arr[RAM] = temp; //取出所有数字后，把得到的数字组成一个序列，也就是原始数字的随机排列
    }
    console.log('随机打乱后的数组：', arr) //随机打乱后的数组





}