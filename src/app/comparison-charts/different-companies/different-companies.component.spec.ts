import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentCompaniesComponent } from './different-companies.component';

describe('DifferentCompaniesComponent', () => {
  let component: DifferentCompaniesComponent;
  let fixture: ComponentFixture<DifferentCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifferentCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
