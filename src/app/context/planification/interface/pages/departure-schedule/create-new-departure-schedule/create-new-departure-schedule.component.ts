import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DepartureTimeDialogComponent} from './components/departure-time-dialog/departure-time-dialog.component';
import {MatFormField} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-create-new-departure-schedule',
  standalone: true,
  imports: [
    MatFormField,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    FormsModule,
    MatFormFieldModule,
    MatInput
  ],
  providers: [{
    provide: DateAdapter, useClass: NativeDateAdapter
  }],
  templateUrl: './create-new-departure-schedule.component.html',
  styleUrl: './create-new-departure-schedule.component.scss'
})
export class CreateNewDepartureScheduleComponent implements OnInit {
  selectedDate: Date = new Date(); // Initialize with current date
  selectedBusUnit: any;
  numberOfLaps: number = 0; // Initialize with 0
  busUnits: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAssignDialog() {
    const dialogRef = this.dialog.open(DepartureTimeDialogComponent, {
      data: {
        date: this.selectedDate,
        busUnit: this.selectedBusUnit,
        numberOfLaps: this.numberOfLaps
      }
    });
  }

}
