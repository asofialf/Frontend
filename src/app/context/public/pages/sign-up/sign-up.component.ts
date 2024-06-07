import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {AuthService} from "../../services/auth.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signUpForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) { 
    this.signUpForm = this.fb.group({
      email: [''],
      password: [''],
      role: ['']
    });
  }

  signUp() {
    this.authService.newuser(this.signUpForm.value).subscribe(
      (response) => {

        this.tokenService.setToken(response.access_token);
        this.tokenService.setUserId(response.user_id);

        console.log(this.tokenService.getToken());
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
