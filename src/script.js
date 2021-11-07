class Process {
  constructor(name, arrival, burst) {
    this.name = name;
    this.burst = burst;
    this.arrival = arrival;
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
    this.solutions = {
      averageWaitingTime: [],
      averageTurnAroundTime: [],
      numProcess: this.numProcess,
    };
    this.error;

    for (let i = 0; i < numProcess; i++) {
      this.process.push(new Process(`P${i + 1}`, arrivals[i], burst[i]));
    }
  }
  timeElapseGreaterThanArrival = (timeElapsed, sortedQue) => {
    let que = [];
    for (let i = 0; i < sortedQue.length; i++) {
      if (timeElapsed >= sortedQue[i].arrival) {
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
        this.printQue(que);
        let q = que[0];
        //find the right processName then assign the values
        p = this.getProcess(q.name);
        p.completionTime = timeElapse += q.burst; //execute lowest burst
        this.printActivity(p);
        p.turnAroundTime = timeElapse - q.arrival;
        p.waitingTime = p.turnAroundTime - q.burst;
        p.responseTime = p.waitingTime;
        this.removeInSortedQue(q.name, sortedQue); //find process name in sorted que then remove
        que.splice(0, 1); //remove from que
      } else {
        p.completionTime = timeElapse += p.burst + p.arrival;
        this.printActivity(p);
        p.turnAroundTime = timeElapse - p.arrival;
        p.waitingTime = p.turnAroundTime - p.burst;
        p.responseTime = p.waitingTime;
        sortedQue.splice(0, 1);
      }
    }
    this.process = sortedArrival;
    this.timeElapse = timeElapse;
    this.round(2);
    return sortedArrival;
  };
  printQue = (que) => {
    let queTxt = "";
    for (let i in que) {
      queTxt += `${que[i].name} `;
    }
    new Log(`Que: ${queTxt}`).logHeadingElement();
  };
  printActivity = (p) => {
    new Log(p.name + " is done", `@ ${p.completionTime}ms`).logActvityElement();
  };
  solution = () => {
    let s = this.solutions;
    let sumWT = 0,
      sumTAT = 0;
    for (let i = 0; i < this.numProcess; i++) {
      let p = this.process[i];
      s.averageWaitingTime.push(
        `${p.name} = (${p.turnAroundTime} - ${p.burst}) = ${p.waitingTime}`
      );
      s.averageTurnAroundTime.push(
        `${p.name} = (${p.completionTime} - ${p.arrival}) = ${p.turnAroundTime}`
      );
      sumTAT += parseFloat(p.turnAroundTime);
      sumWT += parseFloat(p.waitingTime);
    }
    s.averageWaitingTime.push(
      `Average Waiting Time:(${sumWT} / ${this.numProcess}) = ${
        sumWT / this.numProcess
      }ms`
    );
    s.averageTurnAroundTime.push(
      `Average Turn Around Time:(${sumTAT} / ${this.numProcess}) = ${
        sumTAT / this.numProcess
      }ms`
    );
    return this.solutions;
  };
  round = (digit) => {
    let x = this.process;
    for (let i = 0; i < this.numProcess; i++) {
      x[i].arrival = parseFloat(x[i].arrival.toPrecision(digit));
      x[i].burst = parseFloat(x[i].burst.toPrecision(digit));
      x[i].completionTime = parseFloat(x[i].completionTime.toPrecision(digit));
      x[i].turnAroundTime = parseFloat(x[i].turnAroundTime.toPrecision(digit));
      x[i].waitingTime = parseFloat(x[i].waitingTime.toPrecision(digit));
      x[i].responseTime = parseFloat(x[i].responseTime.toPrecision(digit));
    }
  };
}

class GanttChartElement {
  constructor(Schedule) {
    this.schedule = Schedule;
    this.process = this.schedule.sortCompletionTime();
    this.numProcess = this.process.length;
    this.timeElapse = this.schedule.timeElapse;
    this.taskElement();
  }
  taskElement = () => {
    let x = this.process;
    let ganttChartContent = document.getElementsByClassName(
      "gantt-chart-content"
    )[0];
    for (let i = 0; i < x.length; i++) {
      let p = x[i];
      let width = this.calculateWidthPercentage(p);
      let el = this.itemTask(p, width, i);
      ganttChartContent.innerHTML += el;
    }
  };
  calculateWidthPercentage = (process) => {
    return (process.completionTime * 100) / this.timeElapse;
  };

  itemTask = (process, width, i) => {
    let p = process;
    let el = `
       <div
              style="width: ${width}%"
              class="
                process
                ${i % 2 == 0 ? "bg-blue-300" : "bg-green-300"}
                border-2 border-green-800  ${i ? "border-r-1  border-l-0" : ""}
                relative
              "
            >
              <p class="process-name p-2">${p.name}</p>
      `;
    if (i == 0) {
      el += `
              <span class="absolute left-0 mt-3">${p.arrival}</span>
              <span class="absolute right-0 mt-3">${p.completionTime}</span>
      </div>
      `;
    }
    el += ` <span class="absolute right-0 mt-3">${p.completionTime}</span>
      </div>`;
    return el;
  };
}

class Log {
  constructor(name = "", activity = "", icon = "fas fa-microchip") {
    this.name = name;
    this.activity = activity;
    this.icon = icon;
  }
  logActvityElement = (textColor = "text-white") => {
    let el = `
         <div
                class="
                  flex
                  min-h-10
                  border-b border-gray-700
                  p-2
                "
              >
                <div class="self-center w-full flex justify-between p-2 ${textColor}">
                  <p><i class="${this.icon} fa-1x"></i> ${this.name} </p> <span class="text-gray-500 text-right">${this.activity}</span>
                </div>
        </div>
        `;
    this.append(el);
    return 1;
  };
  logHeadingElement = () => {
    let el = `
          <div
                class="
                  flex
                  h-12
                  border-b border-gray-700
                  p-2
                  text-green-500
                  items-center
                  uppercase
                "
              >
                ${this.name} ${this.activity}
              </div>
        `;
    this.append(el);
    return 1;
  };
  append = (childElement, className = "log-content") => {
    let parent = document.getElementsByClassName(`${className}`)[0];
    parent.innerHTML += childElement;
  };
}

class TableData {
  constructor(process) {
    this.process = process;
    this.tableRowElement();
  }
  tableRowElement = () => {
    let tbody = document.querySelectorAll(".table-data")[0];
    let tr = document.createElement("tr");

    for (let i in this.process) {
      let td = document.createElement("td");
      td.className = "process-name border border-green-600 p-2";
      td.innerHTML = this.process[i];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  };
}

class SolutionElement {
  constructor(solution) {
    this.solution = solution;

    this.computationElement();
  }
  computationElement = () => {
    let x = this.solution;
    for (let i = 0; i <= x.numProcess; i++) {
      this.append("average-waiting-time", `<p>${x.averageWaitingTime[i]}</p>`);
      this.append(
        "average-turn-around-time",
        `<p>${x.averageTurnAroundTime[i]}</p>`
      );
    }
  };

  append = (className, childElement) => {
    let parent = document.getElementsByClassName(`${className}`)[0];
    parent.innerHTML += childElement;
  };
}

function isObject(obj) {
  return obj && typeof obj === "object" && obj.constructor === Object;
}

let startBtn = document.getElementsByClassName("start-btn")[0];

startBtn.addEventListener("click", () => {
  let logContent = document.getElementsByClassName("log-content")[0];
  let tableData = document.getElementsByClassName("table-data")[0];
  let AWT = document.getElementsByClassName("average-waiting-time")[0];
  let ATAT = document.getElementsByClassName("average-turn-around-time")[0];
  let ganttChart = document.getElementsByClassName("gantt-chart-content")[0];
  logContent.innerHTML = "";
  tableData.innerHTML = "";
  AWT.innerHTML = "";
  ATAT.innerHTML = "";
  ganttChart.innerHTML = "";
  let numProcess = document.getElementById("num-process");
  let arrivals = document.getElementById("arrivals");
  let burst = document.getElementById("burst");
  let schedule = {};
  let error = 0;

  // number of process
  numProcess = parseInt(numProcess.value);
  if (Number.isInteger(numProcess) && numProcess >= 1) {
    schedule.process = numProcess;
  } else {
    error += 1;
    new Log("Process:", "Positive Whole Numbers Only").logActvityElement(
      "text-red-400"
    );
    return 1;
  }

  // arrivals
  let inputArrivals = arrivals.value.split(" ");
  let sanitizedArrivals = validateInputs(
    inputArrivals,
    "arrivals:Positive Numbers Only"
  );
  if (sanitizedArrivals.error > 0) {
    error += sanitizedArrivals.error;
    new Log(
      sanitizedArrivals.error,
      sanitizedArrivals.message
    ).logActvityElement("text-red-400");
  } else if (sanitizedArrivals.data.length !== numProcess) {
    error += 1;
    new Log(
      "Arrival:",
      "Not match with the number of Process"
    ).logActvityElement("text-red-400");
  } else {
    schedule.arrivals = sanitizedArrivals.data;
  }
  // ensure to fill the corresponding values  process number

  //burst
  let inputBurst = burst.value.split(" ");
  let sanitizedBurst = validateInputs(
    inputBurst,
    "burst: Greater than 0 & Positive Numbers Only ",
    1
  );
  if (sanitizedBurst.error > 0) {
    error += sanitizedBurst.error;
    new Log(sanitizedBurst.error, sanitizedBurst.message).logActvityElement(
      "text-red-400"
    );
  } else if (sanitizedBurst.data.length !== numProcess) {
    error += 1;
    new Log("Burst:", "Not match with the number of Process").logActvityElement(
      "text-red-400"
    );
  } else {
    schedule.burst = sanitizedBurst.data;
  }
  // ensure to fill the corresponding values  process number

  if (error == 0) {
    const task = new Schedule(
      schedule.process,
      schedule.arrivals,
      schedule.burst
    );

    let result = task.execute();
    let sortedTask = task.sortProcessName();
    if (isObject(result)) {
      new Log("Error:", result.message).logActvityElement("text-red-400");
    } else {
      for (let i = 0; i < sortedTask.length; i++) {
        new TableData(sortedTask[i]);
      }
      new SolutionElement(task.solution());
      new GanttChartElement(task);
    }
  }
});

validateInputs = (input, msg, min = 0) => {
  let s = input;
  let sanitized = { error: 0, msg: "", data: [] };

  for (let i = 0; i < s.length; i++) {
    s[i] = parseFloat(s[i]);
    if (s[i] >= min) {
      sanitized.data.push(s[i]);
    } else {
      sanitized.error += 1;
      sanitized.message = msg;
    }
  }
  return sanitized;
};
