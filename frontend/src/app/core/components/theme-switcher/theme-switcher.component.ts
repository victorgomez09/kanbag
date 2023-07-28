import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { themeChange } from 'theme-change';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {

  public themes: { name: string; id: string; }[];

  constructor() {
    themeChange()

    this.themes = [
      {
        name: "🌝  light",
        id: "light",
      },
      {
        name: "🌚  dark",
        id: "dark",
      },
      {
        name: "🧁  cupcake",
        id: "cupcake",
      },
      {
        name: "🐝  bumblebee",
        id: "bumblebee",
      },
      {
        name: "✳️  Emerald",
        id: "emerald",
      },
      {
        name: "🏢  Corporate",
        id: "corporate",
      },
      {
        name: "🌃  synthwave",
        id: "synthwave",
      },
      {
        name: "👴  retro",
        id: "retro",
      },
      {
        name: "🤖  cyberpunk",
        id: "cyberpunk",
      },
      {
        name: "🌸  valentine",
        id: "valentine",
      },
      {
        name: "🎃  halloween",
        id: "halloween",
      },
      {
        name: "🌷  garden",
        id: "garden",
      },
      {
        name: "🌲  forest",
        id: "forest",
      },
      {
        name: "🐟  aqua",
        id: "aqua",
      },
      {
        name: "👓  lofi",
        id: "lofi",
      },
      {
        name: "🖍  pastel",
        id: "pastel",
      },
      {
        name: "🧚‍♀️  fantasy",
        id: "fantasy",
      },
      {
        name: "📝  Wireframe",
        id: "wireframe",
      },
      {
        name: "🏴  black",
        id: "black",
      },
      {
        name: "💎  luxury",
        id: "luxury",
      },
      {
        name: "🧛‍♂️  dracula",
        id: "dracula",
      },
      {
        name: "🖨  CMYK",
        id: "cmyk",
      },
      {
        name: "🍁  Autumn",
        id: "autumn",
      },
      {
        name: "💼  Business",
        id: "business",
      },
      {
        name: "💊  Acid",
        id: "acid",
      },
      {
        name: "🍋  Lemonade",
        id: "lemonade",
      },
      {
        name: "🌙  Night",
        id: "night",
      },
      {
        name: "☕️  Coffee",
        id: "coffee",
      },
      {
        name: "❄️  Winter",
        id: "winter",
      },
    ];
  }
}
