import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'ui-hmenu-item',
  templateUrl: './hmenu-item.component.html',
  styleUrls: ['./hmenu-item.component.scss']
})
export class HmenuItemComponent implements OnInit {

  private _active : boolean = false;

  constructor() { }

  @Input() path : string;
  @Input() title : string;

  @Output() selected : EventEmitter<HmenuItemComponent> = new EventEmitter();

  ngOnInit() {
  }

  get classes() : any {
    return {
      'active': this.active,
      'inactive': !this.active
    };
  }

  get active() : boolean { return this._active; }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  onSelected() {
    this.selected.emit(this);
  }

}
