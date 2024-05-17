import {Injectable} from '@angular/core';
import {Driver} from "../../domain/models/driver";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DriversService{

  private apiUrl = 'https://my-json-server.typicode.com/TechSolutions-2024-I-IOT/PlanificationBoundedContext/drivers';

  constructor(private http: HttpClient) {}

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`);
  }

  addDriver(driverData: any): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl,driverData);
  }


}
