import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllIposComponent } from './get-all-ipos.component';

describe('GetAllIposComponent', () => {
  let component: GetAllIposComponent;
  let fixture: ComponentFixture<GetAllIposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllIposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllIposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
