import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCarPage } from './new-car.page';

describe('NewCarPage', () => {
  let component: NewCarPage;
  let fixture: ComponentFixture<NewCarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
