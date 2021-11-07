class Process {
  constructor(name, burst, arrival) {
    this.name = name;
    this.burst = burst;
    this.arrival = arrival;
    this.completionTime = 0;
    this.turnAroundTime = 0;
    this.waitingTime = 0;
    this.responseTime = 0;
  }
}
//Algorithm SJF Non-preemptive

class Schedule {
  constructor(numProcess, arrivals = [], burst = []) {
    this.numProcess = numProcess;
    this.process = [];
    this.timeElapse = 0;
    for (let i = 0; i < numProcess; i++) {
      this.process.push(new Process(`P${i + 1}`, burst[i], arrivals[i]));
    }
  }

  swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  sortArrival = () => {
    //sort by swapping
    for (let i = 0; i < this.numProcess; i++) {
      //   y-axis
      for (let j = 0; j < this.numProcess; j++) {
        //swap
        let x = this.process[i],
          y = this.process[j];
        if (x.arrival < y.arrival) {
          this.swap(this.process, i, j);
        }
      }
    }
  };
  sortBurst = (que) => {
    //sort by swapping
    for (let i = 0; i < que.length; i++) {
      //   y-axis
      for (let j = 0; j < que.length; j++) {
        //swap
        let x = que[i],
          y = que[j];
        if (x.burst < y.burst) {
          this.swap(que, i, j);
        }
      }
    }
    return que;
  };
  timeElapseGreaterThanArrival = (timeElapsed, sortedQue) => {
    let que = [];
    for (let i = 0; i < sortedQue.length; i++) {
      if (timeElapsed >= sortedQue[i].arrival) {
        que.push(sortedQue[i]);
      }
    }
    return que;
  };

  getProcess = (processName) => {
    for (let i = 0; i < this.numProcess; i++) {
      if (this.process[i].name == processName) {
        return this.process[i];
      }
    }
  };
  removeInSortedQue = (processName, sortedQue) => {
    for (let i = 0; i < sortedQue.length; i++) {
      if (processName == sortedQue[i].name) {
        return sortedQue.splice(i, 1);
      }
    }
  };
  calculate = () => {
    this.sortArrival();
    let timeElapse = 0;
    let sortedQue = [...this.process];
    for (let i = 0; i < this.numProcess; i++) {
      let p = this.process[i];
      if (timeElapse) {
        //check process that arrived
        //timeElapse>arrivalTime
        let q = this.timeElapseGreaterThanArrival(timeElapse, sortedQue);
        //sort out by burst
        q = this.sortBurst(q);
        q = q[0];
        p = this.getProcess(q.name);
        p.completionTime = q.arrival + q.burst;
        p.turnAroundTime = q.completionTime - q.arrival;
        p.waitingTime = q.turnAroundTime - q.burst;
        p.responseTime = q.waitingTime;
        timeElapse += q.completionTime;
        this.removeInSortedQue(q.name, sortedQue);
      } else {
        //execute
        p.completionTime = p.arrival + p.burst;
        p.turnAroundTime = p.completionTime - p.arrival;
        p.waitingTime = p.turnAroundTime - p.burst;
        p.responseTime = p.waitingTime;
        timeElapse += p.completionTime;
        sortedQue.splice(0, 1);
      }
    }
  };
}

let y = new Schedule(5, [4, 3, 2, 1, 0], [6, 8, 7, 3, 0]);
// y.sortArrival();
// y.calculate();
// console.log(y.process);

const x = [
  [0, 6, "P1"],
  [0, 8, "P2"],
  [0, 7, "P3"],
  [0, 3, "P4"],
];

// console.log(x[0][0]);

const object = [
  {
    name: "P1",
    arrival: 0,
    burst: 6,
  },
  {
    name: "P2",
    arrival: 0,
    burst: 8,
  },
];
// console.log(object[0].arrival);

// let arr = [0, 1, 2];
// let arr2 = [...arr];
// arr2.splice(0, 1);
// console.log(arr2);

// const swap = (arr, i, j) => {
//   let temp = a;
//   a = b;
//   b = temp;
//   console.log(`a:${a} b:${b}`);
// };

// // swap(1, 2);

// console.log(`a:${a} b:${b}`);

// for (let i = 0; i < 5; i++) {
//   for (let j = 0; j < 5; j++) {
//     console.write(`${i} ${j}`);
//   }
// }
// let arr = [1, 0];
// if (0 < 1) {
//   console.log("less than");
// }

let number = 9.8 - 6;
number = number.toPrecision(2);
console.log(number);
