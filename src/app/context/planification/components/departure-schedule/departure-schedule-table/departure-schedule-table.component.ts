import { NgModule, Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { DepartureService } from '../../../service/departure.service';
import { DriversService } from '../../../service/drivers.service';
import { BusUnitService } from '../../../service/bus-unit.service';

import { DepartureScheduleDisplay } from '../../../models/departure_schedule_display';
import { Departure } from '../../../models/departure';
import { DepartureEditDialogComponent } from '../departure-edit-dialog/departure-edit-dialog.component';

import { Bus } from '../../../models/bus';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

const BUS_TEMPLATE: Bus[] = [
  { 
    id: 1, 
    licensePlate: '239-CSA' ,
    seatingCapacity: 30,
    totalCapacity: 10,
    year: 2024,
    state: "good",
    user: 1
  },
  {
    id: 2,
    licensePlate: '239-ABC',
    seatingCapacity: 30,
    totalCapacity: 10,
    year: 2024,
    state: "good",
    user: 1
  }
];

@Component({
  selector: 'app-departure-schedule-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './departure-schedule-table.component.html',
  styleUrls: ['./departure-schedule-table.component.scss'], // Fix: Change styleUrl to styleUrls
  providers: [DatePipe, MatDialog],
})
export class DepartureScheduleTableComponent implements OnInit {
  @Input() enableEditing: boolean = false;
  @Input() enableDateInfo: boolean = false;
  departureScheduleDisplays: DepartureScheduleDisplay[] = [];
  openedAccordion: DepartureScheduleDisplay | null = null;

  constructor(
    private departureService: DepartureService,
    private driversService: DriversService,
    private busUnitService: BusUnitService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDepartureScheduleDisplays();
  }

  private getBusByID(busId: number): Bus | undefined {
    return BUS_TEMPLATE.find((bus) => bus.id === busId);
  }

  private loadDepartureScheduleDisplays() {
    // Placeholder: logic to reload schedules.
    const departureSchedules$ = this.departureService.getDepartureSchedules();
    const busUnits$ = this.busUnitService.getBusUnits(1);
    const drivers$ = this.driversService.getAllDrivers();
    const buses$ = of(BUS_TEMPLATE);

    combineLatest([departureSchedules$, busUnits$, drivers$, buses$])
      .pipe(
        map(([departureSchedules, busUnits, drivers, buses]) => {
          return departureSchedules.map((schedule) => {
            const busUnit = busUnits.find(
              (unit) => unit.id === schedule.bus_unit_id
            );
            const driver = drivers.find(
              (driver) => driver.id === busUnit?.drivers_id
            );
            const bus = this.getBusByID(busUnit?.buses_id || 0);

            return {
              id: schedule.id,
              departure_date: schedule.departure_date,
              bus_unit_id: schedule.bus_unit_id,
              shift_start: schedule.shift_start,
              driver: driver
                ? `${driver.firstName} ${driver.lastName}`
                : 'Unknown',
              bus: bus ? bus.licensePlate : 'Unknown',
              departures: [],
            };
          });
        })
      )
      .subscribe({
        next: (data) => (this.departureScheduleDisplays = data),
        error: (err) => console.log(err),
      });

    console.log('Schedules reloaded');
  }

  toggleAccordion(schedule: DepartureScheduleDisplay) {
    if (this.openedAccordion === schedule) {
      this.openedAccordion = null;
      return;
    }

    this.departureService.getDepartures(schedule.id).subscribe((departures) => {
      schedule.departures = departures;
      this.openedAccordion = schedule;
    });
  }

  editSchedule(schedule: DepartureScheduleDisplay) {
    console.log('Edit schedule:', schedule.id);
    if (this.dialog) {
      const dialogRef = this.dialog.open(DepartureEditDialogComponent, {
        data: schedule,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadDepartureScheduleDisplays();
        }
      });
    }
  }

  deleteSchedule(scheduleId: number, event: Event) {
    event.stopPropagation();
    console.log('Delete schedule with ID:', scheduleId);
    // Implement delete logic here
  }
}
