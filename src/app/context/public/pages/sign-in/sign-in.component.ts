import { Component } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  signInForm: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) { 
    this.signInForm = this.fb.group({
      userEmail: [''],
      userPassword: [''],
    });
  }

  signIn() {
    this.authService.login(this.signInForm.value).subscribe(
      (response) => {
        this.tokenService.setToken(response.access_token);
        this.tokenService.setUserId(response.user_id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
