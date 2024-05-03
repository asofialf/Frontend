import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartureScheduleService {
  private baseUrl =
    'https://my-json-server.typicode.com/TechSolutions-2024-I-IOT/PlanificationBoundedContext/db';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  pushData(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
