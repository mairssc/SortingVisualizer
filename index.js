let bar = document.getElementsByClassName('bar');
let barHolder = document.getElementById('bar-holder');
let sorting = false;
const max = 900;
const ratio = 800/1920;

setInterval(checker, 100);

function bigImg(x) {
    if (!sorting || String(x.id) === "clearButton") {
        x.style.transform = "scale(1.05)";
    }
}
  
function normalImg(x) {
    x.style.transform = "scale(1)";
}

function checker() {
    if ((bar.length)/Number(window.innerWidth) > ratio) {
        clearBars();
        genMaxNumOfBars();
    }
}

function clearBars() {
    while (bar[0]) {
        bar[0].parentNode.removeChild(bar[0])
    }
    sorting = false;
}



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
        return;
    }
    num += 15;
    num *= 5;
    var curBar = document.createElement('div');
    curBar.className = "bar";
    curBar.style.height = String(num)+units;
    barHolder.appendChild(curBar);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomFloat(max) {
    return Math.random() * max;
}

function genRandBars() {
    if (sorting) {
        return;
    }
    var num = parseInt(document.getElementById("myNumber").value);
    if (num == NaN) {
        return;
    }
    if (num > 50) {
        num = 50;
        document.getElementById("myNumber").value = 50;
    }
    if (num < 1) {
        num = 1;
        document.getElementById("myNumber").value = 1;
    }
    if ((bar.length + num)/Number(window.innerWidth) >= ratio) {
        return;
    }
    for (var i = 0; i < parseInt(num); i++) {
        createBar(getRandomFloat(20), "px");
    }
}

function genNumOfBars(num){
    //checks if over ratio for window
    if (sorting) {
        return;
    }
    if ((bar.length + num)/Number(window.innerWidth) >= ratio) {
        return;
    }
    for (var i = 0; i < parseInt(num); i++) {
        createBar(getRandomFloat(20), "px");
    }
    shuffleBars();
}

function genMaxNumOfBars() {
    if (sorting) {
        return;
    }
    //while not over designated ratio variable
    while ((bar.length + 1)/Number(window.innerWidth) < ratio) {
        createBar(getRandomFloat(20), "px");
    }
    shuffleBars();
}

function shuffleBars(){
    // let hold_bar = [];
    // for (let k = 0; k < bar.length; k++) {
    //     hold_bar.push(bar[k].cloneNode());
    // }
    // clearBars();
    // setTimeout(()=> null, 100);
    // let j = 0;
    // console.log(hold_bar[0]);
    // while (j < hold_bar.length) {
    //     barHolder.appendChild(hold_bar[j]);
    //     j += 1;
    // }
    // figure out how to stop call once started
    if (sorting) {
        return;
    }
    let randIndex;
    for (var i = 0; i < bar.length; i++) {
        randIndex = getRandomInt(bar.length-1);
        var hold = bar[i].style.height;
        bar[i].style.height = bar[randIndex].style.height;
        bar[randIndex].style.height = hold;
    }
}

function getNum(barHeight) {
    barHeight.substring(0, barHeight.length - 2);
    return parseFloat(barHeight);
}

async function callBubble() {
    if (sorting) {
        return;
    }
    sorting = true;
    await bubbleSort();
    sorting = false;
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
        await bubbleSort();
    }
    return;
}
async function callInsertion() {
    if (sorting) {
        return;
    }
    sorting = true;
    await insertionSort();
    sorting = false;
}

async function insertionSort(){

    if (bar.length <= 1){
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

async function callSelection() {
    if (sorting) {
        return;
    }
    sorting = true;
    await selectionSort();
    sorting = false;
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

async function callQuick(left, right) {
    if (sorting) {
        return;
    }
    sorting = true;
    await quickSort(left, right);
    sorting = false;
}


async function quickSort(left, right) {
    function swap(i, j) {
        return new Promise(resolve => {
            setTimeout(() => {
                let temp = bar[j].style.height;
                bar[j].style.height = bar[i].style.height;
                bar[i].style.height = temp;

                resolve('');
            }, 1);
        });

    }

    let pivotIndex;
    if (left >= 0 && right >= 0 && left < right) {
        let pivot = getNum(bar[Math.floor((left + right) / 2)].style.height);
        let i = left - 1;
        let j = right + 1;
        while (true) {
            //increment lo until it is greater than or equal to pivot
            do {
                i += 1;
            } while (getNum(bar[i].style.height) < pivot);

            
            //decrement hi until less or equal to pivot
            do { 
                j -= 1;
            } while (getNum(bar[j].style.height) > pivot);

            //if they crossed, then correct pivot location is at hi
            //this should be the case where it ends
            if (i >= j) {
                break;
            }


            //Swap hi and lo
            await swap(i, j);
        }


        pivotIndex = j;
        await quickSort(left, pivotIndex);
        await quickSort(pivotIndex + 1, right);
    }
}

async function callMerge(left, right) {
    if (sorting) {
        return;
    }
    sorting = true;
    await mergeSort(left, right);
    sorting = false;
}

async function mergeSort(left, right){
    function pseudoSwap(start1, curS2Val) {
        return new Promise(resolve => {
            setTimeout(() => {
                bar[start1].style.height = curS2Val;
                resolve('');
            }, 1);
        });   
    }



    async function merge(left, midpoint, right) {

        //https://www.geeksforgeeks.org/in-place-merge-sort/

        let start2 = midpoint + 1;
        let start1 = left;
        
        if (getNum(bar[midpoint].style.height) <= getNum(bar[start2].style.height)) {
            return;
        }

        while (start1 <= midpoint && start2 <= right) {
            if (getNum(bar[start1].style.height) < getNum(bar[start2].style.height)) {
                start1++;
            } else {
                let holds2 = start2;
                let curS2Val = bar[start2].style.height;


                while (holds2 != start1) {
                    bar[holds2].style.height = bar[holds2 - 1].style.height;
                    holds2--;
                }
                await pseudoSwap(start1, curS2Val);

                start1++;
                midpoint++;
                start2++;
            }
        }
    }

    //RECURSION ??
    //find midpoint
    if (left < right) { 
        var midpoint = Math.floor((left + right) / 2)
        //establish left and right

        await mergeSort(left, midpoint);
        await mergeSort(midpoint + 1, right);

        await merge(left, midpoint, right);
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