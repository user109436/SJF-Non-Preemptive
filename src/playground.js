let s = 3;
let timeInSec = 1;
let date = new Date();
let seconds = date.getSeconds();

let executeTime = setInterval(() => {
  if (s != timeInSec) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(today);

    //log time
    console.log(`time: ${timeInSec++}`);
  } else {
    let newDate = new Date();
    let newSeconds = newDate.getSeconds() - seconds;
    console.log(newSeconds);
    // stop
    clearInterval(executeTime);
  }
}, 1000);
