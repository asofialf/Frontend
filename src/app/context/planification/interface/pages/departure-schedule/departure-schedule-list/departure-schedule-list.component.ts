import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewDepartureScheduleComponent } from '../create-new-departure-schedule/create-new-departure-schedule.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {HttpClientModule} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DepartureSchedule } from '../../../../domain/models/departure_schedule';
import { DepartureService } from '../../../../application/service/departure.service';
import { Departure } from '../../../../domain/models/departure';
import { DepartureScheduleDisplay } from '../../../../domain/models/departure_schedule_display';
import { DriversService} from "../../../../application/service/drivers.service";
import {Driver} from "../../../../domain/models/driver";
import { BusUnitService } from '../../../../application/service/bus-unit.service';
import { BusUnit } from '../../../../domain/models/bus_unit';

import { Bus } from '../../../../domain/models/bus';

import {combineLatest, of} from "rxjs";

const BUS_TEMPLATE: Bus[] = [
  {id: 1, license_plate:'239-CSA', bus_model_id: 1},
  {id: 2,license_plate:'249-CSA', bus_model_id: 2},
];

@Component({
  selector: 'app-departure-schedule-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatInputModule,
    HttpClientModule,
    NgForOf
  ],
  templateUrl: './departure-schedule-list.component.html',
  styleUrl: './departure-schedule-list.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DepartureScheduleListComponent implements OnInit {

  departureScheduleDisplays: DepartureScheduleDisplay[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departureService: DepartureService,
    private driversService: DriversService,
    // private busService: BusService,
    private busUnitService: BusUnitService
  ) {}

  ngOnInit() {
    this.loadDepartureScheduleDisplays();
  }
  getBusByID(busId: number): Bus | undefined {
    return BUS_TEMPLATE.find(bus => bus.id === busId);
  }

  loadDepartureScheduleDisplays(): void {
    const departureSchedules$ = this.departureService.getDepartureSchedules();
    const busUnits$ = this.busUnitService.getBusUnits();
    const drivers$ = this.driversService.getAllDrivers();
    const buses$ = of(BUS_TEMPLATE);
    let departuresByScheduleId: { [key: number]: Departure[] } = {};

    combineLatest([departureSchedules$, busUnits$, drivers$, buses$])
      .pipe(
        map(([departureSchedules, busUnits, drivers, buses]) => {
          return departureSchedules.map(schedule => {
            const busUnit = busUnits.find(unit => unit.id === schedule.bus_unit_id);
            const driver = drivers.find(driver => driver.id === busUnit?.drivers_id);
            const bus = this.getBusByID(busUnit?.buses_id || 0);
            const departures$ = this.departureService.getDepartures(schedule.id);

            departures$.subscribe(departures => {
              departuresByScheduleId[schedule.id] = departures;
            });

            return {
              id: schedule.id,
              departure_date: schedule.departure_date,
              bus_unit_id: schedule.bus_unit_id,
              shift_start: schedule.shift_start,
              driver: driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown',
              bus: bus ? bus.license_plate : 'Unknown',
              departures: [],
              //

            };
          });
        })
      )
      .subscribe({
        next: data => (this.departureScheduleDisplays = data),
        error: err => console.log(err),
      });
  }

  goToCreateNewDepartureSchedule() {
    this.router.navigate(['create-new-departure-schedule'], {
      relativeTo: this.route,
    });
  }
}
