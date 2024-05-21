import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartureTimeDialogComponent } from './components/departure-time-dialog/departure-time-dialog.component';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInput } from '@angular/material/input';

import { DepartureScheduleTableComponent } from '../../../components/departure-schedule/departure-schedule-table/departure-schedule-table.component';

@Component({
  selector: 'app-create-new-departure-schedule',
  standalone: true,
  imports: [
    MatFormField,
    //  MatDatepickerInput,
    //  MatDatepickerToggle,
    //  MatDatepicker,
    // MatSelect,
    // MatOption,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    DepartureScheduleTableComponent,
  ],
  providers: [MatDialog],
  templateUrl: './create-new-departure-schedule.component.html',
  styleUrl: './create-new-departure-schedule.component.scss',
})
export class CreateNewDepartureScheduleComponent implements OnInit {
  selectedDate: Date = new Date(); // Initialize with current date
  selectedBusUnit: any;
  numberOfLaps: number = 0; // Initialize with 0
  busUnits: any;

  ngOnInit(): void {}

  // openAssignDialog() {
  //   const dialogRef = this.dialog.open(DepartureTimeDialogComponent, {
  //     data: {
  //       date: this.selectedDate,
  //       busUnit: this.selectedBusUnit,
  //       numberOfLaps: this.numberOfLaps,
  //     },
  //   });
  // }
}
