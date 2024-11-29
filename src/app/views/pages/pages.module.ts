import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { LandingComponent } from '../landing/landing.component';
import { NotificationComponent } from '../../../components/notification/notification.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password.component';
import { RePasswordComponent } from './rePassword/re-password.component';
import { AutocompleteModule } from '../../../components/auto-complete/auto-complete.module';

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    LandingComponent,
    NotificationComponent,
    ForgotPasswordComponent,
    RePasswordComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteModule
  ]
})
export class PagesModule {
}
