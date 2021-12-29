const bar = document.getElementsByClassName('bar');
const barHolder = document.getElementById('bar-holder');


function createBar(num, units) {
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
        console.log('DUMBASS');
        return;
    }
    num += 15;
    num *= 5;
    var curBar = document.createElement('div');
    curBar.className = "bar";
    curBar.style.height = String(num)+units;
    barHolder.appendChild(curBar);

    // var curNum = "";
    // for (var i = 0; i < bar.length; i++) {
    //     curNum = bar[i].style.height;
    //     console.log(curNum.substring(0, curNum.length - 2));
    // }
}

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

function getRandomFloat(max) {
    return Math.random() * max;
}

function genRandBars() {
    var num = document.getElementById("myNumber").value;
    for (var i = 0; i < parseInt(num); i++) {
        createBar(getRandomFloat(20), "px");
    }
}

function getNum(barHeight) {
    barHeight.substring(0, barHeight.length - 2);
    return parseFloat(barHeight);
}

//assuming length of bar is >1
async function bubbleSort() {

    let swapCount = 0;
    let curNum = 0;

    function bubbleSwap(i){
        return new Promise(resolve => {
            setTimeout(() => {
                curNum = getNum(bar[i].style.height);

                if (getNum(bar[i+1].style.height) < curNum) {
                    var hold = bar[i].style.height
                    bar[i].style.height = bar[i+1].style.height
                    bar[i+1].style.height = hold;
                    swapCount += 1;
                }
                resolve('');
            }, 1);
        });
    }

    
    for (let i = 0; i < bar.length - 1; i++) {
        await bubbleSwap(i);
    }

    if (swapCount > 0) {
        bubbleSort();
    }
    return;
}

async function insertionSort(){
    if(bar.length <= 1){
        return;
    }

    let prevIndex;
    let prevNum = 0;
    let curIndex;
    let curNum = 0;

    function insertionSwap(){
        return new Promise(resolve => {
            setTimeout(() => {
                bar[curIndex].style.height = String(prevNum)+'px';
                bar[prevIndex].style.height = String(curNum)+'px';

                resolve('');
            }, 1);
        });
    }

    for(var i = 1; i < bar.length; i++){
        prevIndex = i - 1;
        prevNum = getNum(bar[prevIndex].style.height);
        curIndex = i;
        curNum = getNum(bar[curIndex].style.height);

        while(curNum < prevNum){
            await insertionSwap();

            if(prevIndex == 0){
                break;
            }

            prevIndex--;
            curIndex--;
            prevNum = getNum(bar[prevIndex].style.height);
            curNum = getNum(bar[curIndex].style.height);   
        }
    }

    return;
}

async function selectionSort() {
    let minIndex;
    
    function selectionSwap(i, minIndex){
        return new Promise(resolve => {
            setTimeout(() => {
                let temp = bar[minIndex].style.height;
                bar[minIndex].style.height = bar[i].style.height;
                bar[i].style.height = temp;

                resolve('');
            }, 60);
        });
    }

    for (let i = 0; i < bar.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < bar.length; j++) {
            if (getNum(bar[j].style.height) < getNum(bar[minIndex].style.height)) {
                minIndex = j;
            }
        }
        await selectionSwap(i, minIndex);
    }
}


// function twosec() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             bar[0].style.height = "325px";
//         }, 2000);
//         });
// }

// async function maxLength() {
//     const done = await twosec();
//     console.log('this should take 2 seconds');
// }