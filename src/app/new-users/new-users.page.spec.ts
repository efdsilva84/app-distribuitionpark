import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewUsersPage } from './new-users.page';

describe('NewUsersPage', () => {
  let component: NewUsersPage;
  let fixture: ComponentFixture<NewUsersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
