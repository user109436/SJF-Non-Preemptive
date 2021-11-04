class Process {
  constructor(name, arrival, burst) {
    this.name = name;
    this.arrival = arrival;
    this.burst = burst;
    this.completionTime = 0;
    this.turnAroundTime = 0;
    this.waitingTime = 0;
    this.responseTime = 0;
  }
}

class Schedule {
  constructor(numProcess, arrivals = [], burst = []) {
    this.numProcess = numProcess;
    this.process = [];
    this.timeElapse = 0;
    this.averageTurnAroundTime = 0;
    this.averageWaitingTime = 0;
    this.error;

    for (let i = 0; i < numProcess; i++) {
      this.process.push(new Process(`P${i + 1}`, arrivals[i], burst[i]));
      //   this.process.push({
      //     name: `P${i + 1}`,
      //     arrival: arrivals[i],
      //     burst: burst[i],
      //     completionTime: 0,
      //     waitingTime: 0,
      //     turnAroundTime: 0,
      //   });
    }
  }
  timeElapseGreaterThanArrival = (timeElapsed, sortedQue) => {
    let que = [];
    for (let i = 0; i < sortedQue.length; i++) {
      if (timeElapsed > sortedQue[i].arrival) {
        que.push(sortedQue[i]);
      }
    }
    return que;
  };
  sortArrival = () => {
    let sortedArrival = [...this.process];
    for (let i = 0; i < this.numProcess; i++) {
      for (let j = 0; j < this.numProcess; j++) {
        let a = sortedArrival[i],
          b = sortedArrival[j];
        if (a.arrival < b.arrival) {
          this.swap(sortedArrival, i, j);
        }
        if (a.arrival == b.arrival) {
          if (a.burst < b.burst) {
            this.swap(sortedArrival, i, j);
          }
          this.error = this.sameArrivalAndBurst(sortedArrival, i, j);
          if (this.error) {
            return false;
          }
        }
      }
    }
    return sortedArrival;
  };
  sortBurst = (que) => {
    for (let i = 0; i < que.length; i++) {
      for (let j = 0; j < que.length; j++) {
        let a = que[i],
          b = que[j];
        if (a.burst < b.burst) {
          this.swap(que, i, j);
        }
        if (a.burst == b.burst) {
          if (a.arrival < b.arrival) {
            this.swap(que, i, j);
          }
        }
      }
    }
    return que;
  };
  sortCompletionTime = () => {
    let x = this.process;
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x.length; j++) {
        if (x[i].completionTime < x[j].completionTime) {
          this.swap(x, i, j);
        }
      }
    }
    return x;
  };
  sortProcessName = () => {
    let x = this.process;
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x.length; j++) {
        if (x[i].name[1] < x[j].name[1]) {
          this.swap(x, i, j);
        }
      }
    }
    return x;
  };
  swap = (arr, a, b) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };
  sameArrivalAndBurst = (arr, i, j) => {
    if (j != i) {
      if (arr[i].burst == arr[j].burst) {
        return {
          success: 0,
          message: `Equal arrival and burst is not allowed:  ${arr[i].name} & ${arr[j].name}`,
        };
      }
    }
    return false;
  };
  removeInSortedQue = (processName, sortedQue) => {
    for (let i = 0; i < sortedQue.length; i++) {
      if (processName == sortedQue[i].name) {
        return sortedQue.splice(i, 1);
      }
    }
  };
  getProcess = (processName) => {
    for (let i = 0; i < this.numProcess; i++) {
      if (this.process[i].name == processName) {
        return this.process[i];
      }
    }
  };
  execute = () => {
    let sortedArrival = this.sortArrival();
    if (!sortedArrival) {
      return this.error;
    }
    let sortedQue = [...sortedArrival];
    let timeElapse = 0;
    for (let i = 0; i < this.numProcess; i++) {
      let p = sortedArrival[i];

      if (timeElapse) {
        let que = this.timeElapseGreaterThanArrival(timeElapse, sortedQue);
        que = this.sortBurst(que); //find lowest burst in que
        let q = que[0];
        //find the right processName then assign the values
        p = this.getProcess(q.name);
        p.completionTime = timeElapse += q.burst; //execute lowest burst
        p.turnAroundTime = timeElapse - q.arrival;
        p.waitingTime = p.turnAroundTime - q.burst;
        p.responseTime = p.waitingTime;
        this.averageWaitingTime += p.waitingTime;
        this.averageTurnAroundTime += p.turnAroundTime;
        this.removeInSortedQue(q.name, sortedQue); //find process name in sorted que then remove
        que.splice(0, 1); //remove from que
      } else {
        p.completionTime = timeElapse += p.burst;
        p.turnAroundTime = timeElapse - p.arrival;
        p.waitingTime = p.turnAroundTime - p.burst;
        p.responseTime = p.waitingTime;
        this.averageWaitingTime += p.waitingTime;
        this.averageTurnAroundTime += p.turnAroundTime;
        sortedQue.splice(0, 1);
      }
    }
    this.averageTurnAroundTime /= this.numProcess;
    this.averageWaitingTime /= this.numProcess;
    this.process = sortedArrival;
    return sortedArrival;
  };
}
/*TEST CASES*/
// const x = {
//   process: 5,
//   arrival: [2, 5, 1, 0, 4],
//   burst: [6, 2, 8, 3, 4],
// };

// const x = {
//   process: 5,
//   arrival: [2, 1, 4, 0, 2],
//   burst: [1, 5, 1, 6, 3],
// };

// const x = {
//   process: 4,
//   arrival: [0, 0, 0, 0],
//   burst: [6, 8, 7, 3],
// };
// const x = {
//   process: 4,
//   arrival: [1, 1, 0, 0],
//   burst: [6, 8, 7, 3],
// };
// const x = {
//   process: 4,
//   arrival: [0, 0, 0, 0],
//   burst: [6, 8, 6, 3],
// };

function isObject(obj) {
  return obj && typeof obj === "object" && obj.constructor === Object;
}
const y = new Schedule(x.process, x.arrival, x.burst);
let z = y.execute();
if (isObject(z)) {
  console.log(z);
}
