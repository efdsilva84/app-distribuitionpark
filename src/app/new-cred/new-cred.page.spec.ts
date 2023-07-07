import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCredPage } from './new-cred.page';

describe('NewCredPage', () => {
  let component: NewCredPage;
  let fixture: ComponentFixture<NewCredPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewCredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
