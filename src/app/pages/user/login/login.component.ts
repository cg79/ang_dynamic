import {Component, OnInit, OnDestroy, ViewChild, AfterViewChecked} from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpWrapperService } from '../../../services/http/httpService'
import { Router } from '@angular/router';
import {LocalStorageService} from "ngx-store";
import {PubSubService} from "../../../services/pubSub/pubsub";
import {LocalizationService} from "../../../services/localization/localization.service";
import {IHttpResponse} from "../../../facade/IHttpResponse";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnDestroy  {

  private text: string;
  private  httpService: HttpWrapperService;
  public user;
  sub: any;

  formErrors = {
    'email': 'ddd',
    'password': 'sss'
  };

  myForm: NgForm;
  @ViewChild('myForm') currentForm: NgForm;

  email: string = '';
  password: string = '';
  uiMessage: string = '';

  constructor(
              httpService: HttpWrapperService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private pubSubService: PubSubService,
              public localizationService: LocalizationService
              //private fb: FacebookService
  )
  {
    this.httpService = httpService;
    this.text = 'console.log("start");';

    // fb.init({
    //   appId: '1123667347736940',
    //   version: 'v2.11'
    // });
  }

  validateEmail(emailValue)
  {
    // var controls = this.currentForm.form.controls;
    // if(!controls.email.isDirty)
    // {
    //   return true;
    // }
    if(!emailValue)
    {
      this.formErrors.email = "Email";
      return false;
    }
    this.formErrors.email = "";
    return true;
  }

  validatePassword(passwordValue)
  {
    if(!passwordValue)
    {
      this.formErrors.password = "Parola";
      return false;
    }
    this.formErrors.password = "";
    return true;
  }

  loginOk(resp)
  {
    const {data} = resp;
    this.localStorageService.set('user',data);
   this.pubSubService.publish("login", data);
    this.router.navigate(['/home']);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});
  }

  loginFailure()
  {

  }

  loginWithFB(){
    // this.fb.login()
    //   .then((res: LoginResponse) => {
    //     console.log('Logged in', res);
    //   })
    //   .catch(this.handleError);

    const self = this;
    const provider = 'facebook';
    // this.sub = this._auth.login(provider)
    //   .subscribe((data:any) => {
    //     // console.log(data);
    //     self.email = data.email;
    //     //user data
    //     //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google)
    //       const loginRequest: any = {
    //         email:self.email,
    //         //password: this.password
    //       };
    //
    //       try{
    //         var names = data.name.match(/\w+/g);
    //         loginRequest.firstName = names[0];
    //         loginRequest.lastName = names[1];
    //
    //       }catch (e){
    //
    //       }
    //       const loginResponsePromise  = this.httpService.postJson("api/pub/security/loginfb",loginRequest);
    //       loginResponsePromise.then(function (resp) {
    //         self.loginOk(resp);
    //       });
    // }
    // )
  }



  logoutFB(){

    // this._auth.logout().subscribe(
    //   (data)=>
    //   {
    //     this.user=null;
    //   }
    // )
  }

  async submitForm()
  {
    this.uiMessage = '';
    if(!this.validateEmail(this.email))
    {
      return;
    }
    if(!this.validatePassword(this.password))
    {
      return;
    }

    const loginRequest = {
      login:this.email,
      password: this.password
    };

    let loginResponse : IHttpResponse = null;
    loginResponse = await this.httpService.postJsonAsync("/api/pub/security/login",loginRequest);

    if(loginResponse.success === false)
    {
      this.uiMessage = 'Invalid login ';
      return;
    }
    this.loginOk(loginResponse);

  }

  ngOnDestroy(){
    // if(this.sub) {
    //   this.sub.unsubscribe();
    // }
  }

}
