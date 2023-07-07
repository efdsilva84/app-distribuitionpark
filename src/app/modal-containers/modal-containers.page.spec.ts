import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalContainersPage } from './modal-containers.page';

describe('ModalContainersPage', () => {
  let component: ModalContainersPage;
  let fixture: ComponentFixture<ModalContainersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalContainersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
