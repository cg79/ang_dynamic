import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpWrapperService} from "../../../services/http/httpService";
import {LocalizationService} from "../../../services/localization/localization.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private  httpService: HttpWrapperService, private router: Router,
              public localizationService: LocalizationService) { }

  ui: any = {
    email:''
  };
  uiMessage: string = '';
  @ViewChild('resetPasswordForm') currentForm: NgForm;
  ngOnInit() {
  }

  validateInput(ctrlName){
    this.currentForm.controls[ctrlName].markAsDirty();
    return this.currentForm.controls[ctrlName].valid;
  }

  passwordReseted(resp)
  {

    this.uiMessage = this.localizationService.language['check_forgot_password'];
    // this.router.navigate(['/login']);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});
  }

  async submitForm(){
    this.uiMessage = '';

    var isOk  = true;
    var isCtrlValid  =false;
    isCtrlValid = this.validateInput('email');
    if(!isCtrlValid){isOk = false;}
    if(!isOk){
      return;
    }

    const req: any = {
      proxy: {
        module: 'security',
        method: 'forgotPassword',
      },
      data: this.ui
    };




    const respData = await this.httpService.postJson("api/pub", req);
    // console.log(resp);


    if(!respData.success){

      this.uiMessage = this.localizationService.language[respData.message];
      return;
    }

    this.passwordReseted(respData);
  }

}
