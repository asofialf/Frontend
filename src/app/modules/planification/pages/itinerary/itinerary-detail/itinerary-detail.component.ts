import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ItineraryDetailComponent initialized');
  }

  goToCreateItinerary() {
    this.router.navigate(['create-new-itinerary'], { relativeTo: this.route });

  }


}
