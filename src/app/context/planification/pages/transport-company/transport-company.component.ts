import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { TransportCompanyService } from '../../service/transport-company.service';
import { TransportCompany } from '../../models/transport-company';

@Component({
  selector: 'app-transport-company',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    ReactiveFormsModule, 
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './transport-company.component.html',
  styleUrl: './transport-company.component.scss'
})
export class TransportCompanyComponent {

  transportCompanyForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private transportCompanyService: TransportCompanyService
  ) { 
    this.transportCompanyForm = this.fb.group({
      name: ['', Validators.required],
      busImageUrl: ['', Validators.required],
      logoImageUrl: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createTransportCompany() {
    this.transportCompanyService.addTransportCompany(this.transportCompanyForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
