import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredenciaisPage } from './credenciais.page';

describe('CredenciaisPage', () => {
  let component: CredenciaisPage;
  let fixture: ComponentFixture<CredenciaisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CredenciaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
