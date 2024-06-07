import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusUnityComponent } from './add-bus-unity.component';

describe('AddBusUnityComponent', () => {
  let component: AddBusUnityComponent;
  let fixture: ComponentFixture<AddBusUnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBusUnityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBusUnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
