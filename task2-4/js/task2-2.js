function back() {
    window.location.href = "https://guchengwumeng.github.io/javascript/task2-4/page2/html/task2-2.html";
}



function print() {
    // var a = [8];
    var a = document.getElementById("nn").value;
    // 获取input元素的value值
    alert(a);
    // 打印
    console.log(a);
    var s = a % 3;
    var c = a - s;

    var killer = document.getElementById("killer");
    // 获取杀手数节点
    var plebs = document.getElementById("plebs");
    // 获取农民数节点
    killer.innerHTML =  s;
    // 杀手数
    plebs.innerHTML =  c;
    // 农民数
    console.log(s);
    console.log(c);
    // function 


}