import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DepartureScheduleTableComponent } from '../../../components/departure-schedule/departure-schedule-table/departure-schedule-table.component';

@Component({
  selector: 'app-departure-schedule-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    DepartureScheduleTableComponent,
  ],
  templateUrl: './departure-schedule-list.component.html',
  styleUrls: ['./departure-schedule-list.component.scss'],
})
export class DepartureScheduleListComponent {
  constructor(private router: Router) {}

  goToCreateNewDepartureSchedule(): void {
    this.router
      .navigate(['create-new-departure-schedule'])
      .then((r) => console.log('Navigation result:', r));
  }
}
