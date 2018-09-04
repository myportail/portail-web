import { Injectable, EventEmitter } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../models/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {api} from '../models/api/login';
import * as decode from 'jwt-decode';

import { environment } from './../../environments/environment';
import {NGXLogger} from "ngx-logger";


enum AuthStatus {
  notAuthenticated,
  authenticated,
  authenticating
}


interface TokenClaims {
  id: string,
  username: string
}

interface LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})


class AuthService {
  private readonly _authStatusObservable : BehaviorSubject<AuthStatus>;
  private _token : string;
  private _currentUser : User;

  constructor(private _http : HttpClient,
              private logger : NGXLogger ) {
    this._authStatusObservable = new BehaviorSubject(AuthStatus.notAuthenticated);
    this.logger.debug('auth service construction');
  }

  public get authStatus() : BehaviorSubject<AuthStatus> {
    return this._authStatusObservable;
  }

  public get currentUser() : User {
    return this._currentUser;
  }

  public get token() : string {
    return this._token;
  }

  public authenticate(
    username: string,
    password: string
  ) {
    this._authStatusObservable.next(AuthStatus.authenticating);

    const login = new api.Login(username, password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this._http.post<api.Login>(`/api/auth/login`, login, httpOptions)
      .subscribe((response: object) => {
        const loginResponse = response as LoginResponse;
        if (loginResponse.token) {
          this._token = loginResponse.token;
        }
        const claims = decode(loginResponse.token) as TokenClaims;
        if (claims) {
          this._currentUser = new User(claims.id, claims.username);
          this._authStatusObservable.next(AuthStatus.authenticated);
        } else {
          this._authStatusObservable.next(AuthStatus.notAuthenticated);
        }
      }, (error) => {
        this._authStatusObservable.next(AuthStatus.notAuthenticated);
        console.log(error);
      });
  }

  public signout() {
    this._authStatusObservable.next(AuthStatus.notAuthenticated);
  }
}

export { AuthService, AuthStatus };

