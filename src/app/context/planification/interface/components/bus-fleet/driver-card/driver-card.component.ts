import {Component, Input} from '@angular/core';
import {Driver} from "../../../../domain/models/driver";

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.scss'
})
export class DriverCardComponent {
  @Input()
  public driver: Driver | undefined;
  defaultImage: string = 'assets/images/planification/bus_flote/bus_driver_logo.png';

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

}

