const bar = document.getElementsByClassName('bar');
const barHolder = document.getElementById('bar-holder');
const max = 900;
const ratio = 900/1920;

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

function getRandomInt(max) {
    return Math.(Math.random() * max);
}

function getRandomFloat(max) {
    return Math.random() * max;
}

function genRandBars() {
    var num = document.getElementById("myNumber").value;
    for (var i = 0; i < parseInt(num); i++) {
        createBar(getRandomFloat(20), "px");
    }
}

function genNumOfBars(num){
    //checks if over ratio for window
    if (bar.length/Number(window.innerWidth) >= ratio) {
        return;
    }
    for (var i = 0; i < parseInt(num); i++) {
        createBar(getRandomFloat(20), "px");
    }
}

function genMaxNumOfBars(){
    //while not over designated ratio variable
    while (bar.length/Number(window.innerWidth) < ratio) {
        createBar(getRandomFloat(20), "px");
    }
}

function shuffleBars(){
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


async function mergeSort(left, right){
    function merge(leftArr, alphaLeft, alphaRight, rightArr, betaLeft, betaRight) {
        //have two pointers, one for start of left, other for start of right
        // let i = 0;
        // let j = 0;
        // let temp = [];
        // //take min of two pointers and add to temp list
        // while(i < leftArr.length && j < rightArr.length){
        //     if(leftArr[i].style.height < rightArr[j].style.height){
        //         temp.push(leftArr[i]);
                   
        //         i++;
        //     } else {
        //         temp.push(rightArr[j]);
        //         j++;
        //     }
        // }
        
        // if(i == leftArr.length){
        //     for(var k = j; k < rightArr.length; k++){
        //         temp.push(rightArr[k]);
        //     }
        // } else {
        //     for(var k = i; k < leftArr.length; k++){
        //         temp.push(leftArr[k]);
        //     }
        // }
        // //move forward pointer that was used
        // //once one of the pointers has reached the "end" add all of the other list to 
        // //the temp list
        // //return temp list
        // return temp;

        //https://www.geeksforgeeks.org/in-place-merge-sort/

    }

    //RECURSION ??
    //find midpoint
    if (left < right) { 
        var midpoint = Math.floor((left + right) / 2)
        //establish left and right

        mergeSort(left, midpoint);
        mergeSort(midpoint + 1, right);

        merge(left, midpoint, right);
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