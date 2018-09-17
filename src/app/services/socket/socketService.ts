import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {
  private subscribers = {};

  constructor(private socket: Socket) {

  }

  connect(){

    this.socket.on('serverMessage', (data) => {

      const subscribers = this.subscribers[data.evtName];
      if(!subscribers){
        return;
      }
      for(var i=0;i<subscribers.length; i++)
      {
        subscribers[i].executeFunction(data);
      }
    });

    this.socket.on('welcome', (data) => {

      const subscribers = this.subscribers[data.evtName];
      if(!subscribers){
        return;
      }

      for(var i=0;i<subscribers.length; i++)
      {
        subscribers[i].executeFunction(data);
      }
    });
  }

  disconnect()
  {
    this.socket.disconnect();
  }

  subscribe(event: ISocketEvent)
  {
    const subscribers = this.subscribers;

    if (!subscribers[event.evtName]) {
      subscribers[event.evtName] = [];
    } else {
      var sub = subscribers[event.evtName].find(el=>el.evtName === event.evtName && el.ctrlName == event.ctrlName);
      if (sub) {
        //already registered
        return;
      }
    }
    subscribers[event.evtName].push(event);
  }

  unsubscribe(event: ISocketEvent) {
    const subscribers = this.subscribers;

    if (!subscribers[event.evtName]) {
      return;
    }
    var sub = subscribers[event.evtName].find(el=>el.evtName === event.evtName && el.ctrlName == event.ctrlName);
    if (sub) {
      //not registered
      return;
    }
    delete subscribers[event.evtName];
  }

  sendMessage(message){
    this.socket.emit('clientMessage', message);
  }

  // getMessages() {
  //   let observable = new Observable(observer => {
  //
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //
  //     };
  //   })
  //   return observable;
  // }
}
