import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.scss'
})
export class DriverCardComponent {
  @Input()
  public driver: {
    name: string,
    license: number,
    busAsociated: string;
    imageUrl:string
  } | undefined;

}

