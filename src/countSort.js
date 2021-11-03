// test case
let numbers = [
  [1, 6, "P1"],
  [0, 8, "P2"],
  [1, 6, "P3"],
  [0, 3, "P4"],
];

const itemExistInArray = (arrival, sameArrivalArr) => {
  for (let i = 0; i < sameArrivalArr.length; i++) {
    if (sameArrivalArr[i][0] == arrival) {
      return true;
    }
  }
  return false;
};
const countRepeatedArrival = (processObj) => {
  let repeated = [];
  let arrivalRepeated = [];
  let count = 0;

  for (let i = 0; i < processObj.length; i++) {
    if (!(processObj[i][0], arrivalRepeated)) {
      arrivalRepeated.push(processObj[i][0]);
      repeated.push(++count);
      count = 0;
    }
    console.log(itemExistInArray(processObj[i][0], arrivalRepeated));
  }
  //   console.log(arrivalRepeated);
  //   console.log(repeated);
};

const swap = (arr, a, b) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};
const sortArrival = (x) => {
  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x.length; j++) {
      // console.log(`i:${i} j:${j}`);

      if (x[i][0] < x[j][0]) {
        swap(x, i, j);
      }
      if (x[i][0] == x[j][0]) {
        if (x[i][1] < x[j][1]) {
          swap(x, i, j);
        }
        if (j != i) {
          if (x[i][1] == x[j][1]) {
            return {
              success: 0,
              message: `Equal arrival and burst is not allowed:  ${x[i][2]} & ${x[j][2]}`,
            };
          }
        }
      }
    }
  }
  return x;
};

numbers = sortArrival(numbers);
console.log(numbers);
