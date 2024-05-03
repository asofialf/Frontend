import {Component, Input} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {Router, RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";
import {AccountService} from "../../../../../account/application/service/account.service";
import {UserProfileCardInformation} from "../../../../../account/domain/models/userProfileCardInformation";

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
  selector: 'app-bus-administration',
  standalone: true,
  imports: [
    MatTableModule,
    RouterOutlet,
    MatButton,
    UserProfileCardComponent
  ],
  templateUrl: './bus-administration.component.html',
  styleUrl: './bus-administration.component.scss'
})

export class BusAdministrationComponent {
  displayedColumns: string[] = ['licensePlate', 'model', 'year', 'seatCapacity','totalCapacity'];
  dataSource = BUS_DATA;

  currentUser:UserProfileCardInformation;

  constructor(private accountService:AccountService) {
    this.currentUser= this.accountService.getCurrentUser()
  }
}
