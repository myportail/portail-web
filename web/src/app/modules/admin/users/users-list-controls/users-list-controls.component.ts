import { Component, OnInit } from '@angular/core';
import {NewUserFormComponent} from "../new-user-form/new-user-form.component";
import {MatDialog, MatDialogConfig} from "@angular/material";

@Component({
  selector: 'users-list-controls',
  templateUrl: './users-list-controls.component.html',
  styleUrls: ['./users-list-controls.component.scss']
})
export class UsersListControlsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onAddUser() {

    const dlgConfig = new MatDialogConfig();
    dlgConfig.width = '600px';
    dlgConfig.height = '400px';

    let refDialog = this.dialog.open(NewUserFormComponent, dlgConfig);
  }

}
