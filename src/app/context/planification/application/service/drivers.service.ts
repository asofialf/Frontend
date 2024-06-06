import {Injectable} from '@angular/core';
import {Driver} from "../../domain/models/driver";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DriversService{

  private apiUrl = 'http://localhost:8080/api/v1/transport-company';

  constructor(private http: HttpClient) {}

  getAllDrivers(id: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}/drivers?userId=${id}`);
  }
  getDriverById(id: number): Observable<Driver> { //falta el endpoint en el backend
    return this.http.get<Driver>(`${this.apiUrl}/${id}`);
  }
  addDriver(driverData: any): Observable<Driver> {
    return this.http.post<Driver>(`${this.apiUrl}/register-driver`, driverData);
  }

}
