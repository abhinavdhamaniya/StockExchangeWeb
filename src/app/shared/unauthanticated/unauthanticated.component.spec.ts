import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthanticatedComponent } from './unauthanticated.component';

describe('UnauthanticatedComponent', () => {
  let component: UnauthanticatedComponent;
  let fixture: ComponentFixture<UnauthanticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthanticatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthanticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
