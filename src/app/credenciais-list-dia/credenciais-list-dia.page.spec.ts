import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredenciaisListDiaPage } from './credenciais-list-dia.page';

describe('CredenciaisListDiaPage', () => {
  let component: CredenciaisListDiaPage;
  let fixture: ComponentFixture<CredenciaisListDiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CredenciaisListDiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
