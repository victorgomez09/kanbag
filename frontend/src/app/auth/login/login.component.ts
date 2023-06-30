import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ModelFormGroup } from 'src/app/types';
import { AuthService } from '../auth.service';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private service: AuthService = inject(AuthService);
  private router: Router = inject(Router)

  public loginForm: ModelFormGroup<Login>;

  constructor() {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.service.signIn(this.loginForm.value as Required<typeof this.loginForm.value>).subscribe(response => {
      console.log({ data: response })
      if (response.success) {
        localStorage.setItem(environment.tokenStorageKey, response.data)
        this.router.navigate([''])
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
