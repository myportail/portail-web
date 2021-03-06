import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../models/User';
import {Subscription} from "rxjs";
import {AuthService, AuthStatus} from "../../../../services/auth.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private _users : Array<User>;
  private _usersSubscription : Subscription;
  private _authSubscription : Subscription;

  displayedColumns : string[] = ['username', 'role'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private usersService : UsersService,
    private authService : AuthService
  ) {

  }

  ngOnInit() {
    this._authSubscription = this.authService.authStatus
      .subscribe((status : AuthStatus) => {
        if (status === AuthStatus.authenticated) {
          this.getUsers();
        } else {
          this.getUsersUnsubscribe();
          this._users = [];
        }
      });
  }

  ngOnDestroy() {
    this.getUsersUnsubscribe();
    this._authSubscription.unsubscribe();
  }

  getUsers() : void {
    this.getUsersUnsubscribe();

    this._usersSubscription = this.usersService.queryUsers()
      .subscribe( (users: Array<User>) => {
        this._users = users;
        this.dataSource = new MatTableDataSource<User>(users);
      });
  }

  getUsersUnsubscribe() : void {
    if (this._usersSubscription) {
      this._usersSubscription.unsubscribe();
    }
  }

  public get users() : Array<User> {
    return this._users;
  }

}
