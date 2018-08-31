import { Injectable } from '@angular/core';
import { api } from '../models/api/User';
import { User } from '../models/User';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http : HttpClient) { }

  queryUsers() : Observable<Array<User>> {

    let usersQueryObserver : any;
    const result = new Observable<Array<User>>((observer) => {
      usersQueryObserver = observer;
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this._http.get<Array<api.User>>(`/api/auth/users`, httpOptions)
      .subscribe( (response: object) => {
        const users = [];
        users.push(new User('100', 'test'));
        usersQueryObserver.next(users);
      }, (error) => {
        console.log(error);
      });

    return result;

    // return [
    //   new User('some id', 'some username'),
    //   new User( 'second id', 'another username')
    // ];
  }
}
