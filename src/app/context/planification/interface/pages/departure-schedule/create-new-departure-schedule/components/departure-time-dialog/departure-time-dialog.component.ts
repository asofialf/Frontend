import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-departure-time-dialog',
  standalone: true,
  imports: [
    DatePipe,
    MatFormField,
    MatIcon,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './departure-time-dialog.component.html',
  styleUrls: ['./departure-time-dialog.component.scss'],
})
export class DepartureTimeDialogComponent implements OnInit {
  hourOptions: number[] = Array.from({ length: 24 }, (_, i) => i);
  minuteOptions: number[] = Array.from({ length: 60 }, (_, i) => i);
  hours: number[] = [];
  minutes: number[] = [];
  is24HourFormat: boolean = true;

  departureTimes: string[] = [];
  time: string = '';

  constructor(
    public dialogRef: MatDialogRef<DepartureTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initializeDepartureTimes();
  }

  initializeDepartureTimes() {
    const now = new Date();
    const selectedDate = new Date(this.data.date);

    // Verificar si la fecha seleccionada es diferente a la fecha actual
    if (
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate()
    ) {
      // La fecha seleccionada es la misma que la fecha actual, devolver un error o mostrar un mensaje
      console.error(
        'La fecha seleccionada no puede ser la misma que la fecha actual.'
      );
      return;
    }

    for (let i = 0; i < this.data.numberOfLaps; i++) {
      this.departureTimes.push('');
      this.hours.push(selectedDate.getHours());
      this.minutes.push(selectedDate.getMinutes());
    }
  }

  toggleTimeFormat() {
    this.is24HourFormat = !this.is24HourFormat;
  }

  hasEmptyDepartureTimes(): boolean {
    let previousDepartureTime: Date | null = null;

    for (let i = 0; i < this.departureTimes.length; i++) {
      const departureTime = this.getDepartureTime(i);

      if (!departureTime) {
        return true; // Empty departure time
      }

      if (previousDepartureTime && departureTime <= previousDepartureTime) {
        return true; // Departure time is not after the previous one
      }

      previousDepartureTime = departureTime;
    }

    return false;
  }

  getDepartureTime(index: number): Date | null {
    const hour = this.hours[index];
    const minute = this.minutes[index];
    const now = new Date();

    if (hour === null || minute === null) {
      return null;
    }

    const amPm = this.is24HourFormat ? undefined : hour >= 12 ? 'PM' : 'AM';
    const formattedHour = this.is24HourFormat ? hour : hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, '0');
    const timeString = `${formattedHour}:${formattedMinute} ${amPm}`;
    const departureTime = new Date(`1970-01-01T${timeString}`);
    // Verificar si la hora seleccionada es anterior a la hora actual
    if (departureTime < now) {
      // La hora seleccionada es anterior a la hora actual, devolver un error o mostrar un mensaje
      console.error(
        'La hora seleccionada no puede ser anterior a la hora actual.'
      );
      return null;
    }
    return new Date(`1970-01-01T${timeString}`);
  }

  formatHour(hour: number): string {
    if (this.is24HourFormat) {
      return hour.toString().padStart(2, '0');
    } else {
      const formattedHour = hour % 12 || 12;
      const amPm = hour >= 12 ? 'PM' : 'AM';
      return `${formattedHour} ${amPm}`;
    }
  }

  formatMinute(minute: number): string {
    return minute.toString().padStart(2, '0');
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddToTable() {
    const departureTimes = this.hours.map((hour, index) => {
      const minute = this.minutes[index];
      const amPm = this.is24HourFormat ? undefined : hour >= 12 ? 'PM' : 'AM';
      const formattedHour = this.is24HourFormat ? hour : hour % 12 || 12;
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${formattedHour}:${formattedMinute} ${amPm}`;
    });
    this.dialogRef.close({ departureTimes: this.departureTimes });
  }
}
