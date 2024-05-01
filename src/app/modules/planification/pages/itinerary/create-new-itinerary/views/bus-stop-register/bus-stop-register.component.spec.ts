import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopRegisterComponent } from './bus-stop-register.component';

describe('BusStopRegisterComponent', () => {
  let component: BusStopRegisterComponent;
  let fixture: ComponentFixture<BusStopRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStopRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusStopRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
