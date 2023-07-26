import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModelFormGroup } from 'src/app/types';
import { AuthService } from '../auth.service';
import { Register } from '../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private service: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public registerForm: ModelFormGroup<Register>;
  public togglePasswordInput: boolean;
  public togglePasswordMatchingInput: boolean;

  constructor() {
    this.registerForm = this.fb.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
      displayName: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.matchValidator('matchingPassword', true),
        ],
      ],
      matchingPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.matchValidator('password'),
        ],
      ],
    });

    this.togglePasswordInput = false;
    this.togglePasswordMatchingInput = false;
  }

  onSubmit() {
    this.service
      .signUp(
        this.registerForm.value as Required<typeof this.registerForm.value>
      )
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/signin']);
        }
      });
  }

  togglePasswordInputHandler() {
    this.togglePasswordInput = !this.togglePasswordInput;
  }

  togglePasswordMatchingInputHandler() {
    this.togglePasswordMatchingInput = !this.togglePasswordMatchingInput;
  }

  private matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }

        return null;
      }

      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }

  get f() {
    return this.registerForm.controls;
  }
}
