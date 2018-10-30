/**
 * Created by Claudiu on 10/17/2018.
 */

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

import {PubSubService} from "../../services/pubSub/pubsub";
import {SocketService} from "../../services/socket/socketService";
import {HttpWrapperService} from "../../services/http/httpService";
import {Hero} from "./hero";
import {Observable} from "rxjs";

@Injectable()
export class CustomPageRendererResolve implements Resolve<Hero> {

  error: any;

  constructor( private pubSubService: PubSubService,
               private socketService: SocketService,
               private httpWrapperService: HttpWrapperService,
               private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<Hero>  {

      //   route.queryParams
      // .subscribe(params => {
      //   debugger;
      //   console.log(params); // {order: "popular"}
      //   const {app, id} = params;
      // });
debugger;
      const { url } = route;


    
    // const body = {
    //   data: {
    //     name: 'formName'
    //   },
    //   proxy: {
    //     module: "form",
    //     method: "getByName"
    //   }
    // };

    const appId = url[0].path;
    const body = {
      data: {
        userName: url[0].path,
        appName: url[1].path,
      },
      proxy: {
        module: 'form',
        method: 'getControlsForApp',
        info: {
          collection: 'controls'
        }
      }
    };
    // let id = +route.params['id'];
    return this.httpWrapperService.postJson('/api/private', body);
      // .catch(err => {
      //   console.error(err); // deal with API error (eg not found)
      //   this.router.navigate(['/']); // could redirect to error page
      //   return Observable.empty<Hero>();
      // });
      // .subscribe(data =>{
      //     // this.context = {
      //     //   ...this.context,
      //     //   childrens: [...data.data.structure || []]
      //     // }
      //   const result = new Hero();
      //   return result;
      //   },
      //   error => { this.error = error; return }
      // );
  }
}
