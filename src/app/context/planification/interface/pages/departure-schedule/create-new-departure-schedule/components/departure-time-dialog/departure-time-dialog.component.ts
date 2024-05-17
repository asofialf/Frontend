import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DatePipe} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-departure-time-dialog',
  standalone: true,
  imports: [
    DatePipe,
    MatFormField,
    MatIcon,
    FormsModule,
    CommonModule
  ],
  templateUrl: './departure-time-dialog.component.html',
  styleUrl: './departure-time-dialog.component.scss'
})
export class DepartureTimeDialogComponent implements OnInit {
  departureTimes: string[] = [];
  time: string = '';

  constructor(
    public dialogRef: MatDialogRef<DepartureTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initializeDepartureTimes();
  }

  initializeDepartureTimes() {
    for (let i = 0; i < this.data.numberOfLaps; i++) {
      this.departureTimes.push('');
    }
  }
  hasEmptyDepartureTimes(): boolean {
    return this.departureTimes.some(time => !time);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddToTable() {
    // Logic to add the departure schedule to the table

    this.dialogRef.close();
  }
}
