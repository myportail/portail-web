import { Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UsersListComponent} from "./users/users-list/users-list.component";

export const adminRoutes : Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
