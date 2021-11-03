// 0, 4, 8, 17, 29, 55, 70, 83, 85;

let numbers = [
  [2, 6, "P1"],
  [5, 2, "P2"],
  [1, 8, "P3"],
  [0, 3, "P4"],
  [4, 4, "P5"],
];

let timeElapse = 0;
const timeElapseGreaterThanArrival = (timeElapsed, sortedQue) => {
  let que = [];
  for (let i = 1; i < sortedQue.length; i++) {
    if (timeElapsed > sortedQue[i][0]) {
      que.push(sortedQue[i]);
    }
  }
  return que;
};
const sortArrival = (processObj) => {
  let temp;
  for (let i = 0; i < processObj.length; i++) {
    for (let j = 0; j < processObj.length; j++) {
      if (processObj[i][0] < processObj[j][0]) {
        temp = processObj[i];
        processObj[i] = processObj[j];
        processObj[j] = temp;
      }
    }
  }
  return processObj;
};
const sortBurst = (que) => {
  let temp;
  //   if (que.length == 1) {
  //     return que;
  //   }
  for (let i = 0; i < que.length; i++) {
    for (let j = 0; j < que.length; j++) {
      if (que[i][1] < que[j][1]) {
        temp = que[i];
        que[i] = que[j];
        que[j] = temp;
      }
    }
  }
  return que;
};
let sortedArrival = sortArrival(numbers);
let sortedQue = sortedArrival;
// console.log(sortedArrival);

const completionTime = (sortedArrival) => {
  for (let i = 0; i < sortedArrival.length; i++) {
    if (timeElapse) {
      //check all if time elapse > arrival
      let que = timeElapseGreaterThanArrival(timeElapse, sortedQue);
      que = sortBurst(que); //find lowest burst in que
      timeElapse += que[0][1]; //execute lowest burst
      que.splice(0, 1); //remove from que
      sortedQue.splice(0, 1);
      console.log(que);
    } else {
      timeElapse += sortedArrival[i][1];
      //   sortedQue.splice(0, 0);
    }
    console.log(timeElapse);
  }
};

completionTime(sortedArrival);
// sortedQue.splice(0, 1);
// let que = timeElapseGreaterThanArrival(3, sortedQue);
// que = sortBurst(que);
// console.log(que);

// que.splice(0, 1); //remove from que
// console.log(que);
// sortedQue.splice(0, 1);

// console.log("__________________________YOW____________________");
// que = timeElapseGreaterThanArrival(9, sortedQue);
// que = sortBurst(que);
// console.log(que);
// que.splice(0, 1); //remove from que
// console.log(que);
// sortedQue.splice(0, 1);

// console.log("__________________________YOW____________________");
// que = timeElapseGreaterThanArrival(11, sortedQue);
// que = sortBurst(que);
// console.log(que);
// que.splice(0, 1); //remove from que
// console.log(que);
// sortedQue.splice(0, 1);

// console.log("__________________________YOW____________________");
// que = timeElapseGreaterThanArrival(15, sortedQue);
// que = sortBurst(que);
// console.log(que);
// que.splice(0, 1); //remove from que
// console.log(que);
// sortedQue.splice(0, 1);

// let timeInSec = 0;

// const arrivals = [
//   [0, 1, "p1"],
//   [2, 0, "p2"],
//   [0, 4, "p3"],
//   [3, 4, "p4"],
//   [4, 2, "p5"],
// ];
// const arrivals = [
//   [85, 1],
//   [83, 0],
//   [29, 4],
//   [70, 4],
//   [4, 2],
//   [0, 2],
//   [17, 2],
//   [8, 2],
//   [55, 2],
// ];
// arrivals.sort(numberSorter);
// console.log(arrivals);
// const completionTime = [];
// for (let i = 0; i < arrivals.length; i++) {
//   console.log(arrivals[i][i + 1]);
// }

// timeInSec += arrivals[i][j];
// completionTime.push(timeInSec);
// console.log(arrivals[i][j]);

// timeInSec += arrivals[i][j];
// completionTime.push(timeInSec);
// console.log(`process:${i + 1} completion: ${completionTime[i]}`);

// console.log(arrivals);
//timeInSec
/*
if arrival = 0 
timeInsSec += burst
but if arrival =0 in que
*/
