import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

@Injectable()
export class HttpWrapperService {

  url = 'http://localhost:4200/assets/data/books.json';

  constructor(private http: Http) {
  }


  async getJson(url): Promise<any> {
    try {
      const response = await this.http.get(url).toPromise();
      return {
        data: response.json(),
        success: true
      };
    }
    catch (e) {
      return {
        data: null,
        success: false
      };
    }
  }

  serverUrl = '/';
  // serverUrl = 'http://localhost:6002/';


  //http://www.angulartypescript.com/angular-2-http-example-typescript/
  postObservables()
  {

  }

  async postJson(url, body): Promise<any> {
    try {
      let user : any = null;
      // console.log(user);

      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', user == null ? "" : user.token);
      let options = new RequestOptions({headers: headers});
      const apiUrl = this.serverUrl + url;
      // console.log(apiUrl);
      // console.log(body);


      const response = await this.http.post(apiUrl, body, options).toPromise();
      return response.json();
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

  async postFormData(url, formData) {
    try {
      let user : any = null;
      console.log(user);

      const apiUrl = this.serverUrl + url;
      let headers = new Headers();
      headers.append('Authorization', user == null ? "" : user.token);

      /** No need to include Content-Type in Angular 4 */
        //fu..
      //headers.append('Content-Type', 'multipart/form-data');
      //headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      const response = await this.http.post(apiUrl, formData, options).toPromise();
      return {
        data: response.json(),
        success: true
      };

    }
    catch (ex) {
      return {
        data: ex,
        success: false
      };
    }
  }


}
