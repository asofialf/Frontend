import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import { MatStepperModule} from '@angular/material/stepper';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { Schedule } from '../../../models/schedule';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BusUnitService } from '../../../service/bus-unit.service';
import { BusUnit } from '../../../models/bus-unit';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-new-schedule',
  standalone: true,
  imports: [
    RouterOutlet,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    MatDividerModule,
    BackButtonComponent
  ],
  templateUrl: './new-schedule.component.html',
  styleUrl: './new-schedule.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class NewScheduleComponent implements OnInit{

  schedule: FormGroup
  addDepartures: FormGroup
  busUnits: BusUnit[] = []
  displayedColumns: string[] = ['driver', 'bus', 'roundNumber', 'actions'];
  dataSource: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private busUnitService: BusUnitService
  ) {
    this.schedule = this.fb.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    })

    this.addDepartures = this.fb.group({
      unitBusId: ['', Validators.required],
      roundNumber: ['', [Validators.required, Validators.min(1)]],
      times: this.fb.array([]) 
    });
  }
  ngOnInit(): void {
    this.loadBusUnits();
  }



  loadBusUnits() {
    this.busUnitService.getAllBusUnits().subscribe((busUnits) => {
      this.busUnits = busUnits;
    });
  }


  saveSchedule() {
    throw new Error('Method not implemented.');
  }

  deleteBus(_t113: any) {
    throw new Error('Method not implemented.');
  }
}
