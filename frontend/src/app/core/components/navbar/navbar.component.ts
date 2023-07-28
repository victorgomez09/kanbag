import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserState } from '../../store/user.store';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

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
  private userState: UserState = inject(UserState);

  logout(): void {
    this.authService.logout();
    this.userState.setUser({
      email: '',
      displayName: '',
      boards: [],
      enabled: false,
    });

    this.router.navigate(['/']);
  }

  getUserInitials(displayName: string): string {
    return displayName
      .match(/(^\S\S?|\b\S)?/g)
      ?.join('')
      .match(/(^\S|\S$)?/g)
      ?.join('')
      .toUpperCase() || displayName;
  }

  get user(): User {
    return this.userState.getUser();
  }

}
