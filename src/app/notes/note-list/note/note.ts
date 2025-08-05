import { Component, input, output, signal } from '@angular/core';
import { NoteModel } from '../../note.model';


@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note {
  
  note = input.required<NoteModel>();
  openDeleteModal = output<NoteModel>();
  
  onDeleteNote() {
    window.scrollTo(0,0);
    this.openDeleteModal.emit(this.note());
  }

}
