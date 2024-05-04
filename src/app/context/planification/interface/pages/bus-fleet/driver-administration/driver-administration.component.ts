import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatTableModule
} from "@angular/material/table";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";
import {UserProfileCardInformation} from "../../../../../account/domain/models/userProfileCardInformation";
import {AccountService} from "../../../../../account/application/service/account.service";
import {RouterOutlet} from "@angular/router";
import {DriversService} from "../../../../application/service/drivers.service";
import {Driver} from "../../../../domain/models/driver";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {DriverCardComponent} from "../../../components/bus-fleet/driver-card/driver-card.component";


@Component({
  selector: 'app-driver-administration',
  standalone: true,
  imports: [
    MatTableModule,
    RouterOutlet,
    MatButton,
    HttpClientModule,
    UserProfileCardComponent,
    NgForOf,
    DriverCardComponent
  ],
  templateUrl: './driver-administration.component.html',
  styleUrl: './driver-administration.component.scss'
})
export class DriverAdministrationComponent implements OnInit{

  drivers: Driver[] = [];

  currentUser:UserProfileCardInformation;

  constructor(private accountService:AccountService, private driversService:DriversService) {
    this.currentUser= this.accountService.getCurrentUser()
  }

  ngOnInit(){
    this.loadDrivers();
  }

  loadDrivers():void{
    this.driversService.getAllDrivers().subscribe({
      next: (data) => this.drivers=data,
      error: (err) => console.log(err)
      }
    )
  }
}
