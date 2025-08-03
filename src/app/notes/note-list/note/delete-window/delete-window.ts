import { Component, input, output } from '@angular/core';
import { NotesService } from '../../../notes.service';

@Component({
  selector: 'div [deleteWindow]',
  imports: [],
  templateUrl: './delete-window.html',
  styleUrl: './delete-window.css'
})
export class DeleteWindow {

  noteId = input.required<number>();
  close = output();

  constructor(private notesService: NotesService) { }

  onDeclineDelete(): void {
    this.close.emit();
  }


  onDeleteNote(): void {
    this.notesService.deleteNote(this.noteId());
    this.close.emit();
  }


}
