import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import { environment } from '../../../../../environments/environment';

import { newUser } from '../../domain/models/newUser';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { JwtDTO } from '../../domain/models/JwtDTO';
import { LoginUser } from '../../domain/models/login-user';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    authURL =  `${environment.apiUrl}/auth`;

    constructor(private httpClient: HttpClient) { }

    handleError(error: HttpErrorResponse){
      if(error.error instanceof ErrorEvent){
        // Default error handling
        console.log(`An error occurred: ${error.error.message}`)
      } else {
        // Unsuccessful response error code returned from backend
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      }
      // Return Observable with Error Message to Client
      return throwError('Something happened with request, please try again later');
    }
  
    public newuser(newUser: newUser): Observable<any> {
      return this.httpClient.post<any>(this.authURL + 'register', newUser)
      .pipe(
        retry(2),
        catchError(this.handleError));
    }
  
    public login(loginUser: LoginUser): Observable<JwtDTO> {
      return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUser)
      .pipe(
        retry(2),
        catchError(this.handleError));;
    }
}