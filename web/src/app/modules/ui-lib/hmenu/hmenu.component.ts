import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import {HmenuItemComponent} from "../hmenu-item/hmenu-item.component";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'ui-hmenu',
  templateUrl: './hmenu.component.html',
  styleUrls: ['./hmenu.component.scss']
})
export class HmenuComponent implements OnInit, AfterContentInit {

  @ContentChildren(HmenuItemComponent)
  private _menuItems : QueryList<HmenuItemComponent>;

  private _selectedMenuItem : HmenuItemComponent;

  constructor(private _router : Router) { }

  @Input() outlet : string;
  @Input() title : string;

  @Output() menuItemSelected : EventEmitter<HmenuItemComponent> = new EventEmitter();

  ngOnInit() {
    this._router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        var snapshot = this._router.routerState.snapshot.root;
        snapshot.children.forEach((route) => {
          if (route.outlet === 'main') {
            const menuItem = this._menuItems.find(x => x.path === route.routeConfig.path);
            if (menuItem) {
              menuItem.activate();
            }
          }
        });
        console.log(val);
      }
    });
  }

  ngAfterContentInit() {
    this._menuItems.forEach(menuItem => {
      menuItem.selected.subscribe(this.onMenuItemSelected.bind(this));
    });
  }

  onMenuItemSelected(menuItem) {
    if (this._selectedMenuItem) {
      this._selectedMenuItem.deactivate();
    }

    this._selectedMenuItem = menuItem;

    if (this._selectedMenuItem) {
      this._selectedMenuItem.activate();
      this.menuItemSelected.emit(menuItem);
    }
  }
}
