import { Component } from '@angular/core';
import { DarkModeService } from '../../service/dark-mode/dark-mode.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode() {
    this.darkModeService.toggleTheme();
  }
}
