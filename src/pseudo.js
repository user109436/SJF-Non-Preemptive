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
  }
  setProcessAttr = (i) => {
    this.processObj.push(
      new Process(`p${i + 1}`, this.arrival[i], this.burst[i])
    );
  };
  start = async () => {
    let completed = 0,
      timeInSec = 0;
    do {
      //loop until complete
      for (let i = 0; i < this.process; i++) {
        //loop for sorted burst
        for (let j = 0; j < this.process; j++) {
          //loop for process object
          let s = this.burst[i];
          let p = this.processObj[j];
          if (s == p.burst) {
            //await the execute process here
            p.run();
            completed++;
          }
        }
      }
    } while (completed != this.process);
  };
  sortByArrival = () => {};
  // sortByBurst
  // getWaitingTime()=>{ }
  // getCompletiontime()=> { }
  // getTurnAroundTime()=> { }
  // getResponseTime()=> { }
}

// const x = {
//   num: 4,
//   arrival: [0, 0, 0, 0],
//   burst: [6, 8, 7, 3],
// };

const x = {
  num: 4,
  arrival: [2, 3, 4, 5],
  burst: [6, 8, 7, 3],
};
const y = new Schedule(x.num, x.arrival, x.burst);
y.start();

/* if all arrival time is not the same {
    // if no current process-> execute (according to arrival time)
    //average waiting time = sumOfAll(timeInSecond-arrival time)/# of process
}
// else {
   find lowest burst->then execute (according to burst time)
   
   average wating time = sum of(
   3
   3+6
   3+6+7
   3+6+7+8
   )/ # of process
 }
 */
// if process still ongoing -> add next process into que
// if process finished -> select from que that has minimal burst time

/*
functions
1. find lowest burst time
2. find lowest arrival time
3. check if process if finished
4. execute
5. check if same arrival time
6. check if process done
7. mark process done
*/

//result
/*
if process needs to wait log 
process # will execute at this time (formula: currentTime+waiting time)



input validation
only numbers (int & decimals)



*/
