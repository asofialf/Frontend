import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
