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

@Component({
  selector: 'ui-hmenu',
  templateUrl: './hmenu.component.html',
  styleUrls: ['./hmenu.component.scss']
})
export class HmenuComponent implements OnInit, AfterContentInit {

  @ContentChildren(HmenuItemComponent)
  private _menuItems : QueryList<HmenuItemComponent>;

  private _selectedMenuItem : HmenuItemComponent;

  constructor() { }

  @Input() outlet : string;
  @Input() title : string;

  @Output() menuItemSelected : EventEmitter<HmenuItemComponent> = new EventEmitter();

  ngOnInit() {
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
