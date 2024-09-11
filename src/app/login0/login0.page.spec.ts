import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login0Page } from './login0.page';

describe('Login0Page', () => {
  let component: Login0Page;
  let fixture: ComponentFixture<Login0Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Login0Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
