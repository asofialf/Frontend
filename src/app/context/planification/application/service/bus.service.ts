import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { Bus } from '../../domain/models/bus';

@Injectable({
    providedIn: 'root',
})

export class BusService {
    private baseUrl = 'http://localhost:8080/api/v1/transport-company';

    constructor(private http: HttpClient) { }

    getBusesByUserId(id: number): Observable<Bus[]> {
        return this.http.get<Bus[]>(`${this.baseUrl}/buses?userId=${id}`);
    }
    
}