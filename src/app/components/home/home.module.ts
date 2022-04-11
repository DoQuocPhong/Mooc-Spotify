import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { homeRoutes } from './home.routes';

//common
import { ButtonComponent } from '@common/button/button.component';
import { ButtonAuthFaceComponent } from '@common/button-auth-face/button-auth-face.component';
import { ToastrManager } from 'ng6-toastr-notifications';


@NgModule({
  declarations: [
        HomeComponent,
        ButtonComponent,
        ButtonAuthFaceComponent,
  ],
  imports: [
        RouterModule.forChild(homeRoutes)
  ],
  providers: [
    {provide: ToastrManager, useClass: ToastrManager}
  ],
})
export class HomeModule { }