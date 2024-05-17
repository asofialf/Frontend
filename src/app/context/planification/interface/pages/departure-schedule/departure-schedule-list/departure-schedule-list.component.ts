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
import {DepartureScheduleDetailComponent} from "../departure-schedule-detail/departure-schedule-detail.component";

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
    NgForOf,
  ],
  templateUrl: './departure-schedule-list.component.html',
  styleUrl: './departure-schedule-list.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DepartureScheduleListComponent implements OnInit {
  openedAccordion: DepartureScheduleDisplay | null = null;

  toggleAccordion(schedule: DepartureScheduleDisplay) {
    const departures$ = this.departureService.getDepartures(schedule.id);

    departures$.subscribe(departures => {
      console.log('Departures for schedule', schedule.id, ':', departures);
      schedule.departures = departures;
      this.openedAccordion = this.openedAccordion === schedule ? null : schedule;
      console.log('Opened Accordion:', this.openedAccordion);
    });
  }
  departureScheduleDisplays: DepartureScheduleDisplay[] = [];
  dialog?: MatDialog;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departureService: DepartureService,
    private driversService: DriversService,
    // private busService: BusService,
    private busUnitService: BusUnitService,
    matDialog: MatDialog // Rename the parameter
  ) {
    this.dialog = matDialog;
  }

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
            // const departures$ = this.departureService.getDepartures(schedule.id);

            // departures$.subscribe(departures => {
            //   console.log('Departures for schedule', schedule.id, ':', departures);
            //   departuresByScheduleId[schedule.id] = departures;
            //   console.log(departuresByScheduleId);
            // });

            return {
              id: schedule.id,
              departure_date: schedule.departure_date,
              bus_unit_id: schedule.bus_unit_id,
              shift_start: schedule.shift_start,
              driver: driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown',
              bus: bus ? bus.license_plate : 'Unknown',
              departures: [],
            };
          });
        })
      )
      .subscribe({
        next: data => (this.departureScheduleDisplays = data),
        error: err => console.log(err),
      });
  }

  openDepartureDetails(schedule: DepartureScheduleDisplay) {
    if (this.dialog) {
      const dialogRef = this.dialog.open(DepartureScheduleDetailComponent, {
        data: {departures: schedule.departures},
      });

      dialogRef.componentInstance.deleteDeparture.subscribe((departureId: number) => {
        const departureToDelete = (schedule.departures as Departure[]).find(
          (departure: Departure) => departure.id === departureId
        );

        if (departureToDelete) {
          const departureIndex = schedule.departures.indexOf(departureToDelete);
          schedule.departures.splice(departureIndex, 1);
        }
      });
    }
  }
  goToCreateNewDepartureSchedule(){
    this.router.navigate(['create-new-departure-schedule']
      //   , {
      //   //go to the create-new-departure-schedule page
      //
      //   relativeTo: this.route,
      // }).then(r => console.log('Navigation result:', r));
    ) .then(r => console.log('Navigation result:', r));
  }
}
