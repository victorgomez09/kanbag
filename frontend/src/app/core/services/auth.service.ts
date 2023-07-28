import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { Login, Register } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  signIn(data: Login): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${environment.apiUrl}/auth/signin`,
      data
    );
  }

  signUp(data: Register): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${environment.apiUrl}/auth/signup`,
      data
    );
  }

  getMe(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          environment.tokenStorageKey
        )}`,
      },
    });
  }

  getAll(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${environment.apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          environment.tokenStorageKey
        )}`,
      },
    });
  }

  logout(): void {
    localStorage.removeItem(environment.tokenStorageKey);
  }
}
