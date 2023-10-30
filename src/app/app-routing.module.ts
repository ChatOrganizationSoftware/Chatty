import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'sign-up',
    component:SignUpComponent
  },
  {
    path: 'logout',
    component:LogoutComponent
  },
  {
    path: 'forgot-password',
    component: ResetPasswordComponent
  },
  {
    path: 'verify-email',
    component:VerifyEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
