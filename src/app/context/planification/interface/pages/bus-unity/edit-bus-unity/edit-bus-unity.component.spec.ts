import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusUnityComponent } from './edit-bus-unity.component';

describe('EditBusUnityComponent', () => {
  let component: EditBusUnityComponent;
  let fixture: ComponentFixture<EditBusUnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusUnityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBusUnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
