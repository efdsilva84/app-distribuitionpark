import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUberPage } from './modal-uber.page';

describe('ModalUberPage', () => {
  let component: ModalUberPage;
  let fixture: ComponentFixture<ModalUberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalUberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
