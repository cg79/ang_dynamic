import {Component, OnInit, OnDestroy, ViewChild, AfterViewChecked} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "angular-6-social-login-v2";
import {HttpWrapperService} from "../../../../services/http/httpService";
import {LocalStorageService} from "ngx-store";

@Component({
  selector: 'app-resetpassword',
  templateUrl: 'resetpassword.component.html',
  styleUrls: ['resetpassword.component.css']
})

export class ResetPasswordComponent implements OnDestroy  {

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

  constructor(public _auth: AuthService,
              httpService: HttpWrapperService,
              private router: Router,
              private localStorageService: LocalStorageService,
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
    //   }
    // )
  }

  // private handleError(error) {
  //   console.error('Error processing action', error);
  // }

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
    if(!this.validateEmail(this.email))
    {
      return;
    }
    if(!this.validatePassword(this.password))
    {
      return;
    }

    const loginRequest = {
      email:this.email,
      password: this.password
    };

    const loginResponse  = await this.httpService.postJson("login",loginRequest);

    // this.localStorageService.set('user',loginResponse);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});

  }

  ngOnDestroy(){
    // if(this.sub) {
    //   this.sub.unsubscribe();
    // }
  }

}
