import {Injectable} from '@angular/core';
// import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {PubSubService} from "../pubSub/pubsub";

@Injectable()
export class HttpWrapperService {

  url = 'http://localhost:4200/assets/data/books.json';

  constructor(private http: HttpClient, private pubSubService: PubSubService) {

  }




  // serverUrl = '/';
  serverUrl = 'http://localhost:6002';


  //http://www.angulartypescript.com/angular-2-http-example-typescript/
  postObservables()
  {

  }

  postJson(url, body): any {
    try {
      let user : any = null;
      // console.log(user);
      user = this.pubSubService.getKeyValue('user');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': user == null ? '' : user.token
        })
      };

      const apiUrl = this.serverUrl + url;

      return this.http.post(apiUrl, body, httpOptions);

      // const response = this.http.post(apiUrl, body, httpOptions)
      //   .then(data =>  data)
      //   .catch(err => {
      //       console.error(err); // deal with API error (eg not found)
      //     return {
      //       data: null,
      //       success: false
      //     };
      //     });
      // return response;

    }
    catch (e) {
      return {
        data: null,
        success: false
      };
    }
  }


  async postJsonAsync(url, body) {

    // let promise = new Promise((resolve, reject) => {
    //
    //   const user = this.pubSubService.getKeyValue('user');
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       'Authorization': user == null ? '' : user.token
    //     })
    //   };
    //   const apiUrl = this.serverUrl + url;
    //   this.http.post(apiUrl, body, httpOptions)
    //     .toPromise()
    //     .then(
    //       res => { // Success
    //         // this.results = res.json().results;
    //         resolve(res);
    //       },
    //       msg => { // Error
    //         reject(msg);
    //       }
    //     );
    // });
    // return promise;


    try {
      const user = this.pubSubService.getKeyValue('user');
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': user == null ? '' : user.token
          })
        };

      const apiUrl = this.serverUrl + url;

      const response = await this.http.post(apiUrl, body, httpOptions).toPromise();
      return response;
      // return {
      //   data: response.json(),
      //   success: true
      // };
    }
    catch (e) {
      return {
        data: null,
        success: false
      };
    }
  }


  postJsonObs(url, body): Observable<any> {
    try {
      let user : any = null;
      // console.log(user);
      user = this.pubSubService.getKeyValue('user');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': user == null ? '' : user.token
        })
      };

      // let headers = new Headers({'Content-Type': 'application/json'});
      // headers.append('Authorization', user == null ? "" : user.token);
      // let options = new RequestOptions({headers: headers});
      const apiUrl = this.serverUrl + url;
      // console.log(apiUrl);
      // console.log(body);


      return this.http.post(apiUrl, body, httpOptions);
    }
    catch (e) {
      return null;
    }
  }

  async postFormData(url, formData) : Promise<any> {
    // try {
    //   let user : any = this.localStorageService.get('user');
    //   console.log(user);
    //
    //   const apiUrl = this.serverUrl + url;
    //   let headers = new Headers();
    //   headers.append('Authorization', user == null ? "" : user.token);
    //
    //   let options = new RequestOptions({ headers: headers });
    //   const response = await this.http.post(apiUrl, formData, options).toPromise();
    //   return {
    //     data: response.json(),
    //     success: true
    //   };
    //
    // }
    // catch (ex) {
    //   return {
    //     data: ex,
    //     success: false
    //   };
    // }
  }
}
