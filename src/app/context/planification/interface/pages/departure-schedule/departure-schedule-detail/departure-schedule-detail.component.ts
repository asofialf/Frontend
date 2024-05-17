import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departure } from '../../../../domain/models/departure';

@Component({
  selector: 'app-departure-schedule-detail',
  standalone: true,
  imports: [],
  templateUrl: './departure-schedule-detail.component.html',
  styleUrl: './departure-schedule-detail.component.scss'
})
export class DepartureScheduleDetailComponent {
  @Input() departures: Departure[] = [];
  @Output() deleteDeparture = new EventEmitter<number>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { departures: Departure[] }) {
    this.departures = data.departures;
  }
}
