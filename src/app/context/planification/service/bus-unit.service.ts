import {Injectable} from '@angular/core';
import {BusUnit} from "../models/bus_unit";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class BusUnitService {

  private baseUrl = `${environment.apiUrl}/transport-company`;

  constructor(private http: HttpClient) {}

  getBusUnits(id: number): Observable<BusUnit[]> {
    return this.http.get<BusUnit[]>(`${this.baseUrl}/unit-buses?userId=${id}`);
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
