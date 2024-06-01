import { Component } from '@angular/core';
import {DriverCardComponent} from "../../../components/bus-fleet/driver-card/driver-card.component";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {Location, NgForOf, NgIf} from "@angular/common";
import {UserProfileCardComponent} from "../../../../../shared/components/user-profile-card/user-profile-card.component";
import {UserProfileCardInformation} from "../../../../../account/domain/models/userProfileCardInformation";
import {AccountService} from "../../../../../account/application/service/account.service";
import {DriversService} from "../../../../application/service/drivers.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import { BackButtonComponent } from '../../../../../shared/components/back-button/back-button.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
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
    ReactiveFormsModule,
    BackButtonComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './driver-register.component.html',
  styleUrl: './driver-register.component.scss'
})
export class DriverRegisterComponent {
  currentUser: UserProfileCardInformation;
  registerForm: FormGroup;
  isSubmitted=false;

  constructor(
    private location:Location,
    private fb: FormBuilder,
    private accountService: AccountService,
    private driversService:DriversService
  )
  {
    this.currentUser = this.accountService.getCurrentUser();
    this.registerForm = this.fb.group({
      photo: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dni: ['', Validators.required],
      phone_number: ['', Validators.required, Validators.pattern('^[0-9]*$')],
      email: ['', Validators.required, Validators.email],
      license_number: ['', Validators.required],
      license_photo: ['']
    });
  }

  goBack(){
    this.location.back();
  }

  onSubmit() {
    console.log('Submitted form', this.registerForm.value);
    if (!this.registerForm.invalid) {
      this.driversService.addDriver(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Driver added', response);
          this.goBack(); // Opcional: regresar tras añadir
        },
        error: (error) => {
          console.error('Error adding driver', error);
        }
      });
    }
    this.isSubmitted = true;
  }

  shouldShowError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return <boolean>control?.invalid && (control?.touched || this.isSubmitted);
  }

  resetForm() {
    this.registerForm.reset({
      photo: '',
      first_name: '',
      last_name: '',
      dni: '',
      phone_number: '',
      email: '',
      license_number: '',
      license_photo: ''
    });
    this.isSubmitted = false; // Resetear también el indicador de envío
  }


}
