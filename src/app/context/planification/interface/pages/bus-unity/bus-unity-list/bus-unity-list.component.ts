import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Driver } from '../../../../domain/models/driver';
import { Bus } from '../../../../domain/models/bus';
import { BusUnit } from '../../../../domain/models/bus_unit';
import {MatTable, MatTableModule} from '@angular/material/table';
import {Router, RouterLink, RouterOutlet, ActivatedRoute} from '@angular/router';

const BUS_UNIT_DATA: BusUnit[] = [
  {id: 1, buses_id: 1, drivers_id: 1, transport_companies_id: 1},
]

const DRIVER_DATA: Driver[] = [
  {id: 1, first_name: 'Diego', last_name: 'Merino', driver_license_number: 'UR589OP123', image_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', contact_information_id: 98435692, smart_bands_id: 23456}
  ];

const BUS_DATA: Bus[] = [
  {id: 1, license_plate: 'AWS435', bus_model_id: 34}
  ];
  
@Component({
  selector: 'app-bus-unity-list',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule,
    MatTableModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    RouterLink,
    RouterOutlet],
  templateUrl: './bus-unity-list.component.html',
  styleUrl: './bus-unity-list.component.scss'
})
export class BusUnityListComponent {

  constructor(private router:Router, private route: ActivatedRoute){

  }

  displayedColumns: string[] = ['drivers_id', 'buses_id', 'actions'];
  dataSource = BUS_UNIT_DATA;
  drivers = DRIVER_DATA;
  buses = BUS_DATA;

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
