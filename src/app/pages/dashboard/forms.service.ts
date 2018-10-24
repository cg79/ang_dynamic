import { Injectable } from '@angular/core';
import {HttpWrapperService} from "../../services/http/httpService";

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  appData: any = {
    name: '',
    icon: ''
  };
  applications = [];
  selectedApplication : any =null;

  ctrlData: any = {
    name: '',
    icon: ''
  };
  controls = [];

  error: any = null;

  constructor(private httpWrapperService: HttpWrapperService,) { }

  appSetValidationClass(value) {
    this.appData.icon = value;
  }


  appSearchDb() {
    const body = {
      data: {
        name: this.appData.name
      },
      proxy: {
        module: 'generic',
        method: 'findOne',
        info: {
          collection: 'applications'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
        .subscribe(
            (data) => {
              const {data: serverData} = data;
              if (!serverData) {
                this.appData.icon = 'icon-valid fa fa-check';

              } else {
                this.appData.icon = 'icon-invalid fa fa-times';
              }
            } , // success path
            error => this.error = error // error path
        );
  }

  appCreate() {
    const body = {
      data: {
        name: this.appData.name
      },
      proxy: {
        module: 'generic',
        method: 'add',
        info: {
          collection: 'applications'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
        .subscribe(
            (data) => {
              const {data: serverData} = data;
              if (!serverData) {
                this.appData.icon = 'icon-valid fa fa-check';

              } else {
                this.appData.icon = 'icon-invalid fa fa-times';
              }
            } , // success path
            error => this.error = error // error path
        );
  }

  appGetAll() {
    const body = {
      data: {
        name: this.appData.name
      },
      proxy: {
        module: 'generic',
        method: 'find',
        info: {
          collection: 'applications'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
        .subscribe(
            (data) => {
              const {data: serverData} = data;
              this.applications = serverData;
            } , // success path
            error => this.error = error // error path
        );
  }

  appDelete(app) {
    if(!app) {
      return;
    }
    const body = {
      data: {
        _id: app._id
      },
      proxy: {
        module: 'generic',
        method: 'find',
        info: {
          collection: 'applications'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
        .subscribe(
            (data) => {
              const {data: serverData} = data;
              this.applications = serverData;
            } , // success path
            error => this.error = error // error path
        );
  }

  appSelect(app) {
    this.applications.map(el =>  el.css = '');
    app.css = 'selected';
    this.selectedApplication = app;
  }

  //---------------------------------------------------------------------------------------------------------------------------

  controlSearchDb() {
    const body = {
      data: {
        name: this.appData.name
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
                this.appData.icon = 'icon-valid fa fa-check';

              } else {
                this.appData.icon = 'icon-invalid fa fa-times';
              }
            } , // success path
            error => this.error = error // error path
        );
  }

  controlCreate() {
    const body = {
      data: {
        name: this.appData.name
      },
      proxy: {
        module: 'generic',
        method: 'add',
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
                this.ctrlData.icon = 'icon-valid fa fa-check';

              } else {
                this.ctrlData.icon = 'icon-invalid fa fa-times';
              }
            } , // success path
            error => this.error = error // error path
        );
  }

  controlGetAll() {
    const body = {
      data: {
        parentId: this.selectedApplication._id
      },
      proxy: {
        module: 'generic',
        method: 'find',
        info: {
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
        .subscribe(
            (data) => {
              const {data: serverData} = data;
              this.applications = serverData;
            } , // success path
            error => this.error = error // error path
        );
  }

  controlDelete(ctrl) {
    if(! this.selectedApplication) {
      return;
    }
    const body = {
      data: {
        _id: ctrl._id
      },
      proxy: {
        module: 'generic',
        method: 'remove',
        info: {
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
        .subscribe(
            (data) => {
              const {data: serverData} = data;
              this.applications = serverData;
            } , // success path
            error => this.error = error // error path
        );
  }

  controlSelect(app) {
    this.applications.map(el =>  el.css = '');
    app.css = 'selected';
    this.selectedApplication = app;
  }

  controlSetValidationClass(value) {
    this.ctrlData.icon = value;
  }


}
