import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresorecetasPage } from './ingresorecetas.page';

describe('IngresorecetasPage', () => {
  let component: IngresorecetasPage;
  let fixture: ComponentFixture<IngresorecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresorecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
