import {Component, OnInit} from '@angular/core';
import { environment } from '../environments/environment';
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger, NgxLoggerLevel} from "ngx-logger";
import {AuthService} from "./services/auth.service";

console.log(environment);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(translate: TranslateService,
              private ngxLogger : NGXLogger,
              private _authService : AuthService ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.ngxLogger.debug('app component initialization');
    this.ngxLogger.debug(`environment : ${JSON.stringify(environment)}`);

    if (environment.login) {
      this._authService.authenticate(environment.login.username, environment.login.password);
    }
  }
}
