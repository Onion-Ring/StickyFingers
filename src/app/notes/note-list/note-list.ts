import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Note } from './note/note';
import { NotesService } from '../notes.service';
import { FormsModule } from '@angular/forms';
import { NoteModel } from '../note.model';
import { Backdrop } from '../../shared/backdrop/backdrop';
import { DeleteWindow } from '../../shared/delete-window/delete-window';


@Component({
  selector: 'app-note-list',
  imports: [Note, FormsModule, Backdrop,DeleteWindow],
  standalone: true,
  templateUrl: './note-list.html',
  styleUrl: './note-list.css'
})
export class NoteList {

  noteIdToDelete: number = 0;
  noteTitle: string = ""

  private notesService = inject(NotesService);
  retrievedResults: boolean = true;
  delete = signal<boolean>(false);
  clearNotes = signal<boolean>(false);
  priority = signal<string>("");
  title = signal<string>("");
  filterSelect = viewChild.required<ElementRef<HTMLSelectElement>>("filterSelect");

  notes = computed(() => {
    let filteredList: NoteModel[] = [];
    filteredList = this.notesService.filterNotes(this.title(), this.priority());

    if (filteredList.length === 0 && (this.title() || this.priority())) {
      this.retrievedResults = false;
    } else if (filteredList.length === 0) {
      this.retrievedResults = true;
    }

    return filteredList;
  });

  onPrioritySelect() {

    if (this.filterSelect().nativeElement.value !== "Select a value") {
      this.priority.set(this.filterSelect().nativeElement.value);
    } else {
      this.priority.set("");
    }

  }

  onCloseModal() {
    this.delete.set(false);
    this.clearNotes.set(false);
  }

  onOpenDeleteModal(note: NoteModel) {
    this.noteIdToDelete = note.id;
    this.noteTitle = note.title;
    this.delete.set(true);
  }

  onDeclineDelete(){
    this.delete.set(false);
  }

  onDeleteNote(){
    this.notesService.deleteNote(this.noteIdToDelete);
    this.delete.set(false);
  }

  onClearNotes(){
    this.clearNotes.set(true);
  }

  onDeleteNotes(){
    this.notesService.clearNotes();
    this.clearNotes.set(false);
  }

}
