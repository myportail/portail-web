import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {UsersListComponent} from "./users/users-list/users-list.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from "@angular/material";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {adminRoutes} from "./admin-routes";
import { UsersComponent } from './users/users.component';
import {UsersListControlsComponent} from "./users/users-list-controls/users-list-controls.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import { NewUserFormComponent } from './users/new-user-form/new-user-form.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
    AdminComponent,
    UsersListComponent,
    UsersComponent,
    UsersListControlsComponent,
    NewUserFormComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  exports: [AdminComponent],
  entryComponents: [
    NewUserFormComponent
  ]
})
export class AdminModule { }
