import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListControlsComponent } from './users-list-controls.component';

describe('UsersListControlsComponent', () => {
  let component: UsersListControlsComponent;
  let fixture: ComponentFixture<UsersListControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
