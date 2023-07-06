import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelFormGroup } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
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
    console.log('im in');

    this.service
      .signIn(this.loginForm.value as Required<typeof this.loginForm.value>)
      .subscribe((response) => {
        console.log({ data: response });
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
