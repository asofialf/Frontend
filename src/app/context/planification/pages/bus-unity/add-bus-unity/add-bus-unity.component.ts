import { Component } from '@angular/core';
import { Location, NgForOf, NgIf } from "@angular/common";
import { DriverCardComponent } from "../../../components/driver-card/driver-card.component";
import { MatButton } from "@angular/material/button";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountService } from '../../../../account/service/account.service';
import { BusUnitService } from '../../../service/bus-unit.service';
import { UserProfileCardComponent } from "../../../../shared/components/user-profile-card/user-profile-card.component";
import { UserProfileCardInformation } from "../../../../account/models/userProfileCardInformation";

@Component({
  selector: 'app-add-bus-unity',
  standalone: true,
  imports: [
    DriverCardComponent,
    MatButton,
    MatPaginator,
    NgForOf,
    NgIf,
    UserProfileCardComponent,
    ReactiveFormsModule],
  templateUrl: './add-bus-unity.component.html',
  styleUrl: './add-bus-unity.component.scss'
})
export class AddBusUnityComponent {
  currentUser: UserProfileCardInformation;
  registerForm: FormGroup;
  isSubmitted = false;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private accountService: AccountService,
    private busUnityService: BusUnitService
  ) {
    this.currentUser = this.accountService.getCurrentUser();
    this.registerForm = this.fb.group({
      driver: ['', Validators.required],
      bus: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Submitted form', this.registerForm.value);
    if (!this.registerForm.invalid) {
      this.busUnityService.createBusUnit(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Bus unit added added', response);
          this.goBack(); // Opcional: regresar tras añadir
        },
        error: (error) => {
          console.error('Error adding bus unit', error);
        }
      });
    }
    this.isSubmitted = true;
  }

  goBack() {
    this.location.back();
  }

  shouldShowError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return <boolean>control?.invalid && (control?.touched || this.isSubmitted);
  }

  resetForm() {
    this.registerForm.reset({
      driver: '',
      bus: ''
    });
    this.isSubmitted = false; // Resetear también el indicador de envío
  }
}
