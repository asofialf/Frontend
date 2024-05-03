import { Component } from '@angular/core';

import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import {HttpClientModule} from "@angular/common/http";

import {UserProfileCardComponent} from "../../components/user-profile-card/user-profile-card.component";
import {AccountService} from "../../../account/application/service/account.service";

import {UserProfileCardInformation} from "../../../account/domain/models/userProfileCardInformation";


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
    RouterLinkActive,
    UserProfileCardComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export default class MainLayoutComponent {

  currentUser:UserProfileCardInformation;

  constructor(private router:Router,private accountService:AccountService) {
    this.currentUser= this.accountService.getCurrentUser()
  }

}
