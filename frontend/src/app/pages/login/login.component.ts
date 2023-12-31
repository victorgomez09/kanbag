import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { ModelFormGroup } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { Login } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private service: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public loginForm: ModelFormGroup<Login>;
  public togglePasswordInput: boolean;

  constructor() {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });

    this.togglePasswordInput = false;
  }

  onSubmit() {
    this.service
      .signIn(this.loginForm.value as Required<typeof this.loginForm.value>)
      .subscribe((response) => {
        if (response.success) {
          localStorage.setItem(environment.tokenStorageKey, response.data);
          this.router.navigate(['/boards']);
        }
      });
  }

  togglePasswordInputHandler() {
    this.togglePasswordInput = !this.togglePasswordInput;
  }

  get f() {
    return this.loginForm.controls;
  }
}
