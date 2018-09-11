import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AdminComponent} from "./modules/admin/admin.component";
import {adminRoutes} from "./modules/admin/admin-routes";

export const appRoutes : Routes = [
  {
    path: 'home',
    component: HomeComponent,
    outlet: 'main'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: adminRoutes
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomeComponent
  }
];

