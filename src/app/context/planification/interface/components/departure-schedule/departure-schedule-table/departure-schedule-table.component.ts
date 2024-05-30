import { NgModule, Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { DepartureService } from '../../../../application/service/departure.service';
import { DriversService } from '../../../../application/service/drivers.service';
import { BusUnitService } from '../../../../application/service/bus-unit.service';

import { DepartureScheduleDisplay } from '../../../../domain/models/departure_schedule_display';
import { Departure } from '../../../../domain/models/departure';
import { DepartureEditDialogComponent } from '../departure-edit-dialog/departure-edit-dialog.component';

import { Bus } from '../../../../domain/models/bus';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

const BUS_TEMPLATE: Bus[] = [
  { id: 1, license_plate: '239-CSA', bus_model_id: 1 },
  { id: 2, license_plate: '249-CSA', bus_model_id: 2 },
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
    const busUnits$ = this.busUnitService.getBusUnits();
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
                ? `${driver.first_name} ${driver.last_name}`
                : 'Unknown',
              bus: bus ? bus.license_plate : 'Unknown',
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
