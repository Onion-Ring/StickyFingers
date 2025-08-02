import { Component, computed, ElementRef, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../notes.service';
import { Notes } from '../../notes';
import { Note } from '../../note.model';

@Component({
  selector: 'app-new-note-modal',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './new-note-modal.html',
  styleUrl: './new-note-modal.css',
})
export class NewNoteModal {

  // Two way binded signal (Priority is optional so the default value is high)
  note = signal<Note>({ title: "", id: 0, description: "", priority: "High", category: "" });
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
      if (!this.note().description){
        this.note().description = this.note().title;
      }
      if (this.note().category) {
        this.note().category = "other";
      }
      this.notesService.addNote(this.note());
      this.form().nativeElement.reset();
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
