import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import {api} from "../../models/api/User";

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public _users : Array<User>;

  constructor(
    private usersService : UsersService
  ) {

  }

  ngOnInit() {
    this.usersService.queryUsers()
      .subscribe( (users: Array<User>) => {
        this._users = users;
      });
  }

  public get users() : Array<User> {
    return this._users;
  }

}
