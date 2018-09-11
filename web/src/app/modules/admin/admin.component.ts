import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(private _router : Router) { }

  ngOnInit() {
    // this._router.navigate(['', { outlets: { admin: ['users'] }}]);
  }

  ngOnDestroy() {
    // this._router.navigate(['', { outlets: { admin: null}}]);
  }

}
