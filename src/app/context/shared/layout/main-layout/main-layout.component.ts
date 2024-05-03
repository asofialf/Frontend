import { Component } from '@angular/core';

import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export default class MainLayoutComponent {

}
