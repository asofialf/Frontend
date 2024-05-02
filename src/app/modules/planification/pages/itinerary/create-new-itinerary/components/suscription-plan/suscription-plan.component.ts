import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-suscription-plan',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './suscription-plan.component.html',
  styleUrl: './suscription-plan.component.scss'
})
export class SuscriptionPlanComponent {

}
