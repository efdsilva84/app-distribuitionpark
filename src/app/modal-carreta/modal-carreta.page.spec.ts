import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCarretaPage } from './modal-carreta.page';

describe('ModalCarretaPage', () => {
  let component: ModalCarretaPage;
  let fixture: ComponentFixture<ModalCarretaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCarretaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
