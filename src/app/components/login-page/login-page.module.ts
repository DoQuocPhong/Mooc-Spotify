import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page.component';

import { loginRoutes } from './login-page.routes';


@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
        RouterModule.forChild(loginRoutes)
  ]
})
export class LoginModule { }
