import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBauPage } from './modal-bau.page';

describe('ModalBauPage', () => {
  let component: ModalBauPage;
  let fixture: ComponentFixture<ModalBauPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalBauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
