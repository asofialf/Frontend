import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DriversService } from '../../../../application/service/drivers.service';
import { BusUnitService } from '../../../../application/service/bus-unit.service';
import { AccountService } from '../../../../../account/application/service/account.service';
import { Driver } from '../../../../domain/models/driver';
import { BusUnit } from '../../../../domain/models/bus_unit';
import { UserProfileCardInformation } from '../../../../../account/domain/models/userProfileCardInformation';

@Component({
  selector: 'app-bus-unity-list',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatTableModule],
  templateUrl: './bus-unity-list.component.html',
  styleUrls: ['./bus-unity-list.component.scss']
})
export class BusUnityListComponent implements OnInit {

  currentUser: UserProfileCardInformation;
  displayedColumns: string[] = ['driver_name', 'buses_id', 'actions'];
  dataSource: { driver_name: string; id: number; buses_id: number; drivers_id: number; transport_companies_id: number; }[] = [];
  drivers: Driver[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private driversService: DriversService,
    private busUnitService: BusUnitService,
    private accountService: AccountService
  ) {
    this.currentUser = this.accountService.getCurrentUser();
  }

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driversService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.loadBusUnits();
      },
      error: (err) => console.error('Error fetching drivers:', err)
    });
  }

  loadBusUnits(): void {
    this.busUnitService.getBusUnits().subscribe({
      next: (busUnits) => {
        this.dataSource = busUnits.map(busUnit => {
          const driver = this.drivers.find(d => d.id === busUnit.drivers_id);
          return {
            ...busUnit,
            driver_name: driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown Driver'
          };
        });
      },
      error: (err) => console.error('Error fetching bus units:', err)
    });
  }
  

  goToAddBusUnit(): void {
    this.router.navigate(['add-bus-unit'], {
      relativeTo: this.route,
    });
  }

  goToEditBusUnit(): void {
    this.router.navigate(['edit-bus-unit'], {
      relativeTo: this.route,
    });
  }
}
