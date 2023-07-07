import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RgEntradaPage } from './rg-entrada.page';

describe('RgEntradaPage', () => {
  let component: RgEntradaPage;
  let fixture: ComponentFixture<RgEntradaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RgEntradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
