import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateCompanyComponent } from './deactivate-company.component';

describe('DeactivateCompanyComponent', () => {
  let component: DeactivateCompanyComponent;
  let fixture: ComponentFixture<DeactivateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
