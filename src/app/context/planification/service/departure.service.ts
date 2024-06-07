import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Departure } from '../models/departure';
import { DepartureSchedule } from '../models/departure-schedule';

@Injectable({
  providedIn: 'root',
})
export class DepartureService {
  private departuresBaseUrl =
    'https://my-json-server.typicode.com/TechSolutions-2024-I-IOT/PlanificationBoundedContext/departures';
  private departureSchedulesBaseUrl =
    'https://my-json-server.typicode.com/TechSolutions-2024-I-IOT/PlanificationBoundedContext/departures_schedule';

  constructor(private http: HttpClient) {}

  // Departure Schedule operations
  getDepartureSchedules(): Observable<DepartureSchedule[]> {
    return this.http.get<DepartureSchedule[]>(this.departureSchedulesBaseUrl);
  }

  createDepartureSchedule(data: any): Observable<any> {
    return this.http.post(this.departureSchedulesBaseUrl, data);
  }

  // Departure operations
  getDepartures(departureScheduleId: number): Observable<Departure[]> {
    return this.http.get<Departure[]>(
      `${this.departuresBaseUrl}?departures_schedule_id=${departureScheduleId}`
    );
  }

  createDeparture(departureScheduleId: number, data: any): Observable<any> {
    return this.http.post(
      `${this.departuresBaseUrl}?departures_schedule_id=${departureScheduleId}`,
      data
    );
  }

  deleteDeparture(id: number): Observable<any> {
    return this.http.delete(`${this.departuresBaseUrl}/${id}`);
  }

  updateDeparture(id: number, data: any): Observable<any> {
    return this.http.put(`${this.departuresBaseUrl}/${id}`, data);
  }
}
