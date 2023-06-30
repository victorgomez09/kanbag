import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types';
import { Login } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)

  signIn(data: Login) {
    console.log('data', data)
    return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/auth/signin`, data)
  }
}
