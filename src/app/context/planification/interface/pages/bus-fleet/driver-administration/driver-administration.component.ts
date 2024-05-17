import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";
import {UserProfileCardInformation} from "../../../../../account/domain/models/userProfileCardInformation";
import {AccountService} from "../../../../../account/application/service/account.service";
import {Router, RouterOutlet} from "@angular/router";
import {DriversService} from "../../../../application/service/drivers.service";
import {Driver} from "../../../../domain/models/driver";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {DriverCardComponent} from "../../../components/bus-fleet/driver-card/driver-card.component";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";


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
    DriverCardComponent,
    MatPaginatorModule,
    NgIf
  ],
  templateUrl: './driver-administration.component.html',
  styleUrl: './driver-administration.component.scss'
})
export class DriverAdministrationComponent implements OnInit{

  defaultImage=''

  drivers: Driver[] = [];
  paginatedDrivers:Driver[]=[];
  pageSize=6;

  currentUser:UserProfileCardInformation;

  constructor(private router:Router,private accountService:AccountService, private driversService:DriversService) {
    this.currentUser= this.accountService.getCurrentUser()
  }

  ngOnInit(){
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driversService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        if (data.length > 0) {
          this.updatePaginatedDrivers(0);
        }
      },
      error: (err) => console.error('Error fetching drivers:', err)
    });
  }

  handlePageEvent(event: PageEvent):void{
    this.updatePaginatedDrivers(event.pageIndex*event.pageSize);
  }

  updatePaginatedDrivers(startIndex: number): void {
    this.paginatedDrivers = this.drivers.slice(startIndex, startIndex + this.pageSize);
  }

  navigateToAddNewDriver(): void {
    this.router.navigate(['/bus-fleet/drivers/add-new-driver']);
  }
}
