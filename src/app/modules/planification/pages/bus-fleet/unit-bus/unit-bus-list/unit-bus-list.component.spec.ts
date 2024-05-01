import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitBusListComponent } from './unit-bus-list.component';

describe('UnitBusListComponent', () => {
  let component: UnitBusListComponent;
  let fixture: ComponentFixture<UnitBusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitBusListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitBusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
