import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
})
export class TextFieldComponent {
  @Input() text: string = 'input text';
  @Input() isValid: boolean = true;
  @Input() control: FormControl = new FormControl('');
  isTyping = false;

  toggleIsActive() {
    this.isTyping = !this.isTyping;
  }
}
