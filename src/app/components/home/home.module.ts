import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { homeRoutes } from './home.routes';

//common
import { ButtonComponent } from '@common/button/button.component';
import { ButtonAuthFaceComponent } from '@common/button-auth-face/button-auth-face.component';
import { PlayBarComponent } from '@common/play-bar/play-bar.component';


@NgModule({
  declarations: [
        HomeComponent,
        ButtonComponent,
        ButtonAuthFaceComponent,
        PlayBarComponent,
  ],
  imports: [
        RouterModule.forChild(homeRoutes)
  ],
  providers: [
  ],
})
export class HomeModule { }
