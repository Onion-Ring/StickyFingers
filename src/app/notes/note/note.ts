import { Component, input, output, signal } from '@angular/core';
import { NoteModel } from '../note.model';


@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note {
  
  note = input.required<NoteModel>();
  openDeleteModal = output<number>();
  
  onDeleteNote() {
    this.openDeleteModal.emit(this.note().id);
  }

}
