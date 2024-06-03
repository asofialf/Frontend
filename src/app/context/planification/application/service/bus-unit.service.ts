import {Injectable} from '@angular/core';
import {BusUnit} from "../../domain/models/bus_unit";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})

export class BusUnitService {
  private baseUrl = 'https://my-json-server.typicode.com/TechSolutions-2024-I-IOT/PlanificationBoundedContext/bus_unit';

  constructor(private http: HttpClient) {}

  getBusUnits(): Observable<BusUnit[]> {
    return this.http.get<BusUnit[]>(this.baseUrl);
  }

  getBusUnitById(id: number): Observable<BusUnit> {
    return this.http.get<BusUnit>(`${this.baseUrl}/${id}`);
  }

  createBusUnit(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  deleteBusUnit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateBusUnit(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
