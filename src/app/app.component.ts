import {Component, OnInit} from '@angular/core';
import {HttpWrapperService} from "./services/http/httpService";
import {PubSubService} from "./services/pubSub/pubsub";
import {LocalStorageService} from "ngx-store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'anguynamic';

  error: null;

  constructor ( private localStorageService: LocalStorageService,
                private httpWrapperService: HttpWrapperService, private pubSubService: PubSubService) {

  }

  async ngOnInit() {
    const body = {
      login: "test@test.com",
      password: "test",
      sendEmail: false
    };

    const loggedUser = this.localStorageService.get('user');
    if(loggedUser) {
      this.pubSubService.setKeyValue('user', loggedUser);
      this.pubSubService.publish('login',loggedUser);
    }else{
      // const data: any = await this.httpWrapperService.postJsonAsync('/api/pub/security/login', body);
      // this.pubSubService.setKeyValue('user', data.data);
    }
    // const data =  this.httpWrapperService.postJson('/api/pub/security/login', body).subscribe(
    //   (data) =>this.pubSubService.setKeyValue('user', data.data), // success path
    //   error => this.error = error // error path
    // );


  // .then(
  //     (data) =>this.pubSubService.setKeyValue('user', data), // success path
  //     error => this.error = error // error path
  //   );
  }
}
