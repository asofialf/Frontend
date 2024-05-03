import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-itinerary-detail',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './itinerary-detail.component.html',
  styleUrl: './itinerary-detail.component.scss'
})
export default class ItineraryDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('ItineraryDetailComponent initialized');
  }



}
