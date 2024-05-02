import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptionPlanComponent } from './suscription-plan.component';

describe('SuscriptionPlanComponent', () => {
  let component: SuscriptionPlanComponent;
  let fixture: ComponentFixture<SuscriptionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscriptionPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
