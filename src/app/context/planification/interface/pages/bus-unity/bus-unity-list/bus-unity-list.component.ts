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

  dataSource: BusUnit[] = [];
  displayedColumns: string[] = ['drivers_id', 'buses_id', 'actions'];

  constructor(private busUnitService: BusUnitService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadBusUnits();
  }

  loadBusUnits(): void {
    this.busUnitService.getBusUnits(2).subscribe({
      next: (data: any[]) => { // Suponiendo que data es un array de objetos con el formato dado
        this.dataSource = data.map(item => this.mapToBusUnit(item));
      },
      error: (err) => console.error('Error fetching bus units:', err)
    });
  }

  mapToBusUnit(item: any): BusUnit {
    return {
      id: item.id,
      buses_id: item.bus.id,
      drivers_id: item.driver.id,
      transport_companies_id: 0 // Ajusta esto según tus necesidades
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
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