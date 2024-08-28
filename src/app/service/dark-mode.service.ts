import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  constructor() {
    this.initializeTheme();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  initializeTheme() {
    if (this.isLocalStorageAvailable()) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        // Automatically adjust based on system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.setTheme(prefersDarkScheme.matches ? 'dark' : 'light');

        // Listen for changes to the system preference
        prefersDarkScheme.addEventListener('change', (event) => {
          this.setTheme(event.matches ? 'dark' : 'light');
        });
      }
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: string) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('theme', theme);
    }
  }
}