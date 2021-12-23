const bar = document.getElementsByClassName('bar');
const barHolder = document.getElementById('bar-holder');
console.log(bar.length)

for (let i = 0; i < bar.length; i++) {
    console.log(bar[i].style.backgroundColor);
}


function createBar(num, type) {
    var curBar = document.createElement('div');
    curBar.className = "bar";
    curBar.style.height = String(num)+type
    barHolder.appendChild(curBar);
}


function addBar() {
    var num = document.getElementById("myNumber").value;
    if (num > 50) {
        num = 50;
        document.getElementById("myNumber").value = 50;
    }
    if (num < 1) {
        num = 1;
        document.getElementById("myNumber").value = 1;
    }
    num = parseFloat(num);
    if (num == NaN) {
        return;
    }
    num += 15;
    num *= 5;
    createBar(num, "px");
}