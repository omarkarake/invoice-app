import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  isDroping = false;
  toggleDroping() {
    this.isDroping = !this.isDroping;
    console.log('isDroping', this.isDroping);
  }
}
