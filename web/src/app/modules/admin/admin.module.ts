import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {UsersListComponent} from "./users/users-list/users-list.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCheckboxModule} from "@angular/material";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {adminRoutes} from "./admin-routes";
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
    AdminComponent,
    UsersListComponent,
    UsersComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
