import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpWrapperService} from '../../../services/http/httpService';
import {LocalStorageService} from 'ngx-store';
import {PubSubService} from '../../../services/pubSub/pubsub';
import {LocalizationService} from '../../../services/localization/localization.service';
import {AuthService} from 'angular-6-social-login-v2';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  ngOnInit(): void {
  }

  private text: string;
  private httpService: HttpWrapperService;
  public user;
  sub: any;
  public mask = ['(', /[0-9]/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
// /^\d{4}-\d{3}-\d{3}/;
//  public mask = /^\d{4}-\d{3}-\d{3}/;

  ui: any = {
    companyLogo: null,
    companyName: '',
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    userOrCompany: 0,
    allowLogo: false
  };

  formErrors = {
    'email': '',
    'password': ''
  };

  // createUserForm: NgForm;
  @ViewChild('createUserForm') currentForm: NgForm;

  email: string = '';
  password: string = '';
  uiMessage: string = '';

  constructor(public _auth: AuthService, httpService: HttpWrapperService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private pubSubService: PubSubService,
              public localizationService: LocalizationService
  ) {
    this.httpService = httpService;
    this.text = 'console.log("start");';

    // fb.init({
    //   appId: '1123667347736940',
    //   version: 'v2.11'
    // });
  }

  validateEmail(emailValue) {
    // var controls = this.currentForm.form.controls;
    // if(!controls.email.isDirty)
    // {
    //   return true;
    // }
    if (!emailValue) {
      this.formErrors.email = 'Email';
      return false;
    }
    this.formErrors.email = '';
    return true;
  }

  validatePassword(passwordValue) {
    if (!passwordValue) {
      this.formErrors.password = 'Parola';
      return false;
    }
    this.formErrors.password = '';
    return true;
  }

  createUserOk(resp) {
    // this.localStorageService.set('user',resp.data);
    // this.pubSubService.publish("login", resp.data);
    // this.router.navigate(['/home']);
  }

  loginFailure() {

  }

  // private handleError(error) {
  //   console.error('Error processing action', error);
  // }

  markAsDirty(ctrlName, dirty = true) {
    //this.currentForm.controls[ctrlName].markAsDirty({onlySelf:dirty});
  }

  validateInput(ctrlName) {
    this.currentForm.controls[ctrlName].markAsDirty();
    return this.currentForm.controls[ctrlName].valid;
  }

  async submitForm() {
    this.uiMessage = '';

    var isOk = true;
    var isCtrlValid = false;
    isCtrlValid = this.validateInput('firstName');
    if (!isCtrlValid) {
      isOk = false;
    }
    isCtrlValid = this.validateInput('lastName');
    if (!isCtrlValid) {
      isOk = false;
    }
    isCtrlValid = this.validateInput('phone');
    if (!isCtrlValid) {
      isOk = false;
    }

    if (this.ui.userOrCompany === 0) {
      this.markAsDirty('numeFirma', false);
      this.markAsDirty('allowLogo', false);
    } else {
      this.markAsDirty('numeFirma');
      this.markAsDirty('allowLogo');
    }

    isCtrlValid = this.validateInput('email');
    if (!isCtrlValid) {
      isOk = false;
    }
    isCtrlValid = this.validateInput('password');
    if (!isCtrlValid) {
      isOk = false;
    }

    if (!isOk) {
      return;
    }

    // let formData: FormData = new FormData();

    // if(this.ui.companyLogo) {
    //   let fileName = this.ui.companyLogo.name;
    //   if (fileName) {
    //     formData.append('1', this.ui.companyLogo, fileName);
    //   }
    // }

    let proxy: any = {
      module: 'security',
      method: 'createUser',
    };

    // const newUI: any = { ...this.ui};
    // delete  newUI.companyLogo;
    // formData.append('data', JSON.stringify(newUI));

    // formData.append('proxy', JSON.stringify(proxy));
    //formData.append('q', JSON.stringify(q));
    //formData.append('timer', JSON.stringify(this.question.timer));

    // if (this.question.code) {
    //   formData.append('code', this.question.code);
    // }


    const resp = await this.httpService.postJsonAsync('/api/pub/security/createUser', this.ui);
    const respData: any = resp.data;
    if (!respData.success) {

      this.uiMessage = this.localizationService.language[respData.message];
      return;
    }

    this.createUserOk(respData);

    // this.loginOk(loginResponse);

  }

  ngOnDestroy() {
    // if(this.sub) {
    //   this.sub.unsubscribe();
    // }
  }

}
