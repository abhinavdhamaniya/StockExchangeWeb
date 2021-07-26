import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCompanyByNameComponent } from './get-company-by-name.component';

describe('GetCompanyByNameComponent', () => {
  let component: GetCompanyByNameComponent;
  let fixture: ComponentFixture<GetCompanyByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCompanyByNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCompanyByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
