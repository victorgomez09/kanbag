import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {

  public themeSwitch: boolean;

  constructor() {
    this.themeSwitch = localStorage.getItem("theme") === "dark";
  }

  switchThemeHandler(): void {
    this.themeSwitch = !this.themeSwitch;
    localStorage.setItem("theme", this.themeSwitch ? "dark" : "light");
    document.documentElement.setAttribute('data-theme', this.themeSwitch ? "dark" : "light");
  }
}
