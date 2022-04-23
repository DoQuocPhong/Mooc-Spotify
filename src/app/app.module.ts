import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

//enum
import { Routing } from './enums/routing';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PlayBarComponent } from './common/play-bar/play-bar.component';

const routes: Routes = [
  {
    path: Routing.Home,
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: Routing.Login,
    loadChildren: () => import('./components/login-page/login-page.module').then(m => m.LoginModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,
    PlayBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {provide: ToastrManager, useClass: ToastrManager}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
