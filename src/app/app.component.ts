import {Component, OnInit} from '@angular/core';
import {HttpWrapperService} from "./services/http/httpService";
import {PubSubService} from "./services/pubSub/pubsub";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'anguynamic';

  error: null;

  constructor ( private httpWrapperService: HttpWrapperService, private pubSubService: PubSubService) {

  }

  async ngOnInit() {
    const body = {
      login: "test@test.com",
      password: "test",
      sendEmail: false
    };

    // const data =  this.httpWrapperService.postJson('/api/pub/security/login', body).subscribe(
    //   (data) =>this.pubSubService.setKeyValue('user', data.data), // success path
    //   error => this.error = error // error path
    // );

    const data: any = await this.httpWrapperService.postJsonAsync('/api/pub/security/login', body);
    debugger;
    this.pubSubService.setKeyValue('user', data.data);
  // .then(
  //     (data) =>this.pubSubService.setKeyValue('user', data), // success path
  //     error => this.error = error // error path
  //   );
  }
}
