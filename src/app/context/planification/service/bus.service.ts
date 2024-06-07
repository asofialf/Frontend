import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, retry } from "rxjs";

import { Bus } from '../models/bus';

import { environment } from '../../../../environments/environment';
import { HttpOptionsService } from '../../shared/services/http-options.service';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
    providedIn: 'root',
})

export class BusService {

    private baseUrl = `${environment.apiUrl}/transport-company`;
    private userId: string | null;

    constructor(
        private http: HttpClient,
        private httpOptionsService: HttpOptionsService,
        private tokenService: TokenService
    ) {
        this.userId = this.tokenService.getUserId();
    }

    getAllBuses(): Observable<Bus[]> {
        const httpOptions = this.httpOptionsService.getHttpOptions();
        return this.http
            .get<Bus[]>(`${this.baseUrl}/buses?userId=${this.userId}`, httpOptions)
            .pipe(retry(3));
    }

    updateBus(busData: any): Observable<Bus> {
        const httpOptions = this.httpOptionsService.getHttpOptions();
        return this.http
                .put<Bus>(`${this.baseUrl}/buses`, busData, httpOptions)
                .pipe(retry(3));
    }
    
}