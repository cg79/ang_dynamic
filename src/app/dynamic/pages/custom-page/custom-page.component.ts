import {Component, OnInit, Input} from '@angular/core';
import {PubSubService} from "../../../services/pubSub/pubsub";
import {SocketService} from "../../../services/socket/socketService";
import {HttpWrapperService} from "../../../services/http/httpService";
import {ActionService} from "../../../services/actions/actionService";

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
  ) {

    const evt: ISocketEvent = {
      evtName: "form_updated",
      executeFunction: this.formUpdated.bind(this)
    };


    this.socketService.subscribe(evt);

    this.pubSubService.subscribe("exec", async (ctrlCtx)=>{
      debugger;
      const { actions } = ctrlCtx;
      if(! actions) {
        return;
      }

      await this.executeActions(actions);

    });
  }

  responseActions : any = {

  };

  async executeActions(actions) {
    this.responseActions = {};
    this.createFormValues(this.context);


    for(let i=0;i<actions.length;i++) {
      const action = actions[i];
      const resp  = await this.executeAction(action);
      if(this.info && this.info.name) {
        this.responseActions[this.info.name] = resp;
      }
    }
  }

  info: any  = null;
  async executeAction(action) {
    debugger;
    const type = Object.keys(action)[0];
    switch (type) {
      case 'http' : {
        const info = action.http;
        this.info = null;

        const { url } = info;
        const req = {
          proxy : info.proxy,
          data: this.responseActions[info.data]
        };
        const response = await this.httpWrapperService.postJsonAsync(url, req);
        return response;
        // console.log(response);
      }
      case 'getCtrsValue' :{
        const info = action.getCtrsValue;
        this.info = info;

        const response = {

        };
        response[info.name] = {};

        const data = response[info.name];

        const { controls } = info;
        for (let i=0;i< controls.length;i++)
        {
          let ctrl = controls[i];
          const { id , property} = ctrl;
          if(property && this.formValues[id] !== undefined) {
            data[property] = this.formValues[id];
          }
        }
        return response;
      }

    }
  }

  formUpdated(data) {
    debugger;
    if (this.pageName !== data.name) {
      return;
    }
    this.context = {...this.context};
    this.context.childrens = [];
    this.context.childrens.push(...data.structure);
  }

  getFormByName(formName)
  {
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

  formValues = {};
  createFormValues  =(node) =>{
    if(node.id) {
      this.formValues[node.id] = node.value;
    }
    const { childrens } = node;
    if(childrens) {
      for (let i = 0; i < childrens.length; i++) {
        const id = childrens[i].id;
        if (id) {
            this.formValues[id] = childrens[i].value;
        }
        this.createFormValues(childrens[i]);
      }
    }
  }

}
