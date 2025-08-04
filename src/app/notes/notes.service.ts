import { computed, Injectable, OnInit, Signal, signal } from '@angular/core';
import { NoteModel } from './note.model';


@Injectable({
  providedIn: 'root'
})

export class NotesService {

  private notes = signal<NoteModel[]>([]);
  getNotes = computed(() => this.notes.asReadonly()());

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const notesJson = localStorage.getItem('notes');

    if (notesJson) {
      const notes = JSON.parse(notesJson);

      if (notes) {
        this.notes.set(notes);
      }
    }
  }

  addNote(note: NoteModel): void {
    note.id = this.generateId(note.id);
    this.notes.update((oldNotes) => [...oldNotes, note]);
    localStorage.setItem("notes", JSON.stringify(this.notes()));
  }

  deleteNote(noteId: number): void {
    const newNotes = this.notes().filter((note) => note.id !== noteId);
    this.notes.set(newNotes);
    localStorage.setItem("notes", JSON.stringify(this.notes()));
  }

  // Depending on the signals updated, the list will be filtered
  // by one or two criterias
  filterNotes(title: string, priority: string): NoteModel[] {

    let notes = [...this.getNotes()];

    if (title !== "") {
      notes = [...notes.filter((note) => note.title.includes(title))];
    }

    if (priority !== "") {
      notes = [...notes.filter((note) => note.priority === priority)];
    }

    return notes;
  }

  private generateId(noteId: number): number {

    // If  the  list is empty we assign the first id to 1
    if (this.notes().length === 0) {
      noteId = 1;
    } else {

      // If it contains elements, since we are adding elements from the end of the list, the last one
      // will be the element with the greatest id, so we simply increment the last id on the list

      let lastElement = this.notes().length - 1;
      noteId = this.notes()[lastElement].id + 1;

    }

    return noteId;
  }

}