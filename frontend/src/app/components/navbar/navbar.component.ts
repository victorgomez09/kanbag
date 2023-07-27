import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelFormGroup } from 'src/app/types';
import { CreateBoard } from 'src/app/boards/model/create-board.model';
import { BoardsService } from 'src/app/boards/boards.service';
import { $boards } from 'src/app/boards/store/boards.store';
import { Observable, Subscription, take } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { $user } from 'src/app/auth/store/user.store';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ThemeSwitcherComponent,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public user: Observable<User>;
  public userInitials?: string;

  constructor() {
    this.user = $user.asObservable();
    this.user.subscribe((user) => {
      this.userInitials = user.displayName
        .match(/(^\S\S?|\b\S)?/g)
        ?.join('')
        .match(/(^\S|\S$)?/g)
        ?.join('')
        .toUpperCase();
    });
  }

  logout(): void {
    this.authService.logout();
    $user.next({
      email: '',
      displayName: '',
      boards: [],
      enabled: false,
    });

    this.router.navigate(['/']);
  }

}
