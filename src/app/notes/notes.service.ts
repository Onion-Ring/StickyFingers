import { Injectable, signal } from '@angular/core';
import { Notes } from './notes';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  private notes = signal<Notes[]>([]);
  getNotes = this.notes.asReadonly();  

  addNote(note: Notes): void {
    
  }

  deleteNote(noteId: number): void {

  }


}
