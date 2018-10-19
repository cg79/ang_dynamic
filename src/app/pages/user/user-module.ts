import {NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from '../user/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from '../user/set-new-password/set-new-password.component';
import { LoginComponent } from './login/login.component';
import {ResetPasswordComponent} from './login/resetpassword/resetpassword.component';

import { userRouter } from './user.router';
import {SharedModule} from "../footer/shared-module";

@NgModule({
  imports: [CommonModule,FormsModule,SharedModule,userRouter],
  declarations: [
    CreateUserComponent,
    // ConfirmEmailComponent,
    ChangePasswordComponent,
    EditUserComponent,
    ForgotPasswordComponent,
    SetNewPasswordComponent,
    LoginComponent,
    ResetPasswordComponent,
  ],
})
export class UserModule {

}
