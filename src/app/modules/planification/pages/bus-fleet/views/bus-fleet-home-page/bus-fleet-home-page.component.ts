import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";

@Component({
  selector: 'app-bus-fleet-home-page',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    UserProfileCardComponent
  ],
  templateUrl: './bus-fleet-home-page.component.html',
  styleUrl: './bus-fleet-home-page.component.scss'
})
export class BusFleetHomePageComponent {

  public currentUser = { // Removed the ? and initialized as a full object.
    name: "Axel Fiestas",
    email: "axelfiestas@gmail.com", // Corrected email address format
    imageUrl: "assets/images/bus_flote/bus_manager_profile_photo.png" // Path to a valid image file
  };

}
