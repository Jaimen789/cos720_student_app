import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { CreateModuleComponent } from './component/create-module/create-module.component';
import { ModuleRegistrationComponent } from './component/module-registration/module-registration.component';
import { ViewModuleComponent } from './component/view-module/view-module.component';
import { ViewStudentComponent } from './component/view-student/view-student.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CreateModuleComponent,
    ModuleRegistrationComponent,
    ViewModuleComponent,
    ViewStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    IonicModule.forRoot() 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
