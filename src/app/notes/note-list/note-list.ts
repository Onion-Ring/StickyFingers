import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, Signal, viewChild } from '@angular/core';
import { Note } from "../note/note";
import { NotesService } from '../notes.service';
import { FormsModule } from '@angular/forms';
import { NoteModel } from '../note.model';

@Component({
  selector: 'app-note-list',
  imports: [Note, FormsModule],
  standalone: true,
  templateUrl: './note-list.html',
  styleUrl: './note-list.css'
})
export class NoteList {

  private notesService = inject(NotesService);
  retrievedResults: boolean = true;
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

}
