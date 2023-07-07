import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSaidaPage } from './modal-saida.page';

describe('ModalSaidaPage', () => {
  let component: ModalSaidaPage;
  let fixture: ComponentFixture<ModalSaidaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalSaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
