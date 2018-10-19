// import { Injectable } from '@angular/core';
//
// @Injectable()

export default new class TimerSettings {
  // readonly baseAppUrl: string = 'http://localhost:57431/';
  // readonly baseAPIUrl: string = 'https://api.github.com/';

  timer: any = {
    enabled: false,
    secStart:0,
    countUp: false,
    running: false,
    seconds: 0,
    timeOptions: [
      {time: 0, desc: "No limit"},
      {time: 1, desc: "1 min"},
      {time: 5, desc: "5 min"},
      {time: 10, desc: "10 min"},
      {time: 15, desc: "15 min"},
      {time: 30, desc: "30 min"},
      {time: 60, desc: "1 h"},
      ],
    up: true
  }
}


