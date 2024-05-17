import {Injectable} from '@angular/core';
import {DepartureSchedule} from "../../domain/models/departure_schedule";
import { DepartureScheduleDisplay } from '../../domain/models/departure_schedule_display';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class DepartureScheduleService {
  private baseUrl =
    'https://my-json-server.typicode.com/TechSolutions-2024-I-IOT/PlanificationBoundedContext/departures_schedule';

  constructor(private http: HttpClient) {}

  getDepartureSchedulesRecord(): Observable<DepartureSchedule[]> {
    return this.http.get<DepartureSchedule[]>(this.baseUrl);
  }

  createDepartureSchedule(data:any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
