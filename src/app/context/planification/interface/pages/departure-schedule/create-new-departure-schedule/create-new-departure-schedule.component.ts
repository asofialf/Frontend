import { NgModule, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DepartureTimeDialogComponent } from './components/departure-time-dialog/departure-time-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DepartureScheduleTableComponent } from '../../../components/departure-schedule/departure-schedule-table/departure-schedule-table.component';
import { BusUnitService } from '../../../../application/service/bus-unit.service';
import { BusUnit } from '../../../../domain/models/bus_unit'; // Import your BusUnit model

@Component({
  selector: 'app-create-new-departure-schedule',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    DepartureScheduleTableComponent,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  providers: [MatDialog],
  templateUrl: './create-new-departure-schedule.component.html',
  styleUrl: './create-new-departure-schedule.component.scss',
})
export class CreateNewDepartureScheduleComponent implements OnInit {
  selectedDate: Date | null = null;
  selectedBusUnit: any = null;
  numberOfLaps: number = 0;
  busUnits: BusUnit[] = []; // Ensure the type is set to BusUnit[]
  minDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(
    private dialog: MatDialog,
    private busUnitService: BusUnitService
  ) {
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }

  ngOnInit(): void {
    this.loadBusUnits();
  }

  loadBusUnits(): void {
    this.busUnitService.getBusUnits(1).subscribe(
      (busUnits) => {
        this.busUnits = busUnits;
      },
      (error) => {
        console.error('Failed to load bus units:', error);
      }
    );
  }

  onBusUnitSelected(event: any) {
    this.selectedBusUnit = event.value;
  }

  openAssignDialog() {
    const dialogRef = this.dialog.open(DepartureTimeDialogComponent, {
      data: {
        date: this.selectedDate,
        busUnit: this.selectedBusUnit,
        numberOfLaps: this.numberOfLaps,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Code to handle the result returned by the dialog

        console.log(result.departureTimes);
      }
    });
  }
}
