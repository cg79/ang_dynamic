import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {PubSubService} from '../../services/pubSub/pubsub';
import {SocketService} from '../../services/socket/socketService';
import {HttpWrapperService} from '../../services/http/httpService';
import {FormsService} from "./forms.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user: any;
  appSearchDebounceHandler = null;
  controlSearchDebounceHandler = null;


  constructor (
               private pubSubService: PubSubService,
               private router: Router,
               private socketService: SocketService,
               private httpWrapperService: HttpWrapperService,
               private formsService: FormsService
  )
  {
    //this.applications = formsService.applications;
    // this.pubSubService.subscribe("logout", (userData)=>{
    //   this.user  = null;
    //
    // });


  }


  ngOnInit(): void {
    this.appGetAll();
  }

  viewApp(app) {
    debugger;
    const user = this.pubSubService.getKeyValue('user');
    const url = `/${user.name}/${app.name}`;
    this.router.navigate([url]);
  }

  debounce = (fn, time) => {
    let timeout;
    return function() {
      const functionCall = function() {
        fn.apply(this, arguments);
      };

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };


  inputChanged() {
    if(!this.formsService.appData.name) {
      this.formsService.appSetValidationClass('');
      return;
    }
    if(!this.appSearchDebounceHandler) {
      this.appSearchDebounceHandler = this.debounce(this.appSearchDb.bind(this), 200);
    }
    this.appSearchDebounceHandler();

  }

  controlNameChanged() {
    if(!this.formsService.ctrlData.name) {
      this.formsService.controlSetValidationClass('');
      return;
    }
    if(!this.controlSearchDebounceHandler) {
      this.controlSearchDebounceHandler = this.debounce(this.controlSearchDb.bind(this), 200);
    }
    this.controlSearchDebounceHandler();
  }


  appSearchDb() {
    this.formsService.appSearchDb();
  }

  appCreate() {
    this.formsService.appCreate()
  }

  appGetAll()
  {
    this.formsService.appGetAll();
  }

  appDelete(app) {
    this.formsService.appDelete(app);
  }

  selectApplication(app) {
    this.formsService.appSelect(app);
  }

  //---------------------------------------------------------------------------------------------------------------------

  gotoDesigner(control) {
    this.router.navigate(['/designer'], { queryParams: { name: control.name, id: control._id }});
    // this.router.navigate(['/controls'], { queryParams: { app: app.name, id: app._id }});
  }

  controlSearchDb() {
    this.formsService.controlSearchDb();
  }

  controlCreate() {
    this.formsService.controlCreate();
  }

  controlDelete(ctrl) {
    this.formsService.controlDelete(ctrl);
  }

  controlGetAll()
  {
    this.formsService.controlGetAll();
  }

}
