import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureScheduleTableComponent } from './departure-schedule-table.component';

describe('DepartureScheduleTableComponent', () => {
  let component: DepartureScheduleTableComponent;
  let fixture: ComponentFixture<DepartureScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureScheduleTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartureScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
