import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCompanyByIdComponent } from './get-company-by-id.component';

describe('GetCompanyByIdComponent', () => {
  let component: GetCompanyByIdComponent;
  let fixture: ComponentFixture<GetCompanyByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCompanyByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCompanyByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
