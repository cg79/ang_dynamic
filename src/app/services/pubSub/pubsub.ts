import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

// import {Subject} from 'rxjs/Rx';

// import * as _ from 'lodash';

@Injectable()
export class PubSubService {

  // static instance: PubSubService;
  public dict = {};
  public memoryDictionary = {};

  constructor() {
    console.log('PUB_SUB');
  }

  // static getInstance() {
  //   if (PubSubService.instance == null) {
  //     PubSubService.instance = new PubSubService();
  //     if (!PubSubService.instance.dict) {
  //       PubSubService.instance.dict = {};
  //       PubSubService.instance.memoryDictionary = {};
  //     }
  //   }
  //   return PubSubService.instance;
  // }


  publish(eventName: string, obj: any): void {
    const inst = this; // PubSubService.getInstance();
    const subsribers = inst.dict[eventName];
    if (!subsribers) {
      return;
    }
    subsribers.next(obj);
  }

  subscribe(eventName: string, handler: ((newValue: any) => void)) {
    const inst = this; // PubSubService.getInstance();
    if (!inst.dict[eventName]) {
      inst.dict[eventName] = new Subject<any[]>();
    }
    inst.dict[eventName].subscribe(handler);
    return inst.dict[eventName];
  }


  unsubscribe(eventName: string) {
    const inst = this; // PubSubService.getInstance();
    if (!inst.dict[eventName]) {
      return;
    }
    delete inst.dict[eventName];
  }


  setKeyValue(key: string, value: any) {
    const inst = this; // PubSubService.getInstance();
    inst.memoryDictionary[key] = value;
  }

  getKeyValue(key: string) {
    const inst = this; // PubSubService.getInstance();
    return inst.memoryDictionary[key];
  }

}
