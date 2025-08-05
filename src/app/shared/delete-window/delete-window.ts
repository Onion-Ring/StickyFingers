import { Component, input } from '@angular/core';

@Component({
  selector: 'div[app-delete-window]',
  imports: [],
  templateUrl: './delete-window.html',
  styleUrl: './delete-window.css'
})
export class DeleteWindow {
  noteId = input<number>();  
  message = input<string>();
}
