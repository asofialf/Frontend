import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {Driver} from "../../../../planification/domain/models/driver";
import {MatCardModule} from '@angular/material/card';

import {DriversService} from "../../../../planification/application/service/drivers.service";
import { ActivatedRoute } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-heartbeat-analytics',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon,
    MatButtonModule,
    BackButtonComponent
  ],
  templateUrl: './heartbeat-analytics.component.html',
  styleUrl: './heartbeat-analytics.component.scss'
})
export class HeartbeatAnalyticsComponent implements OnInit{

  driverId: number ; 
  driver: Driver;
  defaultImage: string = 'assets/images/planification/bus_flote/bus_driver_logo.png';

  constructor(
    private route: ActivatedRoute,
    private driversService:DriversService, 
  ) {
    this.driver = new Driver();
    this.driverId = 0;
  }
  ngOnInit(): void {
    this.driverId = +this.route.snapshot.paramMap.get('id')!
    this.getDriverById(this.driverId);
  }

  async getDriverById(id: number): Promise<void> {
    try {
      this.driver = await firstValueFrom(this.driversService.getDriverById(id));
    } catch (error) {
      console.error('Error fetching driver:', error);
    }
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

}
