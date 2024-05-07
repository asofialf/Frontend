import { Component } from '@angular/core';
import {DriverCardComponent} from "../../../components/bus-fleet/driver-card/driver-card.component";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";
import {UserProfileCardInformation} from "../../../../../account/domain/models/userProfileCardInformation";
import {AccountService} from "../../../../../account/application/service/account.service";
import {DriversService} from "../../../../application/service/drivers.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-driver-register',
  standalone: true,
  imports: [
    DriverCardComponent,
    MatButton,
    MatPaginator,
    NgForOf,
    NgIf,
    UserProfileCardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './driver-register.component.html',
  styleUrl: './driver-register.component.scss'
})
export class DriverRegisterComponent {
  currentUser: UserProfileCardInformation;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.currentUser = this.accountService.getCurrentUser();
    this.registerForm = this.fb.group({
      photo: ['', Validators.required],
      complete_name: ['', Validators.required],
      dni: ['', Validators.required],
      license_number: ['', Validators.required],
      license_photo: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Submitted form', this.registerForm.value, this.registerForm.invalid);
  }

}
