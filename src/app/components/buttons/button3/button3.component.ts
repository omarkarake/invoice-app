import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-button3',
  templateUrl: './button3.component.html',
  styleUrl: './button3.component.css',
})
export class Button3Component {
  @Input() text: string = 'Edit';
}
