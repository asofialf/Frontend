import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";
import {UserProfileCardInformation} from "../../../../../account/domain/models/userProfileCardInformation";
import {AccountService} from "../../../../../account/application/service/account.service";
import {RouterOutlet} from "@angular/router";

export interface Bus {
  licensePlate: string;
  model: string;
  year: number;
  seatCapacity: number;
  totalCapacity: number;
}

const BUS_DATA: Bus[] = [
  {licensePlate:'239-CSA',model: 'V5-2', year: 2021, seatCapacity: 30, totalCapacity: 50},
  {licensePlate:'239-CSA',model: 'V5-2', year: 2022, seatCapacity: 32, totalCapacity: 50},
  {licensePlate:'239-CSA',model: 'V5-2', year: 2023, seatCapacity: 34, totalCapacity: 50},
  {licensePlate:'239-CSA',model: 'V5-2', year: 2024, seatCapacity: 35, totalCapacity: 50},
  {licensePlate:'239-CSA',model: 'V5-2', year: 2022, seatCapacity: 28, totalCapacity: 50},
  {licensePlate:'239-CSA',model: 'V5-2', year: 2019, seatCapacity: 26, totalCapacity: 50},
  {licensePlate:'239-CSA',model: 'V5-2', year: 2018, seatCapacity: 30, totalCapacity: 50},
];

@Component({
  selector: 'app-driver-administration',
  standalone: true,
    imports: [
      MatTableModule,
      RouterOutlet,
      MatButton,
      UserProfileCardComponent
    ],
  templateUrl: './driver-administration.component.html',
  styleUrl: './driver-administration.component.scss'
})
export class DriverAdministrationComponent {
  displayedColumns: string[] = ['licensePlate', 'model', 'year', 'seatCapacity','totalCapacity'];
  dataSource = BUS_DATA;

  currentUser:UserProfileCardInformation;

  constructor(private accountService:AccountService) {
    this.currentUser= this.accountService.getCurrentUser()
  }
}
