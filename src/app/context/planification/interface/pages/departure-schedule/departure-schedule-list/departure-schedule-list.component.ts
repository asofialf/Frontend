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
  departureSchedules: any[] = []; // Replac@e with your actual data
  numberOfLaps: number[] = [1, 2, 3]; // Replace with your actual data

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Fetch data for departureSchedules and numberOfLaps
  }

  goToCreateNewDepartureSchedule() {
    this.router.navigate(['create-new-departure-schedule'], {
      relativeTo: this.route,
    });
  }
}
