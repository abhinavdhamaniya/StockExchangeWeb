import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllExchangesComponent } from './get-all-exchanges.component';

describe('GetAllExchangesComponent', () => {
  let component: GetAllExchangesComponent;
  let fixture: ComponentFixture<GetAllExchangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllExchangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
