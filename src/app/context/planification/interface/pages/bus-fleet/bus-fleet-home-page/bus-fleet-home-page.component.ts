import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AccountService} from "../../../../../account/application/service/account.service";
import {UserProfileCardInformation} from "../../../../../account/domain/models/userProfileCardInformation";

@Component({
  selector: 'app-bus-fleet-home-page',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    UserProfileCardComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './bus-fleet-home-page.component.html',
  styleUrl: './bus-fleet-home-page.component.scss'
})
export class BusFleetHomePageComponent {

  currentUser:UserProfileCardInformation;

  constructor(private router:Router,private accountService:AccountService) {
    this.currentUser= this.accountService.getCurrentUser()
  }

  navigateToBusFleet(): void {
    this.router.navigate(['/bus-fleet/buses']); // Cambia según la ruta deseada
  }
}
