import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css',
})
export class TextFieldComponent {
  @Input() text: string = 'input text';
  isTyping = false;
  toggleIsActive() {
    this.isTyping = !this.isTyping;
    console.log('isTyping', this.isTyping);
  }
}
