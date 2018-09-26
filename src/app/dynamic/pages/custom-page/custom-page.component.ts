import {Component, OnInit, Input} from '@angular/core';
import {PubSubService} from "../../../services/pubSub/pubsub";
import {SocketService} from "../../../services/socket/socketService";
import {HttpWrapperService} from "../../../services/http/httpService";

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {

  @Input() pageName: string = null;
  context: any = {
    id:'asf1',
    type:'container',
    childrens: []
  };
  error: any = null;

  constructor(
    private pubSubService: PubSubService,
    private socketService:SocketService,
    private httpWrapperService: HttpWrapperService
  ) { }

  getFormByName(formName)
  {
    debugger;
    const body = {
      data: {
        name: formName
      },
      proxy: {
        module: "form",
        method: "getByName"
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
      .subscribe(data =>{
          this.context = {
            ...this.context,
            childrens: [...data.data.structure || []]
          }
        },
        error => this.error = error
      );
  }

  ngOnInit() {
    this.getFormByName(this.pageName);
  }

}
