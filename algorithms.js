import {colorBar, sleep, shuffle, swap} from './utils.js';
import {getSpeed} from './sort.js';

let itrColor = '#d7263d';
let mscColor = '#1ad2d9';
let dftColor = '#ffffff';

async function bogoSort (chart, array) {
    var sorted = false;

    while(!sorted) {
        shuffle(chart);
        await sleep(chart);
        for(var i = 1; i < array.length; i++){
            if (array[i-1] > array[i]) {
                sorted = false;
                break;
            }
            else {
                sorted = true;
            }
        }
    }
}

async function bubbleSort (chart, array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length-i-1; j++) {
            await colorBar(chart, j, itrColor, 1);
            if (array[j] > array[j + 1]) {
                await swap(chart, j, j+1);
                await sleep(chart);
            }
        }
    }
}

async function selectionSort(chart, array) {
    for(let i = 0; i < array.length; i++) {
        let min = i;
        colorBar(chart, min, mscColor, 0);
        for(let j = i+1; j < array.length; j++){
            await colorBar(chart, j, itrColor, 1);
            if(array[j] < array[min]) {
                colorBar(chart, min, dftColor, 0);
                min=j;
                colorBar(chart, min, mscColor, 0);
            }
            colorBar(chart, min, mscColor, 0);
        }
        if (min != i) {
            await swap(chart, i, min);
            await sleep(chart);
        }
        colorBar(chart, min, dftColor, 0);
    }
}

async function partition(chart, array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)], i = left, j = right;
    while (i <= j) {
        while (array[i] < pivot) {
            await colorBar(chart, i, itrColor, 1);
            i++;
        }
        while (array[j] > pivot) {
            await colorBar(chart, j, itrColor, 1);
            j--;
        }
        if (i <= j) {
            swap(chart, i, j);
            await sleep(chart);
            i++;
            j--;
        }
    }
    return i;
}

async function quickSort(chart, array, left, right) {
    var index;
    if (array.length > 1) {
        index = await partition(chart, array, left, right);
        colorBar(chart, index, mscColor, 0);
        if (left < index - 1) {
            await quickSort(chart, array, left, index - 1);
            colorBar(chart, index-1, dftColor, 0);
        }
        if (index < right) {
            await quickSort(chart, array, index, right);
            colorBar(chart, right, dftColor, 0);
        }
    }
    return array;
}

async function insertionSort(chart, array) {
    let i, j, key;
 
    for (i = 1; i < array.length; i++) {
        j = i;
        colorBar(chart, i, itrColor, 0);
        await sleep(chart);
        while (j > 0) {
            if (array[j] < array[j - 1]) {
                await colorBar(chart, j-1, mscColor, 1);
                swap(chart, j, j-1);
                await sleep(chart);
                colorBar(chart, i, itrColor, 0);
            }
            else{
                j--;
            }
        }
        colorBar(chart, i, dftColor, 0);
    }
}

function isSorted(array) {
    for(var i = 1; i < array.length; i++){
        if (array[i-1] > array[i]) {
            return false;
        }
    }
    return true;
}

export {bogoSort, bubbleSort, selectionSort, partition, quickSort, insertionSort, isSorted};