import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

// import {Subject} from 'rxjs/Rx';

// import * as _ from 'lodash';

@Injectable()
export class PubSubService {

  public dict = null;
  public memoryDictionary = null;
  static instance:PubSubService;

  constructor() {
  }
//s
  static getInstance() {
        if (PubSubService.instance == null) {
            PubSubService.instance = new PubSubService();
            if(!PubSubService.instance.dict)
            {
              PubSubService.instance.dict = {};
              PubSubService.instance.memoryDictionary = {};
            }
        }
        return PubSubService.instance;
    }


  publish(eventName:string, obj: any): void {
    let inst = PubSubService.getInstance();
    var subsribers = inst.dict[eventName];
    if(!subsribers)
    {
      return;
    }
    subsribers.next(obj);
  }

  subscribe(eventName:string,handler: ((newValue: any) => void)) {
    let inst = PubSubService.getInstance();
    if(!inst.dict[eventName])
    {
      inst.dict[eventName] = new Subject<any[]>();
    }
    inst.dict[eventName].subscribe(handler);
  }

  setKeyValue(key:string,value:any)
  {
    let inst = PubSubService.getInstance();
    inst.memoryDictionary[key]= value;
  }
  getKeyValue(key:string)
  {
    let inst = PubSubService.getInstance();
    return inst.memoryDictionary[key];
  }

}
