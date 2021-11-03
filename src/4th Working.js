// let numbers = [
//   [2, 6, "P1"],
//   [5, 2, "P2"],
//   [1, 8, "P3"],
//   [0, 3, "P4"],
//   [4, 4, "P5"],
// ];

// let numbers = [
//   [2, 1, "P1"],
//   [1, 5, "P2"],
//   [4, 1, "P3"],
//   [0, 6, "P4"],
//   [2, 3, "P5"],
// ];

let numbers = [
  [0, 6, "P1"],
  [0, 8, "P2"],
  [0, 7, "P3"],
  [0, 3, "P4"],
];
let timeElapse = 0;
const timeElapseGreaterThanArrival = (timeElapsed, sortedQue) => {
  let que = [];
  for (let i = 0; i < sortedQue.length; i++) {
    if (timeElapsed > sortedQue[i][0]) {
      que.push(sortedQue[i]);
    }
  }
  return que;
};

const isAllSameArrival = (processObj) => {
  let sameArrival = 0;
  for (let i = 0; i < processObj.length; i++) {
    for (let j = 0; j < processObj.length; j++) {
      if (processObj[i][0] == processObj[j][0]) {
        sameArrival++;
      }
    }
    if (processObj.length == sameArrival) {
      return true;
    }
  }
  return false;
};
//countZeroArrivals

const countZeroArrivals = (processObj) => {};
const sortArrival = (processObj) => {
  if (isAllSameArrival(processObj)) {
    return sortBurst(processObj);
  }
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
let sortedQue = [...sortedArrival];
console.log(sortedArrival);

const removeInSortedQue = (processName, sortedQue) => {
  for (let i = 0; i < sortedQue.length; i++) {
    if (processName == sortedQue[i][2]) {
      return sortedQue.splice(i, 1);
    }
  }
};

// const waitingTime = () => {};

let completionTime = [];
let turnAroundTime = [];
let waitingTime = [];
const completion = (sortedArrival) => {
  for (let i = 0; i < sortedArrival.length; i++) {
    /*
        validations
        1. check if all arrival time is the same (like all arrival time =0)
        2. check if there are same arrival time (like 0 0 1 1)
        3. check if there are same burst time
        */
    if (timeElapse) {
      //check all if time elapse > arrival
      let que = timeElapseGreaterThanArrival(timeElapse, sortedQue);
      que = sortBurst(que); //find lowest burst in que
      timeElapse += que[0][1]; //execute lowest burst
      turnAroundTime.push(timeElapse - que[0][0]);
      waitingTime.push(turnAroundTime[i] - que[0][1]);
      removeInSortedQue(que[0][2], sortedQue); //find process name in sorted que then remove
      que.splice(0, 1); //remove from que
    } else {
      completionTime.push(sortedArrival[i][0]);
      timeElapse += sortedArrival[i][1];
      turnAroundTime.push(timeElapse - sortedArrival[i][0]);
      waitingTime.push(turnAroundTime[i] - sortedArrival[i][1]);

      sortedQue.splice(0, 1);
    }
    completionTime.push(timeElapse);
    //   turnAroundTime.push(completionTime[i]-);
    //   waitingTime.push();
  }
};

// console.log(isAllSameArrival(sortedArrival));
completion(sortedArrival);
console.log(completionTime);
// console.log(turnAroundTime);
// console.log(waitingTime);

// TESTING AREA
// sortedQue.splice(0, 1);
// let que = timeElapseGreaterThanArrival(3, sortedQue);
// que = sortBurst(que);
// console.log(`SortedQue:`);
// console.log(sortedQue);
// console.log(`Que:`);
// console.log(que);

// sortedQue.splice(0, 1);
// que = timeElapseGreaterThanArrival(9, sortedQue);
// que = sortBurst(que);
// console.log(`SortedQue:`);
// console.log(sortedQue);
// console.log(`Que:`);
// console.log(que);

// sortedQue.splice(0, 1);
// que = timeElapseGreaterThanArrival(11, sortedQue);
// que = sortBurst(que);
// console.log(`SortedQue:`);
// console.log(sortedQue);
// console.log(`Que:`);
// console.log(que);

// sortedQue.splice(0, 1);
// que = timeElapseGreaterThanArrival(15, sortedQue);
// que = sortBurst(que);
// console.log(`SortedQue:`);
// console.log(sortedQue);
// console.log(`Que:`);
// console.log(que);

// _______________________EXPERIMENTAL___________________________-

/* test case
let numbers = [
  [0, 6, "P1"],
  [0, 8, "P2"],
  [2, 7, "P3"],
  [2, 3, "P4"],
];

expected outcome should be
[
    {
    arrival:0, repeated:2; index:0
    },
    {
    arrival:2, repeated:2; index:2
    }

]

const itemExistInArray = (arrival, sameArrivalArr) => {
  for (let i = 0; i < sameArrivalArr.length; i++) {
    for (let j = 0; j < sameArrivalArr.length; j++) {
      if (sameArrivalArr[i][0] == arrival) {
        return true;
      }
    }
  }
};

*/
// const isAllSameArrival = (processObj) => {
//   let sameArrival = 0;
//   let repeated = 0;
//   let sameArrivalArr = [];
//   let indexJ;
//   for (let i = 0; i < processObj.length; i++) {
//     for (let j = 0; j < processObj.length; j++) {
//       //check first if the current arrival is already in sameArrivalArr
//       if (!itemExistInArray(processObj[i][0], sameArrivalArr)) {
//         if (processObj[i][0] == processObj[j][0]) {
//           sameArrival++;
//           repeated++;
//           indexJ = i;
//         }
//       }
//     }
//     sameArrivalArr.push({
//       arrival: i,
//       repeated: repeated,
//       index: indexJ,
//     });
//     repeated = 0;

//     if (sameArrival == processObj.length) {
//       return sameArrivalArr;
//     }
//   }
//   return sameArrivalArr;
// };
