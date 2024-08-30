import { Component } from '@angular/core';

@Component({
  selector: 'app-issue-date',
  templateUrl: './issue-date.component.html',
  styleUrls: ['./issue-date.component.css']
})
export class IssueDateComponent {
  isDroping = false;
  selectedDate: Date = new Date();

  toggleDroping(picker: any): void {
    this.isDroping = !this.isDroping;
    if (this.isDroping) {
      picker.open();
    } else {
      picker.close();
    }
  }

  onDateSelected(): void {
    this.isDroping = false; // Close the dropdown when a date is selected
    console.log('Selected Date:', this.selectedDate);
  }
}
