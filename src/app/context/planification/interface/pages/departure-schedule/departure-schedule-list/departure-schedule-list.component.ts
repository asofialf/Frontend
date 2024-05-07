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
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartureScheduleService } from '../../../../application/service/departure-schedule.service';

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
  ],
  templateUrl: './departure-schedule-list.component.html',
  styleUrl: './departure-schedule-list.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DepartureScheduleListComponent implements OnInit {
  departureSchedules: any[] = [
    {
      bus_unit_id: 'BUS001',
      driver: 'John Doe',
      bus: 'Bus A',
      date: '2024-05-07',
      departures: ['09:00 AM', '12:00 PM', '03:00 PM']
    },
    {
      bus_unit_id: 'BUS002',
      driver: 'Jane Smith',
      bus: 'Bus B',
      date: '2024-05-08',
      departures: ['08:30 AM', '11:30 AM', '02:30 PM']
    },
    // Add more sample data as needed
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // You can fetch data for departureSchedules from your service here if needed
  }

  goToCreateNewDepartureSchedule() {
    this.router.navigate(['create-new-departure-schedule'], {
      relativeTo: this.route,
    });
  }
}

