import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrosDiaPage } from './registros-dia.page';

describe('RegistrosDiaPage', () => {
  let component: RegistrosDiaPage;
  let fixture: ComponentFixture<RegistrosDiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrosDiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
