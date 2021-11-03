const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const timestamp = new Date().getSeconds();
class Process {
  constructor(name, arrival, burst = 0) {
    this.name = name;
    this.arrival = arrival;
    this.burst = burst;
    this.running = 0;
    this.completionTime = 0; //completion time = 0 to currentTimeinSec
    this.turnAroundTime = 0; //completion time - arrival time
    this.waitingTime = 0; // turnArrounTime - burstTime
    this.responseTime = 0; //currentTimeinSec-arrivalTime
    //   TAT= WT+BT
  }
  run = async () => {
    // wait for it's burst time
    this.running = 1;
    console.log(
      `Process ${this.name} is running time elapsed: ${this.completionTime}`
    );
    await sleep(this.burst * 1000);
    console.log(`Process ${this.name} is finished`);
    this.running = 0;
    this.finished = new Date().getSeconds();
    console.log(this.finished - timestamp);
    return this.burst;
    // return this.finished - timestamp;
  };
}
class Schedule {
  constructor(numProcess, arrival = [], burst = []) {
    this.process = numProcess;
    this.arrival = arrival;
    this.burst = burst;
    this.processObj = [];
    this.que = [];
    for (let i = 0; i < this.process; i++) {
      this.setProcessAttr(i);
    }
    this.burst.sort();
    this.arrival.sort();
  }
  setProcessAttr = (i) => {
    this.processObj.push(
      new Process(`p${i + 1}`, this.arrival[i], this.burst[i])
    );
  };
  start = async () => {
    let timeInSec = 0;
    for (let i = 0; i < this.process; i++) {
      let p = this.processObj[i];

      if (i == 0) {
        //no process running
        timeInSec = await this.getEarliestArrival(i).run(); //bug if they all have same arrival
      }

      if (
        p.arrival < timeInSec ||
        (this.isAnyProcessRunning() && p.completionTime != 0)
      ) {
        //add the process to que then sort according to burst
        //if there process runing check que then run according to burst
        this.que.push(this.getEarliestArrival(i));
        // this.runAccordingToBurst(i);

        //   sortQueByBurst(); //will do later
      } else {
        //   timeInSec = this.getEarliestArrival(i).run();
        console.log("what to do here");
      }
      console.log(`index:${i}`);

      //run according to arrival time
    }
    console.log(this.que);
  };
  getEarliestArrival = (i) => {
    for (let j = 0; j < this.process; j++) {
      if (this.arrival[i] == this.processObj[j].arrival) {
        return this.processObj[j];
        // console.log(`process:${this.processObj[j].name}`);
      }
    }
  };
  getEarliestBurst = (i) => {
    for (let j = 0; j < this.process; j++) {
      if (this.burst[i] == this.processObj[j].burst) {
        return this.processObj[j];
        // console.log(`process:${this.processObj[j].name}`);
      }
    }
  };
  isAnyProcessRunning = (running = 0) => {
    for (let i of this.processObj) {
      if (i.running) {
        running++;
      }
    }
  };

  // sortAccordingToBurst()=>{

  // }
}

// const x = {
//   num: 4,
//   arrival: [0, 0, 0, 0],
//   burst: [6, 8, 7, 3],
// };

const x = {
  num: 5,
  arrival: [2, 1, 4, 0, 3],
  burst: [1, 5, 1, 6, 3],
};
const y = new Schedule(x.num, x.arrival, x.burst);
y.start();
// y.isAnyProcessRunning();

/*
case 1 if all arrival time is same
run the lowest burst time

case 2 if all arrival time not same
run according to arrival time
*/
