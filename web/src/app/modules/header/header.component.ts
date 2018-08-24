import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router, NavigationEnd, UrlSegment } from '@angular/router';
import {HmenuComponent} from "../ui-lib/hmenu/hmenu.component";

@Component({
  selector: 'portail-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild(HmenuComponent)
  private mainMenu : HmenuComponent;

  private _currentPath : string;

  constructor(private _router : Router) {
  }

  ngOnInit() {
    this._router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this._currentPath = val.url;
      }
    });
  }

  ngAfterViewInit() {
    this.mainMenu.menuItemSelected.subscribe(this.onMenuItemSelected.bind(this));
  }

  public get currentPath() : string {
    return this._currentPath;
  }

  onMenuItemSelected(menuItem) {
    this._router.navigate(['', { outlets: { main: [menuItem.path] }}]);
  }

}
