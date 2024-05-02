import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-bus-fleet-home-page',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent
  ],
  templateUrl: './bus-fleet-home-page.component.html',
  styleUrl: './bus-fleet-home-page.component.scss'
})
export class BusFleetHomePageComponent {

}
