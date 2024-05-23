import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { CreateModuleComponent } from './component/create-module/create-module.component';
import { ModuleRegistrationComponent } from './component/module-registration/module-registration.component';
import { ViewModuleComponent } from './component/view-module/view-module.component';
import { ViewLogsComponent } from './component/view-logs/view-logs.component';

import { AuthGuardService } from './shared/auth-guard.service'


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardService], data: { roles: ['Admin'] }},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Student' , 'Lecturer'] }},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent, canActivate: [AuthGuardService] , data: { roles: ['Admin', 'Student' , 'Lecturer']}},
  {path: 'create-module', component: CreateModuleComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Lecturer']}},
  {path: 'module-registration', component: ModuleRegistrationComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Student']}},
  {path: 'view-module', component: ViewModuleComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Student']}},
  {path: 'view-logs', component: ViewLogsComponent, canActivate: [AuthGuardService], data: { roles: ['Admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
