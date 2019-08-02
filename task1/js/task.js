var box = document.getElementsByTagName("div");
// 全局变量 、赋予所有div标签的节点
console.log(box);
var time;

function stochastic() {

    // 三个随机数 
    for (; a == b || b == c || c == a;) {
        // 循环去除重复
        var a = Math.floor(Math.random() * 9);
        // 赋予一个变量0（包含）~ 9（包含）的随机数 
        var b = Math.floor(Math.random() * 9);
        var c = Math.floor(Math.random() * 9);
    }
    console.log(a, b, c)

    for (; one == two || two == three || three == one;) {
        // 循环去除重复
        var one = box[a].style.backgroundColor = colors();
        // 给获取到的随机数代表的格子一个随机颜色
        var two = box[b].style.backgroundColor = colors();

        var three = box[c].style.backgroundColor = colors();
    }
    console.log(one, two, three)
    // 在控制台显示()内变量获取到的随机数

}

function colors() {
    // 获取三个随机颜色
    var r = Math.round((Math.random() * 255));
    // 赋予变量一个舍入为整数0~255的随机数
    var g = Math.round((Math.random() * 255));

    var b = Math.round((Math.random() * 255));


  
    // 返回rgb的值并停止函数的执行
    return 'rgb(' + r + ',' + g + ',' + b + ')';
    // 返回三个随机数组合成rgb随机颜色

}
// 开始按钮
function start() {

    time = setInterval(
        // 设置时间计时器
        function () {
            for (var i = 0; i < 9; i++) {
                // 初始化为0:数组数；增量
                box[i].style.backgroundColor = "#FFA500"
                // 每次随机后重置颜色
            }
            stochastic()
            // 随机背景颜色的函数
        }, 1000);
    // }
   
    document.getElementById("stt").disabled = true;
    // 调用按钮、点击一次后禁用按钮

}


// 关闭按钮
function finish() {
    for (var i = 0; i < 9; i++) {
        // 初始化为0:数组数；增量
        box[i].style.backgroundColor = "#FFA500"
        // 每次随机后重置颜色
    }
    clearInterval(time);
    // 停止 setInterval() 方法执行的函数代码。
    document.getElementById("stt").disabled = false;
    // 调用按钮、点击后启用IDstt按钮
}