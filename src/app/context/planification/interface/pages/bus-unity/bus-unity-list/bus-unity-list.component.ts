import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DriversService } from '../../../../application/service/drivers.service';
import { BusUnitService } from '../../../../application/service/bus-unit.service';
import { AccountService } from '../../../../../account/application/service/account.service';
import {MatButtonModule} from '@angular/material/button';
import { Driver } from '../../../../domain/models/driver';
import { BusUnit } from '../../../../domain/models/bus_unit';
import { UserProfileCardInformation } from '../../../../../account/domain/models/userProfileCardInformation';
import { Bus } from '../../../../domain/models/bus';
import { BusService } from '../../../../application/service/bus.service';

@Component({
  selector: 'app-bus-unity-list',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatTableModule, MatButtonModule, MatAutocompleteModule],
  templateUrl: './bus-unity-list.component.html',
  styleUrls: ['./bus-unity-list.component.scss']
})
export class BusUnityListComponent implements OnInit {

  currentUser: UserProfileCardInformation;
  displayedColumns: string[] = ['driver_name', 'buses_license_plate', 'actions'];
  dataSource: { driver_name: string; id: number; buses_id: number; drivers_id: number; transport_companies_id: number; }[] = [];
  drivers: Driver[] = [];
  buses: Bus[] = [];
  filteredDrivers: Driver[] = [];
  selectedDriver: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private driversService: DriversService,
    private busUnitService: BusUnitService,
    private accountService: AccountService,
    private busService: BusService
  ) {
    this.currentUser = this.accountService.getCurrentUser();
  }

  ngOnInit() {
    this.loadDrivers();
    //this.loadBuses();
  }

  loadDrivers(): void {
    this.driversService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.filteredDrivers = data;
        this.loadBusUnits();
      },
      error: (err) => console.error('Error fetching drivers:', err)
    });
  }

  /*loadBuses(): void{
    this.busService.getBusesByUserId(1).subscribe({
      next: (data) => {
        this.buses = data;
        this.loadBusUnits();
      },
      error: (err) => console.error('Error fetching drivers:', err)
    })
  }*/

  loadBusUnits(): void {
    this.busUnitService.getBusUnits().subscribe({
      next: (busUnits) => {
        this.dataSource = busUnits.map(busUnit => {
          const driver = this.drivers.find(d => d.id === busUnit.drivers_id);
          //const bus = this.buses.find(d => d.id === busUnit.buses_id);
          return {
            ...busUnit,
            driver_name: driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown Driver'
            //buses_license_plate: bus ? bus.license_plate : 'Unknown Bus'
          };
        });
      },
      error: (err) => console.error('Error fetching bus units:', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
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