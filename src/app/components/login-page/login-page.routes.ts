import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page.component";

export const loginRoutes: Routes = [
    {
        path: '',
        children:[
            {
                path: '', 
                component: LoginPageComponent
            }
        ]
    }
];