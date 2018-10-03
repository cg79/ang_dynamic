import {Injectable} from '@angular/core';
// import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {PubSubService} from "../pubSub/pubsub";
import {HttpWrapperService} from "../http/httpService";

@Injectable()
export class ActionService {


  constructor(private http: HttpWrapperService, private pubSubService: PubSubService) {
    // this.pubSubService.subscribe("exec", (actions)=>{
    //   debugger;
    //   for(let i=0;i<actions.length;i++) {
    //     const action = actions[i];
    //   }
    // });
  }

  executeAction(action) {
    switch (action.type) {
      case 'http' : {

      }

    }
  }



}
