import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {HttpWrapperService} from "../../../services/http/httpService";
import {LocalizationService} from "../../../services/localization/localization.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private  httpService: HttpWrapperService, private router: Router, private activatedRoute: ActivatedRoute, public localizationService: LocalizationService) { }

  ui: any = {
    password:'',
    passwordConfirm:''
  };
  uiMessage: string = '';
  @ViewChild('changePasswordForm') currentForm: NgForm;
  securityCode:string = '';

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.securityCode = params['reset'];
    });
  }

  validateInput(ctrlName){
    this.currentForm.controls[ctrlName].markAsDirty();
    return this.currentForm.controls[ctrlName].valid;
  }

  passwordReseted(resp)
  {

    this.uiMessage = this.localizationService.language[resp.data.message];
    // this.router.navigate(['/login']);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});
  }

  async submitForm(){
    this.uiMessage = '';

    var isOk  = true;
    var isCtrlValid  =false;
    isCtrlValid = this.validateInput('password');
    if(!isCtrlValid){isOk = false;}

    isCtrlValid = this.validateInput('passwordConfirm');
    if(!isCtrlValid){isOk = false;}



    if(!isOk){
      return;
    }

    if(this.ui.password != this.ui.passwordConfirm){
      this.currentForm.controls['passwordConfirm'].setErrors({match:1});
      isOk = false;
    }

    if(!isOk){
      return;
    }

    const req: any = {
      proxy: {
        module: 'security',
        method: 'resetPassword',
      },
      data: {
        reset: this.securityCode,
        password: this.ui.password
      }
    };




    const respData = await this.httpService.postJson("api/pub", req);
    // console.log(resp);


    if(!respData.success){
      //http://localhost:4200/resetpassword?reset=222dea52-8dbf-411c-8d5a-31b37fa31e3d
      const uiText = respData.message || respData.data.message;
      this.uiMessage = this.localizationService.language[uiText];
      return;
    }

    this.passwordReseted(respData);
  }

}
