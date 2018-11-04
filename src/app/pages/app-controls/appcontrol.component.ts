import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {PubSubService} from '../../services/pubSub/pubsub';
import {SocketService} from '../../services/socket/socketService';
import {HttpWrapperService} from '../../services/http/httpService';


@Component({
  selector: 'app-appcontrol',
  templateUrl: 'appcontrol.component.html',
  styleUrls: ['appcontrol.component.css']
})
export class AppControlComponent implements OnInit {

  public user: any;

  form: any = {
    name: '',
    exists: false,
    icon: '',
    forms: []
  };

  handler: any = null;
  error: any = null;
  appName = '';
  appId = '';

  constructor (
               private pubSubService: PubSubService,
               private router: Router,
               private route: ActivatedRoute,
               private socketService: SocketService,
               private httpWrapperService: HttpWrapperService
  ) {
  }


  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        const {app, id} = params;
        this.appName = app;
        this.appId = id;
        this.getApplicationControlsByName();
      });
  }

  debounce = function (fn, time)  {
    let timeout;
    return function() {
      const functionCall = function() {
        fn.apply(this, arguments);
      };

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };

  // inputChanged() {
  //   if (!this.form.name) {
  //     this.form.icon = '';
  //     return;
  //   }
  //   if (!this.handler) {
  //     this.handler = this.debounce(this.searchDb.bind(this)), 200);
  //   }
  //   this.handler();
  //
  // }

  searchDb() {
    const body = {
      data: {
        name: this.form.name,
        parentId: this.appId
      },
      proxy: {
        module: 'generic',
        method: 'findOne',
        info: {
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
      .subscribe(
        (data) => {
          const {data: serverData} = data;
          if (!serverData) {
            this.form.icon = 'icon-valid fa fa-check';

          } else {
            this.form.icon = 'icon-invalid fa fa-times';
          }
        } , // success path
        error => this.error = error // error path
      );
  }

  createControl() {
    const body = {
      data: {
        name: this.form.name,
        parentId: this.appId
      },
      proxy: {
        module: 'generic',
        method: 'add',
        info: {
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) => {
        this.form.name = '';
        this.form.icon = '';
        this.getApplicationControlsByName();
      },
          error => this.error = error
    );
  }

  getApplicationControlsByName() {
    const body = {
      data: {
        parentId: this.appId
      },
      proxy: {
        module: 'generic',
        method: 'findList',
        info: {
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) => this.form.forms = data.data, // success path
      error => this.error = error // error path
    );
  }

  goToControlDesigner(ctrl) {
    this.router.navigate(['/designer'], { queryParams: { app: this.appId, name: ctrl.name, id: ctrl._id}});
  }



  delete(app, event) {
    //event.preventDefault();
    const body = {
      data: {
        _id: app._id,
        parentId: this.appId
      },
      proxy: {
        module: 'generic',
        method: 'remove',
        info: {
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) => this.form.forms = this.form.forms.filter(el => el._id !== app._id), // success path
      error => this.error = error // error path
    );
  }
}
