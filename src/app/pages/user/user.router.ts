import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from '../user/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from '../user/set-new-password/set-new-password.component';
import { LoginComponent } from './login/login.component';
import {ResetPasswordComponent} from './login/resetpassword/resetpassword.component';

const USER_ROUTER: Routes = [
  // { path: 'load-me', component: CreateUserComponent },
  {
    path: 'edituser',
    component: EditUserComponent
  },
  {
    path:'login',
    component:LoginComponent,

  },
  {
    path:'createUser',
    component:CreateUserComponent
  },
  {
    path: 'resetpassword',
    component: ChangePasswordComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path:'resetpassword',
    component:ResetPasswordComponent,
    // canActivate:[AuthGuard]
  },
];

export const userRouter = RouterModule.forChild(USER_ROUTER );

