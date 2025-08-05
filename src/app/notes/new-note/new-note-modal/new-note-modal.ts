import { Component, ElementRef, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../notes.service';
import { NoteModel } from '../../note.model';
import { Backdrop } from "../../../shared/backdrop/backdrop";

@Component({
  selector: 'app-new-note-modal',
  imports: [FormsModule, Backdrop],
  standalone: true,
  templateUrl: './new-note-modal.html',
  styleUrl: './new-note-modal.css',
})
export class NewNoteModal {

  // Two way binded signal (Priority is optional so the default value is high)
  note = signal<NoteModel>({ title: "", id: 0, description: "", priority: "High", category: "" });
  // DI
  constructor(private notesService: NotesService) { }
  // Used to reset the form once a note was submitted
  form = viewChild.required<ElementRef<HTMLFormElement>>("form");
  close = output();

  titleEmpty = signal<boolean>(false);

  onSubmit(): void {

    if (!this.note().title) {

      this.titleEmpty.set(true);

    } else {

      this.checkOptionalFields();
      this.formatFields();

      this.notesService.addNote(this.note());

      // After adding the note we need to ensure both form and note object are reset      
      this.note.set({ title: "", id: 0, description: "", priority: "High", category: "" });
      this.form().nativeElement.reset();
    }

  }

  /* Applied lowercase to title, category and description
   in order to transform them later using pipes*/
  private formatFields():void {
    this.note().title = this.note().title.toLowerCase();
    this.note().category = this.note().category.toLowerCase();
    this.note().description = this.note().description.toLowerCase();    
  }

  // In case one of these fields were not set, a default value is applied
  private checkOptionalFields():void {

    if (!this.note().description) {
      this.note().description = this.note().title;
    }

    if (!this.note().category) {
      this.note().category = "other";
    }

    if (!this.note().priority) {
      this.note().priority = 'High';
    }

  }

  onContentEnter() {
    if (this.titleEmpty()) {
      this.titleEmpty.set(false);
    }
  }

  onCloseModal() {
    this.close.emit();
  }
}
